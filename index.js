// script code for stopwatch 

// fetching all the required DOM elements 
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var resetButton = document.getElementById('reset-button');

var secDisplay = document.getElementById('sec-display');
var miliSecDisplay = document.getElementById('mili-sec-display');
var minDisplay = document.getElementById('min-display');
var hourDisplay = document.getElementById('hour-display');

// global variable for interval used to pause/ reset stopwatch
var startinginterval;

// global variables that will be used to update values of minutes, seconds etc..
var ms = 00;
var sec = 00;
var min = 00;
var hr = 00;

// flag variable to be used on krypress event to toggle between start and stop
var flag = true;

// event handlers for mouse click event on buttons
startButton.addEventListener('click', startTimerFunction);
stopButton.addEventListener('click', stopTimerFunction);
resetButton.addEventListener('click', resetTimer);

// start stop feature implemented on space bar press
document.body.addEventListener('keypress', function(e){
    if (e.code == 'Space') {
        // on the basis on current value of flag, we call the function
        if (flag) 
            startTimerFunction();
        else 
            stopTimerFunction();     
    }
});

function startTimerFunction(){
    // once start button is clicked, disable the start button and enable stop button | to avoid overlapping intervals
    startButton.disabled = true;
    stopButton.disabled = false;

    // this function will be called every in 10 miliseconds, updating the values of defined variables.
    // by using this function we can avoid using different intervals for hour, min and sec seperately
    startinginterval = setInterval(function(){
        ms += 1;
        if (ms >= 100) {
            sec += 1;
            ms = 00;
        }
        if (sec >= 60) {
            min += 1;
            sec = 00;
        }
        if (min >= 60) {
            hr +=1;
            min = 00;
        }
        miliSecDisplay.innerHTML = ms;
        secDisplay.innerText = sec;
        minDisplay.innerHTML = min;
        hourDisplay.innerHTML = hr;
    }, 10);

    // flag needs to be altered every time function is called for space bar press to function
    flag = !flag;

};

function stopTimerFunction() {
    // disabling appropriate buttons and clearing interval 
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(startinginterval);

    // flag needs to be altered every time function is called for space bar press to function
    flag = !flag;
}

function resetTimer(){
    // reset all values to 0 and clear the interval | enable both start and stop buttons
     ms = 00;
     sec = 00;
     min = 00;
     hr = 00;
     miliSecDisplay.innerHTML = "00";
     secDisplay.innerText = "00";
     minDisplay.innerHTML = "00";
     hourDisplay.innerHTML = "00";

     startButton.disabled = false;
     stopButton.disabled = false;

     clearInterval(startinginterval);

     // flag needs to be altered every time function is called for space bar press to function
     flag = true;
}



// script code for analog clock

//fetching all three hand divs
var secHand = document.getElementById("sec-hand");
var minHand = document.getElementById("min-hand");
var hourHand = document.getElementById("hour-hand");

//this function will we called as soon as page gets loaded and this will set the time on clock
function setDate() {
    // getting todays date
    const now = new Date();

    // from the date fetched above, fetch the second count
    const sec = now.getSeconds();
    //convert the second count into respective angle
    var rotatingSecDeg = sec*6 + 90;
    // apply the transformation to second hand
    secHand.style.transform = `rotate(${rotatingSecDeg}deg)`;

    const min = now.getMinutes();
    var minDeg = min*6 + 90;
    minHand.style.transform = `rotate(${minDeg}deg)`;

    const hr = now.getHours();
    var hourDeg = hr*30 + 90;
    hourHand.style.transform = `rotate(${hourDeg}deg)`;

}

// the setDate function will be called every 1 second and time will be updated
setInterval(setDate, 1000);