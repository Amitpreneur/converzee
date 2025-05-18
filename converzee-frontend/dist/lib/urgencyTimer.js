function urgencyTimer(id, text, timer) {
  var countDownDate = new Date(timer).getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var myele = document.getElementById(id);
    if(myele){
      myele.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      if (distance < 0) {
      clearInterval(x);
      document.getElementById(id).innerHTML = text;
      window.location.replace("http://google.com");
    }
    }
  }, 1000);
}

