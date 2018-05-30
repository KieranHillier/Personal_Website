$(window).resize(function() {
if ($('.home-typer').length > 0) {
  var height = (window.innerHeight - 288)
  height = (height > 1100) ? 1100 : (height < 920) ? 920 : height
      $('.home-typer').css('height', height+'px')
      console.log(height);
}
}).resize();

var TxtType = function(el, toRotate, period) {
 this.toRotate = toRotate; //all the strings to de displayed
 this.el = el;
 this.loopNum = 0; //how many times a string has been completed and deleted
 this.period = 2000; //amount of time before word starts to delete and next rotation begins
 this.txt = '';
 this.tick();
 this.isDeleting = false;
};

TxtType.prototype.tick = function() {
 var i = this.loopNum % this.toRotate.length; //loop between 0 - 3
 var fullTxt = this.toRotate[i]; //current string to print

 if (this.isDeleting) {
 this.txt = fullTxt.substring(0, this.txt.length - 1);
 } else {
 this.txt = fullTxt.substring(0, this.txt.length + 1);
 }

 this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

 var that = this;
 var delta = 120 ; //amount of time waited before writing next character (smaller number is quicker) add [- Math.random() * 100] to make typing more realistic
 console.log(delta);

 if (this.isDeleting) { delta /= 20; } //speed of deleting text

 if (!this.isDeleting && this.txt === fullTxt) {
 delta = this.period;
 console.log(delta);
 this.isDeleting = true;
 } else if (this.isDeleting && this.txt === '') {
 this.isDeleting = false;
 this.loopNum++;
 delta = 500; // amount of time waited once word is deleted and next one begins to be written
 console.log(delta);
 }

 setTimeout(function() {
 that.tick();
 }, delta);
};

window.onload = function() {
 var elements = document.getElementsByClassName('typewrite');
 for (var i=0; i<elements.length; i++) {
     var toRotate = elements[i].getAttribute('data-type');
     var period = elements[i].getAttribute('data-period');
     console.log(toRotate);
     console.log(period);
     if (toRotate) {
       new TxtType(elements[i], JSON.parse(toRotate), period);
     }
 }
};

// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//   var currentScrollPos = window.pageYOffset;
//   // console.log(currentScrollPos);
//   if (currentScrollPos < 10 || currentScrollPos > 550) {
//     document.getElementById("header").style.top = "0";
//   } else {
//     document.getElementById("header").style.top = "-200px";
//   }
//   // prevScrollpos = currentScrollPos;
// }
