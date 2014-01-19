/**
 * Created by Bajtek on 1/13/14.
 */

// Stuff
String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var addItem;


// Code
$(function(){

    addItem = function() {
    var source   = $("#item-template").html();
        var template = Handlebars.compile(source);

        return function(item) {
            var itemHtml = template(item);
            $("#items").append(itemHtml);
        }
    }();


    $("#searchBox").on("input", function(){
        var term = $(this).val();
        var items = $("div.item");

        items.show();

        if (term === "")
            return;

        items = items.filter(function(){
            var title = $(this).children("h1:first").text();

            return !title.contains(term);
        });

        items.hide();
    });

    // dummy items

    var item = function (t, d, p) { addItem({ title: t, description: d, price: "$" + p }); };

    item("GeForce GTX 670", "NVidia GPU", 1100);
    item("Radeon 9700", "AMD GPU", 900);
    item("Core i7", "Intel CPU", 1400);

    
    var resize = function () {
        // set canvas to its actual pixel size
        var itemChart = document.getElementById("itemChart");
        itemChart.width = itemChart.clientWidth;
        itemChart.height = itemChart.clientHeight;
    };
    $(window).resize(resize);
    resize();

    //$("div.item").click(function () {
        var details = $("#itemDetails");
        var lineChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    fillColor: "rgba(0, 82, 89, 0.8)",
                    strokeColor: "#F4E7BA",
                    pointColor: "#F4E7BA",
                    pointStrokeColor: "rgba(0, 82, 89, 0.8)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    fillColor: "rgba(95, 138, 131, 0.5)",
                    strokeColor: "rgba(0, 82, 89, 1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        }

        var options = {
            scaleFontColor: "#F4E7BA",
            scaleGridLineColor: "#F4E7BA"
        };

        var myLine = new Chart(document.getElementById("itemChart").getContext("2d")).Line(lineChartData, options);
   // });
});