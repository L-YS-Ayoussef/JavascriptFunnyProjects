// ------------------------------------------------------------------ STEP 0 ---------------------------------------> 
var buttonColours  = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];
var userClickedPattern = [];
var timeForNextSequence;
var currentLevel = 1;
var numLoop = 1;
let stopLoop = false;  
var isRunning = true;
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}
function removePressedClass(userColour){
    $("#"+userColour).removeClass("pressed");
}

// ------------------------------------------------------------------ STEP 1 ---------------------------------------> 
function nextSequence(){
    if(stopLoop){
        return;
    }
    // get a random color from the array carring the colors 
    var randomNumber = Math.floor(Math.random()*4); 
    randomChosenColour = buttonColours[randomNumber];  
    // store the color
    gamePattern.push(randomChosenColour);

    // selecting the chosen color button and add the aimation flash to it 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // adding sound for the chosen button
    playSound(randomChosenColour);
}

// ------------------------------------------------------------------ STEP 2 ---------------------------------------> 
$(".btn").on("click", function(){
    // get the id of the button clicked 
    var userChosenColour = $(this).attr("id");
    // store it in the userPattern array
    userClickedPattern.push(userChosenColour);
    // playing the sound
    playSound(userChosenColour);
    // adding an animation to the button clicked
    $("#"+userChosenColour).addClass("pressed");

    // removing the animation after 100 ms using the function [setTimeout] providing a specific delay before executing a function
    
    // setTimeout(()=>{
    //     $("#"+userChosenColour).removeClass("pressed");
    // }, 100); 

    // in another way for removing the animation--> 
    setTimeout(removePressedClass, 100, userChosenColour); // the last argument is the parameter of the function 

    if(gamePattern.length){
        if(userChosenColour === gamePattern[0]){
            gamePattern.shift();
            if (userClickedPattern.length === currentLevel + numLoop){
                currentLevel++;
                playSound("clap");
                setTimeout(startGame, 1500, currentLevel);
            }

        }
        else{
            playSound("wrong");
            gameOver();
        }
    }
        
});

// ------------------------------------------------------------------ STEP 3 ---------------------------------------> 
function startGame(inputLevel){
    if(isRunning){
        userClickedPattern = [];
        gamePattern = [];

        $(".btn").css("pointer-events", "none");  // this property [pointer-events], when set to [none], it will prevent the buttons to be clicked
        $("h1").text("level " + inputLevel);
        var i = 1;
        for (i = 1; i <= inputLevel + numLoop; i++) {
            setTimeout(nextSequence, i * timeForNextSequence);  // each iteration will be executed after [i*timeForNextSequence]
        }
        setTimeout(function () {
            if (stopLoop) {
                return;
            }
            $(".btn").css("pointer-events", "auto");
        }, (inputLevel + 1.5) * timeForNextSequence);  // after executing the for loop [ending the sequence of the game], enable clicking on the buttons 
    }
}
function gameOver(){
    $(".btn").css("pointer-events", "none");
    $(".restartBtn #restartIcon").removeClass('bi-arrow-counterclockwise').addClass('bi-play-fill');
    $(".levelHead .pauseBtn").css("pointer-events", "none");
    $("h1").text("Game Over");
    gamePattern = [];
    userClickedPattern = [];
}

// ------------------------------------------------------------------ STEP 4 ---------------------------------------> 
$(".btnStart").on("click", function(){
    $(".levels").css("display", "flex");
});

$(".levels .beginner").on("click", function () {
    $(".btnStartParent").css("display", "none");
    $(".levels").css("display", "none");
    $(".container").css("display", "block");
    $(".restartBtn").css("display", "inline-block");
    $(".pauseBtn").css("display", "inline-block");
    $(".backBtn").css("display", "inline-block");
    stopLoop = false;
    isRunning = true;
    currentLevel = 1;
    timeForNextSequence = 1000;
    numLoop = 1;
    startGame(currentLevel);
});
$(".levels .intermediate").on("click", function () {
    $(".btnStartParent").css("display", "none");
    $(".levels").css("display", "none");
    $(".container").css("display", "block");
    $(".restartBtn").css("display", "inline-block");
    $(".pauseBtn").css("display", "inline-block");
    $(".backBtn").css("display", "inline-block");
    stopLoop = false;
    isRunning = true;
    currentLevel = 1;
    timeForNextSequence = 500;
    numLoop = 2;
    startGame(currentLevel);
});
$(".levels .advanced").on("click", function () {
    $(".btnStartParent").css("display", "none");
    $(".levels").css("display", "none");
    $(".container").css("display", "block");
    $(".restartBtn").css("display", "inline-block");
    $(".pauseBtn").css("display", "inline-block");
    $(".backBtn").css("display", "inline-block");
    stopLoop = false;
    isRunning = true;
    currentLevel = 1;
    timeForNextSequence = 200;
    numLoop = 3;
    startGame(currentLevel);
});

$(".levelHead .restartBtn").on("click", function(){
    var buttonRes = $(".levelHead .restartBtn");
    if (buttonRes.find('.bi-arrow-counterclockwise').length > 0){
        $(".levelHead .pauseBtn").css("pointer-events", "none");
        $(".pauseBtn #pauseIcon").removeClass('bi-play').addClass('bi-pause');
        playSound("endGame");
        stopLoop = true;
        isRunning = false;
        gameOver();
    }
    else{
        $(".restartBtn #restartIcon").removeClass('bi-play-fill').addClass('bi-arrow-counterclockwise');
        $(".levelHead .pauseBtn").css("pointer-events", "auto");
        stopLoop = false;
        isRunning = true;
        currentLevel = 1;
        startGame(currentLevel);
    }
});

$(".levelHead .pauseBtn").on("click", function(){
    var button = $(".levelHead .pauseBtn");
    if (button.find('.bi-pause').length > 0) {
        stopLoop = true;
        $(".btn").css("pointer-events", "none");
        $(".pauseBtn #pauseIcon").removeClass('bi-pause').addClass('bi-play');
    }
    else {
        $(".pauseBtn #pauseIcon").removeClass('bi-play').addClass('bi-pause');
        stopLoop = false;
        startGame(currentLevel);
    }
});

$(".backBtn").on("click", function(){
    $(".container").css("display", "none");
    $(".btnStartParent").css("display", "block");
    $(".restartBtn").css("display", "none");
    $(".pauseBtn").css("display", "none");
    $(".backBtn").css("display", "none");
    $("h1").text("Welcome To Simon Game");
    $(".btn").css("pointer-events", "none");
    $(".levelHead .pauseBtn").css("pointer-events", "auto");
    stopLoop = true;
    isRunning = false;
    gamePattern = [];
    userClickedPattern = [];
});
