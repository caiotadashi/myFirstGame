const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const currentPlayerId = 'player1';

const game = {
    players: {
        'player1': { x: 1, y: 2 },
        'player2': { x: 5, y: 8 }
    },
    fruits: {
        'fruit1': { x: 0, y: 1 }
    }
};

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    const keyPressed = event.key;
    const player = game.players[currentPlayerId]

    if (keyPressed == 'ArrowUp' && player.y - 1 >= 0){
        player.y -= 1;
        return;
    }
    if (keyPressed == 'ArrowRight' && player.x + 1 < screen.width){
        player.x += 1;
        return;
    }
    if (keyPressed == 'ArrowDown' && player.y + 1 < screen.height){
        player.y += 1;
        return;
    }
    if (keyPressed == 'ArrowLeft' && player.x - 1 >= 0){
        player.x -= 1;
        return;
    }
}

renderScreen();

function renderScreen(){
    context.fillStyle = 'white';
    context.clearRect(0,0,10,10);

    for (const playerId in game.players) {
        const player = game.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruitId in game.fruits) {
        const fruit = game.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(renderScreen);

}