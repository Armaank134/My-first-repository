let gamestate = 'start'
let paddle1 = document.querySelector('.paddle1');
let paddle2 = document.querySelector('.paddle2');
let board = document.querySelector('.board');
let initial_ball_coord = document.querySelector('.ball');
let ball = document.querySelector('.ball');
let player1score = document.querySelector('.player1score');
let player2score = document.querySelector('.player2score');
let message = document.querySelector('.message')
let paddle1_coords = paddle1.getBoundingClientRect();
let paddle2_coords = paddle2.getBoundingClientRect();
let board_coords =  board.getBoundingClientRect();
let ball_coords = initial_ball_coord;
let paddle_common = 
    document.querySelector('.paddle').getBoundingClientRect();

let dx = Math.floor(Math.random() * 4) + 3; 
let dy = Math.floor(Math.random() * 4) + 3; 
let dxd = Math.floor(Math.random() * 2); 
let dyd = Math.floor(Math.random() * 2);


document.addEventListener('keydown', (e) => { 
    if (e.key == 'Enter') { 
        gamestate = gamestate == 'start' ? 'play' : 'start'; 
        if (gamestate == 'play') { 
        message.innerHTML = 'Game Started'; 
        message.style.left = 42 + 'vw'; 
        requestAnimationFrame(() => 
        {
            dx = Math.floor(Math.random() * 4) + 3; 
            dy = Math.floor(Math.random() * 4) + 3; 
            dxd = Math.floor(Math.random() * 2); 
            dyd = Math.floor(Math.random() * 2);
            moveBall(dx, dy, dxd, dyd);
        }
        );
        } 
    } 
    if (gamestate == 'play') { 
        if (e.key == 'w') { 
        paddle1.style.top = 
            Math.max( 
            board_coords.top, 
            paddle1_coords.top - window.innerHeight * 0.07
            ) + 'px'; 
        paddle1_coords = paddle1.getBoundingClientRect(); 
        } 
        if (e.key == 's') { 
        paddle1.style.top = 
            Math.min( 
            board_coords.bottom - paddle_common.height, 
            paddle1_coords.top + window.innerHeight * 0.07
            ) + 'px'; 
        paddle1_coords = paddle1.getBoundingClientRect(); 
        } 
      
        if (e.key == 'ArrowUp') { 
        paddle2.style.top = 
            Math.max( 
            board_coords.top, 
            paddle2_coords.top - window.innerHeight * 0.07 
            ) + 'px'; 
        paddle2_coords = paddle2.getBoundingClientRect(); 
        } 
        if (e.key == 'ArrowDown') { 
        paddle2.style.top = 
            Math.min( 
            board_coords.bottom - paddle_common.height, 
            paddle2_coords.top + window.innerHeight * 0.07
            ) + 'px'; 
        paddle2_coords = paddle2.getBoundingClientRect(); 
        } 
    } 
    }); 


function moveBall(dx, dy, dxd, dyd)
{
    if (ball_coords.top <= board_coords.top || ball_coords.bottom >= board_coords.bottom) {
        dyd = 1 - dyd; 
    }
        if 
        (
            ball_coords.left <= paddle1_coords.right &&
            ball_coords.top >= paddle1_coords.top &&
            ball_coords.bottom <= paddle1_coords.bottom 
        )
        {
            dxd = 1;
            dx = Math.floor(Math.random() * 6) + 6;
            dy = Math.floor(Math.random() * 6) + 6;
        }
        if 
        (
            ball_coords.right >= paddle2_coords.left &&
            ball_coords.top >= paddle2_coords.top &&
            ball_coords.bottom <= paddle2_coords.bottom 
        )
        {
            dxd = 0;
            dx = Math.floor(Math.random() * 6) + 6;
            dy = Math.floor(Math.random() * 6) + 6;
        }
        if (ball_coords.left <= board_coords.left || ball_coords.right >= board_coords.right )
        {
            if(ball_coords.left <= board_coords.left)
            {
                player2score.textContent = parseInt(player2score.textContent) + 1;
            }
                else
                {
                    player1score.textContent = parseInt(player1score.textContent) + 1;
                }
                gamestate = 'start';
                ball_coords = initial_ball_coord;
                ball.style = initial_ball_coord.style;
                message.innerHTML = 'press enter to start pong';
                message.style.left = 38 + 'vw';
                return;
        }
        
    ball.style.top = ball_coords.top + dy * (dyd == 0 ? -1 : 1) + 'px'; 
    ball.style.left = ball_coords.left + dx * (dxd == 0 ? -1 : 1) + 'px';
    ball_coords = ball.getBoundingClientRect(); 
    requestAnimationFrame(() => { 
        moveBall(dx, dy, dxd, dyd); 
    });


}