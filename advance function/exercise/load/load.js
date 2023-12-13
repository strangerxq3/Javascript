let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loses: 0,
    tie: 0
}
updateScoreElement();
function resetscore(){
    score.wins= 0;
    score.loses= 0;
    score.tie= 0;
    localStorage.removeItem('score')
    updateScoreElement();
}

let IsAutoPlaying = false;
let id;
function autoplay(){
    if(!IsAutoPlaying){
        id = setInterval(()=>{
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
        btn.innerHTML ='■ Stop Playing' ;  
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
document.querySelector('.rock-btn').addEventListener('click',()=>{
    playgame('rock')
})
document.querySelector('.reset-btn1').addEventListener('click',()=>{
    autoplay()
})
document.querySelector('.reset-btn').addEventListener('click',()=>{
    confirm()
})
document.querySelector('.paper-btn').addEventListener('click',()=>{
    playgame('paper')
})
document.querySelector('.scissors-btn').addEventListener('click',()=>{
    playgame('scissors')
})
document.body.addEventListener('keydown',(event)=>{
    if(event.key === 'r'){
        playgame('rock')
    }
    else if(event.key === 'p'){
        playgame('paper')
    }
    else if(event.key === 's'){
        playgame('scissors')
    }
    if (event.key === 'a'){
        autoplay()
    }
    if (event.key === 'Backspace'){
        confirm()
    }
    // console.log(event.key)
})
function confirm(){
    document.querySelector('.confirm').innerHTML =`Are you sure you want to reset the score? <button class="yes-btn">Yes</button><button class="No-btn">No</button>`;
    document.querySelector('.yes-btn').addEventListener('click',()=>{resetscore();hide()})
    document.querySelector('.No-btn').addEventListener('click',()=>{hide()})
}
function hide (){
    document.querySelector('.confirm').innerHTML ='';
}