const scoreBox = document.getElementById('score');
const triesBox = document.getElementById('tries');
triesBox.innerText = 0; 

let highScore = 100000000000;
if(localStorage.getItem('highScore')){
    highScore = parseInt(localStorage.getItem('highScore'));
    scoreBox.innerText = highScore; 
}
else {
    scoreBox.innerText = 'No Highscore';
}

let pairs = 9;

const reset = document.getElementById('reset'); 
const start = document.getElementById('start'); 

reset.setAttribute('disabled', true); 
reset.addEventListener('click', (e) =>{
    started = false;
    start.removeAttribute('disabled');
    gameContainer.innerHTML = '';
    createDivsForColors(shuffle(COLORS));
    reset.setAttribute('disabled', true); 
    triesBox.innerText = 0; 
});


let started = false; 
start.addEventListener('click', ()=>{
    started = true;
    start.setAttribute('disabled', true);
});

const gameContainer = document.getElementById("game");

let colors = []; 
for(let i = 0; i < 15; i++){
    let s = Math.floor(Math.random()*(50) + 50);
    let l = Math.floor(Math.random()*(60) + 20);
    colors.push(`hsl(${i*20},${s}%,${l}%)`); 
}
colors = shuffle(colors);
const COLORS = []; 
for(let i = 0; i <  pairs; i++){
    COLORS.push(colors[i]);
    COLORS.push(colors[i]);
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        // create a new div
        const newDiv = document.createElement("div");

        // give it a class attribute for the value we are looping over
        newDiv.setAttribute('data-color', color);

        // call a function handleCardClick when a div is clicked on
        newDiv.addEventListener("click", handleCardClick);

        // append the div to the element with an id of game
        gameContainer.append(newDiv);
    }
}

let choices = [];
let count = 0;
let matches = 0; 
let tries = 0; 
// TODO: Implement this function!
function handleCardClick(event) {
    if(!started) return; 

    if (count < 2) {
        if(count == 1 && choices[0] == event.target) return;
        count++;
        console.log("you just clicked", event.target);
        event.target.style.backgroundColor = event.target.getAttribute('data-color');
        console.log(event.target.style.backgroundColor);
        choices.push(event.target);
        if (count == 2) {
            setTimeout(() => {
                tries += 1; 
                triesBox.innerText = tries; 

                if (choices[0].getAttribute('data-Color') !== choices[1].getAttribute('data-color')) {
                    choices[0].style.backgroundColor = 'white';
                    choices[1].style.backgroundColor = 'white';
                }
                else {
                    choices[0].removeEventListener('click', handleCardClick);
                    choices[1].removeEventListener('click', handleCardClick);
                    matches++;
                    if(matches == pairs){
                        reset.removeAttribute('disabled');
                        matches = 0;
                        
                        if(tries < highScore){
                            highScore = tries; 
                            localStorage.setItem('highScore', highScore); 
                            scoreBox.innerText = highScore;
                        }
                        tries = 0;
                    } 
                }
                choices = [];
                count = 0;
            }, 1000);
        }

    }
}

// when the DOM loads
createDivsForColors(shuffledColors);
