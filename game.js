const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const currentPlayerId = 'player1';

function createGame() {
    const state = {
        players: {},
        fruits: {}
    };

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    } 

    function removePlayer(command) {
        const playerId = command.playerId;

        delete state.players[playerId];
    }

    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    } 

    function removeFruit(command) {
        const fruitId = command.fruitId;

        delete state.fruits[fruitId];
    }

    function movePlayer(command) {
        console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`);

        const acceptedMoves = {
            ArrowUp(player) {
                console.log('game.movePlayer().ArrowUp() -> Moving player up')
                if (keyPressed === 'ArrowUp' && player.y - 1 >= 0){
                    player.y -= 1;
                }
            },
            ArrowRight(player) {
                console.log('game.movePlayer().ArrowRight() -> Moving player right')
                if (keyPressed === 'ArrowRight' && player.x + 1 < screen.width){
                    player.x += 1;
                }
            },
            ArrowDown(player) {
                console.log('game.movePlayer().ArrowDown() -> Moving player down')
                if (keyPressed === 'ArrowDown' && player.y + 1 < screen.height){
                    player.y += 1;
                }
            },
            ArrowLeft(player) {
                console.log('game.movePlayer().ArrowLeft() -> Moving player left')
                if (keyPressed === 'ArrowLeft' && player.x - 1 >= 0){
                    player.x -= 1;
                }
            }
        }

        const keyPressed = command.keyPressed;
        const player = state.players[command.playerId];
        const moveFunction = acceptedMoves[keyPressed];

        if (player && moveFunction) {
            moveFunction(player)
        }
        
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    };
};

const game = createGame();
const keyboardListener = createKeyboardListener();
keyboardListener.subscribe(game.movePlayer);

function createKeyboardListener() {
    const state ={
        observers: []
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notifyAll(command) {
        console.log(`keyboardListeer -> Notifyng ${state.observers.length} observers`);

        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event) {
        const keyPressed = event.key;

        const command = {
            playerId: 'player1',
            keyPressed
        }

        notifyAll(command)
    }

    return {
        subscribe
    }
}

renderScreen();

function renderScreen(){
    context.fillStyle = 'white';
    context.clearRect(0,0,10,10);

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(renderScreen);

}