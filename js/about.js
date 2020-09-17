// Get the id of the <path> element and the length of <path>
var myline = document.getElementById("myline");
var myline2 = document.getElementById("myline2");
var length = myline.getTotalLength();
var length2 = myline2.getTotalLength();
circle = document.getElementById("circle");
circle2 = document.getElementById("circle2");

// The start position of the drawing

// Hide the triangle by offsetting dash. Remove this line to show the triangle before scroll draw
myline.style.strokeDashoffset = length;
myline.style.strokeDasharray = length;
myline2.style.strokeDashoffset = length2;
myline2.style.strokeDasharray = length2;
endPoint = myline.getPointAtLength(0);
circle.setAttribute("cx", endPoint.x);
circle.setAttribute("cy", endPoint.y);
endPoint2 = myline2.getPointAtLength(0);
circle2.setAttribute("cx", endPoint2.x);
circle2.setAttribute("cy", endPoint2.y);
// Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
//window.addEventListener("scroll", myFunction);

// function myFunction() {
//     // What % down is it?
//     var scrollpercent = (myline.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
//     // Length to offset the dashes

//     var draw = (length * scrollpercent * 1.8);

//     // Reverse the drawing (when scrolling upwards)
//     myline.style.strokeDashoffset = length - draw;

// }

$(document).ready(function () {
  $(window).scroll(function () {
    var windowBottom = $(this).scrollTop() + $(this).height();

    var element1Top = $("#svgContainer").offset().top;
    var percentage1 =
      (windowBottom - element1Top) / $("#svgContainer").height();
    if (percentage1 - 0.4 > 0) {
      var draw = length * (percentage1 - 0.4);
      if (draw > length) {
        draw = length;
      }
      myline.style.strokeDashoffset = length - draw;
    }

    var element2Top = $("#svgContainer2").offset().top;
    var percentage2 =
      (windowBottom - element2Top) / $("#svgContainer2").height();
    if (percentage2 - 0.3 > 0) {
      var draw = length2 * (percentage2 - 0.3);
      if (draw > length2) {
        draw = length2;
      }
      myline2.style.strokeDashoffset = length2 - draw;
    }
  });
});
