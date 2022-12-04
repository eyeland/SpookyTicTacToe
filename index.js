const express = require("express"); // use express
const app = express(); // create instance of express
const server = require("http").Server(app); // create server
const { instrument } = require("@socket.io/admin-ui");

// create instance of socketio
const io = require("socket.io")(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});

let gameClock = 0;
let gameStart = false;
let gameTimer;
let serverGameBoardArray = [
    [2, null, null],
    [null, null, null],
    [null, null, null]
]
let bugCounter = 0;

// create dictionary of users and their socket ids
const users = {};

// no authention to use socket.io at moment (required even if no pw)
instrument(io, {
    auth: false
});

// use "public" directory for static files
app.use(express.static("public"));

//function takes seconds per turn as parmeter
const createPlayerTurns = (secondsForTurn) => {
    const secondsForTurnArray = []
    for (let i = 1; i < 11; i++) {
        secondsForTurnArray.push(secondsForTurn * i)
    }
    secondsForTurnArray.unshift(0)
    return secondsForTurnArray //ex 7 would return [7, 14, 21....., 70]
}

// create array with seconds to check player turns in intervals
let playerTurns = createPlayerTurns(7)

const checkPlayerTurn = () => {
    if (playerTurns.includes(gameClock)) {
        // code runs every X second(s) interval to sync game board logic
        // let numRemove = playerTurns.findIndex(item => item === gameClock)
        // playerTurns.splice(numRemove, 1)
        playerTurns.shift()
        return true
    }
    return false
}


// Code runs when user first connects
io.on("connection", socket => {
    socket.on("joined", (username, room) => { // when server recieves the "joined" message
        socket.join(room); // join the room
        io.to(room).emit("joined", username); // tell the clients in the room that someone has joined
        users[socket.id] = { username: username, room: room }; // add user to dictionary  
        console.log(users);
    });


    // Code runs when reset button is clicked
    socket.on("resetGame", (arg) => {
        clearInterval(gameTimer)
        gameStart = false;
        gameClock = 0;
        gameTimer = 0;

    })

    const updateGameBoard = () => {
        if (checkPlayerTurn()) {
            //save new game board function
            console.log("okkk")
            console.log(playerTurns)
            //end of test
            socket.emit('gatherBoard') //collect clients gameboards


            socket.once('clientGameBoard', (arg) => {
                serverGameBoardArray = arg
                bugCounter++
                console.log(`server game board has been updated ${bugCounter}`)
            })
            socket.emit('endTurn', serverGameBoardArray)
        }


    }

    // Code runs when start game button is clicked
    socket.on("startGame", (arg) => {
        if (!gameTimer) {
            gameTimer = setInterval(() => {
                updateGameBoard()
                gameClock++
                //console.log(serverGameBoardArray) 
            }, 1000);
            gameStart = true;
            if (gameStart) {
                gameTimer
            }
            console.log("server starting game")
        } else {

        }
    })


    // Emit server clock and game board array every (x)seconds

    setInterval(() => {
        socket.emit("serverClock", gameClock, serverGameBoardArray)
    }, 1000)

    socket.on("disconnect", () => { // when someone closes the tab
        let username = users[socket.id]["username"]; // get username of user
        let room = users[socket.id]["room"] // get room the user was in
        io.to(room).emit("leave", username); // tell the clients in the room that someone has left
        delete users[socket.id]; // remove user from dictionary
        console.log(users);
    });
});

server.listen(3000); // run server