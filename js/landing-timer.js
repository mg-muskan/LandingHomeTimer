// const semicircle = document.querySelectorAll('.semicircle');
var semicircle = document.getElementsByClassName('landing-clock-semicircle');
const timer = document.getElementById('landing-clock-timer');
const clockVisible = document.getElementById('landing-home-clock');
const clockHeading = document.getElementById('landing-home-clock-heading');

const day = 4;
const hr = 5;
const min = 5;
const sec = 5;

const days = day * 86400000;
const hours = hr * 3600000;
const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = days + hours + minutes + seconds;
const startTime = Date.now();
const futureTime = startTime + setTime;

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
    const currentTime = Date.now();
    const remainingTime = futureTime - currentTime;
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

    // From day 0 to remaining 1 hour - blue color
    if(remainingTime <= 86400000 && remainingTime >= 3600000) {
        semicircle[0].style.backgroundColor = "#1722F7";
        semicircle[1].style.backgroundColor = "#1722F7";

        timer.innerHTML = `
        <div>${hrs}h</div>
        <div class="colon">:</div>
        <div>${mins}m</div>
        <div class="colon">:</div>
        <div>${secs}s</div>
        `;

        timer.style.color = "#1722F7";
    }

    // Remaining 1 hour to 5 min - orange color
    if(remainingTime < 3600000 && remainingTime >= 300000) {
        semicircle[0].style.backgroundColor = "#ffa502";
        semicircle[1].style.backgroundColor = "#ffa502";
        
        timer.innerHTML = `
        <div>${mins}m</div>
        <div class="colon">:</div>
        <div>${secs}s</div>
        `;

        timer.style.color = "#ffa502";
    }

    // Alert after 5 min left - red color
    if(remainingTime < 300000 && remainingTime >= 0) {
        semicircle[0].style.backgroundColor = "red";
        semicircle[1].style.backgroundColor = "red";
        
        timer.innerHTML = `
        <div>${secs}s</div>
        `;

        timer.style.color = "red";
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