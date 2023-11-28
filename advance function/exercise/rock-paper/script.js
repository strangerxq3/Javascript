let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    tie: 0
}
updateScoreElement();

let IsAutoPlaying = false;
let id;
function autoplay(){
    if(!IsAutoPlaying){
        id = setInterval(function(){
            const player = computer_Move()
            playgame(player)
        },1000)
        IsAutoPlaying = true;
    }else{
        clearInterval(id);
        IsAutoPlaying=false;
    }
    let btn = document.querySelector('.reset-btn1');
    
    if(btn.innerHTML === '▷ Auto Play'){
        btn.innerHTML ='■ Stop' ;  
    }else{
        btn.innerHTML ='▷ Auto Play' ;  
    }
        
}


function playgame(playerMove) {
    const computerMove = computer_Move();//global variable
    let result = '';
    if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }


    else if (playerMove === 'paper') {

        if (computerMove === 'rock') {
            result = 'You win.';
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }
    }
    else if (playerMove === 'scissors') {

        if (computerMove === 'rock') {
            result = 'You lose.';
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }
    }

    if (result === 'You win.') {
        score.wins += 1;
    }
    else if (result === 'You lose.') {
        score.loses += 1;
    }
    else if (result === 'Tie.') {
        score.tie += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));// it will we the we play and score is decided

    // alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}
    //  Win : ${score.wins} | Loses : ${score.loses} | Tie : ${score.tie}`);

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-move').innerHTML = `You <img src = "image/${playerMove}.png" class = "inner-icon">  Computer <img src = "image/${computerMove}.png" class = "inner-icon">`
}
function updateScoreElement() { document.querySelector('.js-score').innerHTML = ` Win : ${score.wins} | Loses : ${score.loses} | Tie : ${score.tie}`; }


function computer_Move() {

    const randomNumber = Math.random();

    let computerMove = '';//local variable

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
    return computerMove;
}