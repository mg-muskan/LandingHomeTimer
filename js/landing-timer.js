// const semicircle = document.querySelectorAll('.semicircle');
var semicircle = document.getElementsByClassName('landing-clock-semicircle');
const timer = document.getElementById('landing-clock-timer');
const clockVisible = document.getElementById('landing-home-clock');
const clockHeading = document.getElementById('landing-home-clock-heading');

const day = 5;
const hr = 0;
const min = 0;
const sec = 0;

const days = day * 86400000;
const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = days + hours + minutes + seconds;
const startTime = new Date("Feb 20, 2023 00:00:00").getTime();

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
    let currentTime = Date.now();
    const remainingTime = startTime - currentTime;
    const angle = (remainingTime / setTime) * 360;
    
    // Progress Indicator
    if(angle > 180) {
        semicircle[2].style.display = 'none';
        semicircle[1].style.transform = `rotate(${angle}deg)`;
        semicircle[0].style.transform = 'rotate(180deg)';
    }
    else {
        semicircle[2].style.display = 'block';
        semicircle[1].style.transform = `rotate(${angle}deg)`;
        semicircle[0].style.transform = `rotate(${angle}deg)`;
    }

    // Timer
    const ds = Math.floor(remainingTime / (1000 * 60 * 60 * 24)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
    const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});

    timer.innerHTML = `
    <div>${ds}d</div>
    <div class="colon">:</div>
    <div>${hrs}h</div>
    <div class="colon">:</div>
    <div>${mins}m</div>
    <div class="colon">:</div>
    <div>${secs}s</div>
    `;

    // (50%) From day 2, 12 hours to day 1, 6 hours - blue color
    if(remainingTime <= 216000000 && remainingTime >= 108000000) {
        semicircle[0].style.backgroundColor = "#1722F7";
        semicircle[1].style.backgroundColor = "#1722F7";

        timer.innerHTML = `
        <div>${ds}d</div>
        <div class="colon">:</div>
        <div>${hrs}h</div>
        <div class="colon">:</div>
        <div>${mins}m</div>
        <div class="colon">:</div>
        <div>${secs}s</div>
        `;

        timer.style.color = "#1722F7";
    }

    // (25%) Remaining 1 day 6 hours to 5 min - orange color
    if(remainingTime < 108000000 && remainingTime >= 300000) {
        semicircle[0].style.backgroundColor = "#ffa502";
        semicircle[1].style.backgroundColor = "#ffa502";
        
        timer.innerHTML = `
        <div>${ds}d</div>
        <div class="colon">:</div>
        <div>${hrs}h</div>
        <div class="colon">:</div>
        <div>${mins}m</div>
        <div class="colon">:</div>
        <div>${secs}s</div>
        `;

        timer.style.color = "#ffa502";
    }

    // From day 0 remove day hand
    if(remainingTime <= 86400000 && remainingTime >= 3600000) {
        
        timer.innerHTML = `
        <div>${hrs}h</div>
        <div class="colon">:</div>
        <div>${mins}m</div>
        <div class="colon">:</div>
        <div>${secs}s</div>
        `;

    }
    
    // Remaining 1 hour to 5 min - orange color
    if(remainingTime < 3600000 && remainingTime >= 300000) {
        
        timer.innerHTML = `
        <div>${mins}m</div>
        <div class="colon">:</div>
        <div>${secs}s</div>
        `;

    }

    // Alert after 5 min left - red color
    if(remainingTime < 300000 && remainingTime >= 0) {
        semicircle[0].style.backgroundColor = "red";
        semicircle[1].style.backgroundColor = "red";
        
        timer.innerHTML = `
        <div>${mins}m</div>
        <div class="colon">:</div>
        <div>${secs}s</div>
        `;

        timer.style.color = "red";
    }

    // Remove minutes hand when a minute left
    if(remainingTime < 60000 && remainingTime >= 0) {

        timer.innerHTML = `
        <div>${secs}s<div>`;

    }

    if(remainingTime < 0) {
        clearInterval(timerLoop);
        semicircle[2].style.display = 'none';
        semicircle[1].style.display = 'none';
        semicircle[0].style.display = 'none';

        timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>`;

        timer.style.color = "lightgray";

        clockVisible.style.display = 'none';
        clockVisible.style.height = '0px';
        clockVisible.style.visibility = 'hidden';
        clockHeading.innerHTML = '<h4><b>Registrations started!</b></h4>';
        clockHeading.style.marginTop = '-80px';

    }

}
