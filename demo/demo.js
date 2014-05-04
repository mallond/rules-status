//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global $: false*/

(function () {

    "use strict";

    function drawTable(data) {
        for (var i = 0; i < data.length; i++) {
            drawRow(data[i]);
        }
    }


    function drawRow(rowData) {
        var row = $("<tr />");
        $("#jtable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
        row.append($("<td>" + rowData.ownerId + "</td>"));
        row.append($("<td>" + rowData.status + "</td>"));
        row.append($("<td>" + rowData.priority + "</td>"));
        row.append($("<td>" + rowData.headerDescription + "</td>"));
        row.append($("<td>" + rowData.body.body + "</td>"));
    }


    function getList(data, pageNumber) {

        data.name = 'mary';
        data.pageNumber = pageNumber;

        var jdata = JSON.stringify(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/status/read",
            data: jdata,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            beforeSend: function (request) {
            },
            success: function (response) {
                drawTable(response);
                pageNumber = pageNumber + 1;
            },
            error: function (err) {
                // Todo
            }
        });


    }

    function getToken(pageNumber) {

        var name = {"name": "mary"};

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/authenticate",
            data: name,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            beforeSend: function (request) {
            },
            success: function (response) {
                getList(response, pageNumber);
            },
            error: function (err) {
                //todo
            }
        });

    }

    var pageNumber = 1;

    var idiv = document.createElement('div');
    idiv.id = "page";
    idiv.innerHTML = "Page: " + pageNumber.toString();


    $("#pageNumber").append(idiv);


    $("#next").click(function () {

        pageNumber = pageNumber + 1;

        $("#page").remove();
        var idiv = document.createElement('div');
        idiv.id = "page";
        idiv.innerHTML = "Page: " + pageNumber.toString();
        $("#pageNumber").append(idiv);

        $("#jtable td").remove();
        getToken(pageNumber);

    });

    $("#previous").click(function () {

        pageNumber = pageNumber - 1;

        $("#page").remove();
        var idiv = document.createElement('div');
        idiv.id = "page";
        idiv.innerHTML = "Page: " + pageNumber.toString();
        $("#pageNumber").append(idiv);

        $("#jtable td").remove();
        getToken(pageNumber);

    });


    getToken(pageNumber);

})();






