const socket = io(); // create new instance
const username = prompt("enter name:"); // ask for the user's name
const room = prompt("enter the room:"); // ask for what room the user wants to go
const startButton = document.getElementById('start-game')
const resetButton = document.getElementById('reset-game')
const timer = document.getElementById('timer')
let serverClock = 0;
let localServerGameBoardArray;
let player0Icon = document.getElementById('playerO');
let playerXIcon = document.getElementById('playerX');
let playerNoneIcon = document.querySelector('.playerNone')

let gameBoardLogic = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

startButton.addEventListener('click', () => {
    socket.emit("startGame", true)
    console.log("testing start button event listener")
})

resetButton.addEventListener('click', () => {
    socket.emit("resetGame")
})

socket.emit("joined", username, room); // tell server the username and room of the person who joined

socket.on("joined", user => { // when server tells client that someone has joined
    alert(user + " joined");

    playerXIcon.innerHTML = `Player X: ${username}`;

    // create a new div element
    const newDiv = document.createElement("div");
    const playerO = document.createElement("div");


    // and give it some content
    const newContent =
        document.createTextNode("x Turns:  - | - | - | - ")
    const playerOText =
        document.createTextNode("o Turns:  - | - | - | - ");

    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    newDiv.classList.add("playerTurn");
    playerO.appendChild(playerOText);
    playerO.classList.add("playerTurn");

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("root");
    document.body.insertBefore(newDiv, currentDiv);
    document.body.insertBefore(playerO, newDiv)


    socket.on('endTurn', (arg) => {
        localServerGameBoardArray = arg
    })
});

// socket.emit("sendGameBoard", gameBoardLogic)



//happens every (x) intervals 7 by default
socket.on('gatherBoard', (arg) => {
    //send client gameboard to server
    socket.emit('clientGameBoard', gameBoardLogic)
})

socket.on('endTurn', (arg) => {
    localServerGameBoardArray = arg
    console.log(arg)
})


socket.on("serverClock", (arg, arg2) => {
    serverClock = arg
    timer.innerHTML = serverClock
    //if (serverClock != 0) gameStart = true

    //socket.emit('sendBoard', gameBoardLogic)
    console.log(`${gameBoardLogic}-- local,,, ${localServerGameBoardArray}--- server`)
})






socket.on("leave", user => { // when server tells client that someone has left
    alert(user + " left");
});


// Declare Variables
const topleft = document.querySelector('.topleft');
const topmiddle = document.querySelector('.topmiddle');
const topright = document.querySelector('.topright');
const middleleft = document.querySelector('.middleleft');
const middlemiddle = document.querySelector('.middlemiddle');
const middleright = document.querySelector('.middleright');
const bottomleft = document.querySelector('.bottomleft');
const bottommiddle = document.querySelector('.bottommiddle');
const bottomright = document.querySelector('.bottomright');


// Select X or O for each box

// row 1
const tlX = document.querySelector('.tlX');
const tlO = document.querySelector('.tlO');
const tmX = document.querySelector('.tmX');
const tmO = document.querySelector('.tmO');
const trX = document.querySelector('.trX');
const trO = document.querySelector('.trO');
// row 2
const mlX = document.querySelector('.mlX');
const mlO = document.querySelector('.mlO');
const mmX = document.querySelector('.mmX');
const mmO = document.querySelector('.mmO');
const mrX = document.querySelector('.mrX');
const mrO = document.querySelector('.mrO');
//row 3
const blX = document.querySelector('.blX');
const blO = document.querySelector('.blO');
const bmX = document.querySelector('.bmX');
const bmO = document.querySelector('.bmO');
const brX = document.querySelector('.brX');
const brO = document.querySelector('.brO');

const audio1 = new Audio('./Suck 1V2.wav');
const audio2 = new Audio('./bubble2.wav');
const gameTheme = new Audio('./gameTheme.mp3')



//Event Listeners 
topleft.addEventListener("click", () => {
    topleft.style.background = 'grey'
    tlX.style.display = 'inline'
    tlO.style.display = 'none'
    gameBoardLogic[0][0] = 'X'
    audio1.play()
    gameTheme.play()
});
topleft.addEventListener("dblclick", () => {
    topleft.style.background = 'red'
    tlO.style.display = 'inline'
    tlX.style.display = 'none'
    gameBoardLogic[0][0] = 'O'
    audio2.play()
});
topmiddle.addEventListener("click", () => {
    topmiddle.style.background = 'grey'
    tmX.style.display = 'inline'
    tmO.style.display = 'none'
    gameBoardLogic[0][1] = 'X'
    audio1.play()
});

topmiddle.addEventListener("dblclick", () => {
    topmiddle.style.background = 'red'
    tmO.style.display = 'inline'
    tmX.style.display = 'none'
    gameBoardLogic[0][1] = 'O'
    audio2.play()
});

topright.addEventListener("click", () => {
    topright.style.background = 'grey'
    trX.style.display = 'inline'
    trO.style.display = 'none'
    gameBoardLogic[0][2] = 'X'
    audio1.play()
});

topright.addEventListener("dblclick", () => {
    topright.style.background = 'red'
    trO.style.display = 'inline'
    trX.style.display = 'none'
    gameBoardLogic[0][2] = 'O'
    audio2.play()
});

middleleft.addEventListener("click", () => {
    middleleft.style.background = 'grey'
    mlX.style.display = 'inline'
    mlO.style.display = 'none'
    gameBoardLogic[1][0] = 'X'
    audio1.play()
});

middleleft.addEventListener("dblclick", () => {
    middleleft.style.background = 'red'
    mlX.style.display = 'none'
    mlO.style.display = 'inline'
    gameBoardLogic[1][0] = 'O'
    audio2.play()
});

middlemiddle.addEventListener("click", () => {
    middlemiddle.style.background = 'grey'
    mmX.style.display = 'inline'
    mmO.style.display = 'none'
    gameBoardLogic[1][1] = 'X'
    audio1.play()
});
middlemiddle.addEventListener("dblclick", () => {
    middlemiddle.style.background = 'red'
    mmX.style.display = 'none'
    mmO.style.display = 'inline'
    gameBoardLogic[1][1] = 'O'
    audio2.play()
});

middleright.addEventListener("click", () => {
    middleright.style.background = 'grey'
    mrX.style.display = 'inline'
    mrO.style.display = 'none'
    gameBoardLogic[1][2] = 'X'
    audio1.play()
});
middleright.addEventListener("dblclick", () => {
    middleright.style.background = 'red'
    mrX.style.display = 'none'
    mrO.style.display = 'inline'
    gameBoardLogic[1][2] = 'O'
    audio2.play()
});

bottomleft.addEventListener("click", () => {
    bottomleft.style.background = 'grey'
    blX.style.display = 'inline'
    blO.style.display = 'none'
    gameBoardLogic[2][0] = 'X'
    audio1.play()

});
bottomleft.addEventListener("dblclick", () => {
    bottomleft.style.background = 'red'
    blX.style.display = 'none'
    blO.style.display = 'inline'
    gameBoardLogic[2][0] = 'O'
    audio2.play()

});

bottommiddle.addEventListener("click", () => {
    bottommiddle.style.background = 'grey'
    bmX.style.display = 'inline'
    bmO.style.display = 'none'
    gameBoardLogic[2][1] = 'X'
    audio1.play()
});
bottommiddle.addEventListener("dblclick", () => {
    bottommiddle.style.background = 'red'
    bmX.style.display = 'none'
    bmO.style.display = 'inline'
    gameBoardLogic[2][1] = 'O'
    audio2.play()
});

bottomright.addEventListener("click", () => {
    bottomright.style.background = 'grey'
    brX.style.display = 'inline'
    brO.style.display = 'none'
    gameBoardLogic[2][2] = 'X'
    audio1.play()
});
bottomright.addEventListener("dblclick", () => {
    bottomright.style.background = 'red'
    brX.style.display = 'none'
    brO.style.display = 'inline'
    gameBoardLogic[2][2] = 'O'
    audio2.play()
});

const checkGameLogic = (player) => {
    if (
        //win conditions

        //1
        gameBoardLogic[0][0] === player &&
        gameBoardLogic[0][1] === player &&
        gameBoardLogic[0][2] === player ||
        //2
        gameBoardLogic[1][0] === player &&
        gameBoardLogic[1][1] === player &&
        gameBoardLogic[1][2] === player ||
        //3
        gameBoardLogic[2][0] === player &&
        gameBoardLogic[2][1] === player &&
        gameBoardLogic[2][2] === player ||
        //4
        gameBoardLogic[0][0] === player &&
        gameBoardLogic[1][1] === player &&
        gameBoardLogic[2][2] === player ||
        //5
        gameBoardLogic[0][2] === player &&
        gameBoardLogic[1][1] === player &&
        gameBoardLogic[2][0] === player ||
        //6
        gameBoardLogic[0][0] === player &&
        gameBoardLogic[1][0] === player &&
        gameBoardLogic[2][0] === player ||
        //7
        gameBoardLogic[0][1] === player &&
        gameBoardLogic[1][1] === player &&
        gameBoardLogic[2][1] === player ||
        //8
        gameBoardLogic[0][2] === player &&
        gameBoardLogic[1][2] === player &&
        gameBoardLogic[2][2] === player
    ) {
        if (player === 'O') player0.style.display = 'inline';
        if (player === 'X') playerX.style.display = 'inline';
    }
    let counter = 0
    for (let i = 0; i < gameBoardLogic.length; i++) {
        for (let j = 0; j < gameBoardLogic[i].length; j++) {
            if (gameBoardLogic[i][j] === 'O' || gameBoardLogic[i][j] === 'X') {
                counter++
            }
        }
        if (counter === 9) {
            playerNone.style.display = 'inline'
        }
    }
}




setInterval(() => {
    checkGameLogic('X')
    checkGameLogic('O')
}
    , 2000)

