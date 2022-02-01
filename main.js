//-----------------for Pie Chart------------------
$(document).ready(function () {
     $(function () {
          $(".pie-chart").easyPieChart({
               size: 150,
               barColor: "#8c391b",
               scaleColor: false,
               lineWidth: 10,
               trackColor: "#e19d82",

               animate: 1700,
          });
     });
});
// -------------------For Bar Chart-------------------
$(function () {
     $(".bars li .bar").each(function (key, bar) {
          var percentage = $(this).data("percentage");
          $(this).animate(
               {
                    height: percentage + "%",
               },
               1000
          );
     });
});

// ---------------------Slick JS--------------------------

$(document).ready(function () {
     $(".autoplay").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
     });
});

var bell_Count = 0;
function bell_icon() {
     if (bell_Count % 2 == 0) {
          document.querySelector(".fa-bell > ul").style.display = "block";
     } else {
          document.querySelector(".fa-bell > ul").style.display = "none";
     }
     bell_Count++;
}
var menu_Count = 0;
function meni_icon() {
     if (menu_Count % 2 == 0) {
          document.querySelector(".fa-chevron-down > ul").style.display =
               "block";
     } else {
          document.querySelector(".fa-chevron-down > ul").style.display =
               "none";
     }
     menu_Count++;
}
function menu_blur() {
     document.querySelector(".fa-chevron-down > ul").style.display = "none";
}

function bell_blur() {
     $(".fa-bell > ul").hide();
}

// -----------------line-chart-------------------

$(document).ready(function () {
     google.charts.load("current", { packages: ["corechart"] });
     google.charts.setOnLoadCallback(drawChart);

     function drawChart() {
          var data = google.visualization.arrayToDataTable([
               ["semester", "CGPA"],
               ["Sem 1", 3.0],
               ["Sem 2", 3.3],
               ["Sem 3", 3.0],
               ["Sem 4", 2.75],
               ["Sem 5", 2.94],
          ]);

          var options = {
               title: "CGPA Graph",
               curveType: "function",
               legend: { position: "bottom" },
          };

          var chart = new google.visualization.LineChart(
               document.getElementById("curve_chart")
          );

          chart.draw(data, options);
     }
});
