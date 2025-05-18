function CircularTimer(date) {
  // progressBar.style.strokeDasharray = length;
  let progressBar = document.querySelectorAll('.e-c-progress');
  let pointer = document.querySelectorAll('#e-pointer');
  
  //circle ends
  const displayOutput = document.querySelectorAll('.display-remain-time');

  let length = Math.PI * 2 * 100;
  
  progressBar.forEach( el => {
    el.style.strokeDasharray = length;
  })
  var _this = this;
  
  _this.config = Object.assign({
    endDate: date,
    labels: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    }
  });

  let intervalTimer;
  let timeLeft;
  
  function pauseTimer(event){
      timer(_this.config.endDate);
  }

  function timer (time){ //counts time, takes seconds
    let remainTime = time.getTime();
    
    intervalTimer = setInterval(function(){
      timeLeft = Math.abs((remainTime - new Date().getTime()) / 1000);
      var d = Math.floor(timeLeft / 86400);
      timeLeft -= d * 86400;
      var h = Math.floor(timeLeft / 3600) % 24;
      timeLeft -= h * 3600;
      var m = Math.floor(timeLeft / 60) % 60;
      timeLeft -= m * 60;
      var s = Math.floor(timeLeft % 60);
      
      // check the digits in days, hours, minutes and seconds
      d = pad2(d);
      h = pad2(h);
      m = pad2(m);
      s = pad2(s);
      
      if(timeLeft < 0){
        clearInterval(intervalTimer);
        displayTimeLeft(s, _this.config.labels.seconds);
        displayTimeLeft(m, _this.config.labels.minutes);
        displayTimeLeft(h, _this.config.labels.hours);
        displayTimeLeft(d, _this.config.labels.days);
        return ;
      }
      displayTimeLeft(s, _this.config.labels.seconds);
      displayTimeLeft(m, _this.config.labels.minutes);
      displayTimeLeft(h, _this.config.labels.hours);
      displayTimeLeft(d, _this.config.labels.days);
    }, 1000);
  }

  function pad2(number) {
    if (number < 10) return "0" + number;
    else return "" + number;
  }



  function displayTimeLeft (value, labels){ //displays time on the input
    displayOutput.forEach(el => {
      if(el.getAttribute("data-label") === labels) {
        el.textContent = value;
        return
      } 
    })
    update(value, 60, labels);
  }


  function update(value, timePercent, labels) {
    var offset = - length - length * value / (timePercent);
    pointer.forEach(el => {
      if(el.getAttribute("data-label") === labels) {
        el.previousElementSibling.style.strokeDashoffset = offset;
        el.style.transform = `rotate(${360 * value / (timePercent)}deg)`;
        return
      } 
    }) 
  };

  pauseTimer();
}
