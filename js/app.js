const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// Type Method
TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fullTxt = this.words[current];

  // Check if deleting
  if (this.isDeleting) {
    // Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type Speed
  let typeSpeed = 100;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

const Main = function () {
  var $bl = $("#container"),
    $th = $("#inner"),
    blW = $bl.outerWidth(),
    blSW = $bl[0].scrollWidth,
    wDiff = blSW / blW - 0.9, // widths difference ratio
    mPadd = 0, // Mousemove Padding
    damp = 50, // Mousemove response softness
    mX = 0, // Real mouse position
    mX2 = 0, // Modified mouse position
    posX = 0,
    mmAA = blW - mPadd * 2, // The mousemove available area
    mmAAr = blW / mmAA; // get available mousemove fidderence ratio

  //$bl.scrollLeft(($bl.width() - $th.width()) / 2);

  $bl.mousemove(function (e) {
    mXL = e.pageX - this.offsetLeft;
    mXR = -(e.pageX - this.getBoundingClientRect().right);
    console.log("left:" + mXL);
    console.log("Right:" + mXR);
    mXLR = mXR - mXL * 2;
    console.log(mXLR);
    mX2 = mXLR - mPadd * mmAAr;
  });

  setInterval(function () {
    posX += (mX2 - posX) / damp; // zeno's paradox equation "catching delay"
    $th.css({ marginRight: -posX * wDiff });
  }, 10);

  $("#about").hover(function () {
    $("body").css("background-color", "#363636");
    $("a").css("color", "#6fcb9f");
    $("body").css("color", "#6fcb9f");
  });

  $("#work").hover(function () {
    $("body").css("background-color", "#C02942");
    $("a").css("color", "#ffe28a");
    $("body").css("color", "#ffe28a");
  });

  $("#contact").hover(function () {
    $("body").css("background-color", "#300b3b");
    $("a").css("color", "#e5d2b4");
    $("body").css("color", "#e5d2b4");
  });
};

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
  new Main();
}
