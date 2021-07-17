// This selects the heading of the game
h1 = document.getElementById("level-title");

// This array stores the string values of the numbers 0, 1, 2 and 3 to decide which color is selected at random using a random number generator
colors = ["red", "blue", "green", "yellow"];

// This array contains the name of the audio files to be played when the colors are selected or pressed
sounds = ["red.mp3", "blue.mp3", "green.mp3", "yellow.mp3"];

// This array is used to store the sequence created by the game at random which is to be pressed by the player
sequence = [];

// This array is used to store the sequence in which the player clicks the buttons
clickedSequence = []

// This variable decides whether the game is being played or if it is over
level = 0;

// This variable stores the number of clicks done by the player
clickIndex = -1;

// This event listener for keyboard button press is for starting the game when it is over
document.addEventListener("keydown", (e) => {
    if (level == 0 && e.key == "Enter") {
        hideRules();
        showGame();
        h1.innerText = "Level 1";
        h1.style.fontSize = "3rem";
        setTimeout(() => {
            chooseColor();
        }, 1000);
    }
});

function hideRules() {
    rules = document.getElementById("rules");
    rules.style.display = "none";
}

function showGame() {
    game = document.querySelector(".container");
    game.style.visibility = "visible";
}

// This function is used to choose a random color for starting the game or moving on to the next level
function chooseColor() {
    chosenColor = findNext();
    h1.innerText = "Level " + level;
    h1.style.fontSize = "3rem";
    playSound(chosenColor);
    playChosenAnimation(chosenColor);
}

// This function is used to select a random color by generating a random number using Math.random() function, and pushes the selected color to the sequence array, and it returns the random number (index of the color selected) 
function findNext() {
    randomNumber = Math.floor(Math.random() * 4);
    chosenColor = colors[randomNumber];
    sequence.push(chosenColor);
    level++;
    return chosenColor;
}

// This function is used to play animation for the chosen color so that the player knows which color is the next in sequence
function playChosenAnimation(chosenColor) {
    color = document.getElementById(chosenColor);
    color.classList.add("animate");
    setTimeout(() => {
        color.classList.remove("animate");
    }, 100);
}

// This function is used to play the sound related to the selected color in the sequence
function playSound(chosenColor) {
    index = colors.indexOf(chosenColor);
    audio = new Audio("sounds/" + sounds[index]);
    audio.play();
}

// This variable stores all the buttons with the class btn in the DOM
buttons = document.querySelectorAll(".btn");

// This event listener for click is for the player to play the game
buttons.forEach(button => {
    button.addEventListener("click", buttonClicked);
});

// This function is used to perform the task when some button is clicked
function buttonClicked() {
    if (level > 0) {
        clickIndex++;
        clickedButton = this.id;
        // If the player clicks the wrong button, we display the message game over and end the game
        if (sequence[clickIndex] != clickedButton) {
            gameOver();
        } else {
            playSound(clickedButton);
            playClickedAnimation(clickedButton);
            if (clickIndex == sequence.length - 1) {
                setTimeout(() => {
                    nextlevel();
                }, 600);
            }
        }
    }
}

// This function is used to play the animation of a specific button when it is clicked by the player
function playClickedAnimation(clickedButton) {
    clickedColor = document.getElementById(clickedButton);
    clickedColor.classList.add("pressed");
    setTimeout(() => {
        clickedColor.classList.remove("pressed");
    }, 100);
}

// This function is used to move to the next level
function nextlevel() {
    clickIndex = -1;
    chooseColor();
}

function gameOver() {
    h1.innerText = "Game Over. Your score: " + (level - 1) + ". Press Enter button to start again.";
    h1.style.fontSize = "2rem";
    audio = new Audio("sounds/wrong.mp3");
    body = document.querySelector("body");
    body.classList.add("game-over");
    setTimeout(() => {
        body.classList.remove("game-over");
    }, 200);
    audio.play();
    level = 0;
    sequence.length = 0;
    clickIndex = -1;
}