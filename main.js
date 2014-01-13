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

    var item = function(t,d) { addItem({title: t, description: d}); };

    item("GeForce GTX 670", "NVidia GPU");
    item("Radeon 9700", "AMD GPU");
    item("Core i7", "Intel CPU");

});