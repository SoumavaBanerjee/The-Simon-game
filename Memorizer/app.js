
// Important Global Declarations
const btnColors = ['red','blue','yellow','green'];
let ComputerPatternStack = [];
let userPatternStack = [];
let level = 0;
let toggle = false;
let isCalledOnce = false;

// Audio files declaration
const Red = `/sounds/red.mp3`;
const Blue = `/sounds/blue.mp3`;
const Yellow = `/sounds/yellow.mp3`;
const Green = `/sounds/green.mp3`;
const Wrong = `/sounds/wrong.mp3`;



// Start a new sequence
function nextSequence(){
    if(isCalledOnce){
        userPatternStack = [];
    }
    $('h1').text(`Level ${level}`);
    let min = 0; 
    let max = 3;
    let randomIndex = (Math.floor(Math.random() * (max - min + 1)) + min);
    let randChosenColor = btnColors[randomIndex];
    ComputerPatternStack.push(randChosenColor);
    $(`#${randChosenColor}`).fadeIn(150).fadeOut(150).fadeIn(150);
    playSound(randChosenColor);
    level++;
}


// Upon clicking a btn
$('.btn').click((event)=>{
    if(toggle)
    {
        let userClickedBtn = event.target.id;
        userPatternStack.push(userClickedBtn);
        playSound(userClickedBtn);
        animatePress(userClickedBtn);
        checkAnswer(userPatternStack.length-1);
    }
   
})


// Add animation to pressed button
function animatePress(presentColor){
    let $pressedBtn = $(`.${presentColor}`).addClass(`pressed`);
    setTimeout(() => {
        $pressedBtn.removeClass(`pressed`);
    }, 100);
}


function playSound(sound){
    switch (sound) {
        case 'red':
            let redSound = new Audio(Red);
            redSound.play();
            break;
        case 'blue':
            let blueSound = new Audio(Blue);
            blueSound.play();
            break;
            
        case 'yellow':
            let yellowSound = new Audio(Yellow);
            yellowSound.play();
            break;

        case 'green':
            let greenSound = new Audio(Green);
            greenSound.play();
            break;
        default:
            console.log("Unexpected behavior");
            break;
    }
}


function checkAnswer(currentLevel){
    if(userPatternStack[currentLevel] == ComputerPatternStack[currentLevel]){
        if(userPatternStack.length == ComputerPatternStack.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else{
        playSound(Wrong);
        $('body').addClass("game-over");
        $('.start-btn').text("Restart");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
          }, 200);
          startOver();
    }
    
}

// Begin Game after pressing a
$(document).keydown((event)=>{
    caughtKey = event.key;
    if (caughtKey == `a` && toggle == false){
        toggle = true;
        isCalledOnce = true;
        $('h1').text('Level 0');
        nextSequence();
    }
})
// begin game by clicking btn
$(".start-btn").click((event)=>{
    $(".start-btn").fadeIn(150).fadeOut(150).fadeIn(150);
    if(toggle == false){
        $(".start-btn").text("Start");
        toggle = true;
        isCalledOnce = true;
        $('h1').text('Level 0');
        nextSequence();
    }
})

function startOver(){
    ComputerPatternStack = [];
    userPatternStack = [];
    level = 0;
    toggle = false;
}

console.log(ComputerPatternStack)
console.log(userPatternStack)



 