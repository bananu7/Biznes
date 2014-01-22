"use strict";
/**
 * Created by Bajtek on 1/13/14.
 */

// Stuff
String.prototype.contains = function (it) { return this.indexOf(it) != -1; };
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomIntTable(min, max, length) {
    var t = [];
    for (var i = 0; i < length; i++) {
        t.push(getRandomInt(min, max));
    }
    return t;
}

//var item = function (t, d, p) { addItem({ title: t, description: d, price: "$" + p }); };
var items = [
    {
        title: "GeForce GTX 670",
        description: "NVidia GPU",
        dataSets: [
            { name: "Ceneo.pl", data: getRandomIntTable(1000, 1300, 7) }
        ]
    },
    {
        title: "Radeon 9700",
        description: "AMD GPU",
        dataSets: [
            { name: "Ceneo.pl", data: getRandomIntTable(900, 1500, 7) }
        ]
    },
    {
        title: "Core i7",
        description: "Intel CPU",
        dataSets: [
            { name: "Ceneo.pl", data: getRandomIntTable(1200, 1600, 7) }
        ]
    }
];

// Code
$(function(){
    function loadItems() {
        var showData = function (item) {
            var details = $("#itemDetails");

            var datasetsTemplates = [
                    {
                        fillColor: "rgba(0, 82, 89, 0.8)",
                        strokeColor: "#F4E7BA",
                        pointColor: "#F4E7BA",
                        pointStrokeColor: "rgba(0, 82, 89, 0.8)",
                    },
                    {
                        fillColor: "rgba(95, 138, 131, 0.5)",
                        strokeColor: "rgba(0, 82, 89, 1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                    }
            ];

            var lineChartData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: []
            };

            for (var i = 0; i < item.dataSets.length; i++) {
                var set = datasetsTemplates[i % datasetsTemplates.length];
                set.data = item.dataSets[i].data;

                lineChartData.datasets.push(set);
            }

            var options = {
                scaleFontColor: "#F4E7BA",
                scaleGridLineColor: "#F4E7BA"
            };

            var parent = document.getElementById('itemDetails');
            var canvas = document.getElementById('itemChart');
            parent.removeChild(canvas);

            canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 300;
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.id = "itemChart";
            parent.appendChild(canvas);

            var myLine = new Chart(document.getElementById("itemChart").getContext("2d")).Line(lineChartData, options);
        };

        var addItem = function () {
            var source = $("#item-template").html();
            var template = Handlebars.compile(source);

            return function (item) {
                var itemHtml = template(item);
                var itemJQ = $(itemHtml);
                $("#items").append(itemJQ);
                itemJQ.click(function () {
                    showData(item);
                });
            }
        }();

        for (var i = 0; i < items.length; i++) {
            addItem(items[i]);
        }
    }


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

    loadItems();

    var resize = function () {
        // set canvas to its actual pixel size
        var itemChart = document.getElementById("itemChart");
        itemChart.width = itemChart.clientWidth;
        itemChart.height = itemChart.clientHeight;
    };
    $(window).resize(resize);
    resize();
});