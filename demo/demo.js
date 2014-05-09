//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global $: false, console: false*/

(function () {


    "use strict";

    var credentials = "";

    function setCredentials(cred) {

        credentials = cred;

    }

    function getCredentials() {

        return credentials;

    }

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

    function create(data, pageNumber) {

        data.name = 'mary';
        data.pageNumber = pageNumber;
        data.token = getCredentials();
        data.user = $('#userSelected').val();
        data.status = $('#statusSelected').val();
        data.priority = $('#prioritySelected').val();
        data.header = $('#header').val();
        data.body = $('#body').val();

        var jdata = JSON.stringify(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/status/create",
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

    function getList(pageNumber) {

        pageNumber = pageNumber + 1;

        var data = {};
        data.token = getCredentials();
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
                console.dir(response);
                drawTable(response);
                pageNumber = pageNumber + 1;
            },
            error: function (err) {
                // Todo
            }
        });

    }

    function authenticate(callback) {

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

                console.log('gettoken success:'+ response.token);
                setCredentials(response.token);
                callback();
                //return response.token;
                //getList(response, pageNumber);
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
        getList(pageNumber);

    });

    $("#previous").click(function () {

        pageNumber = pageNumber - 1;
        $("#page").remove();
        var idiv = document.createElement('div');
        idiv.id = "page";
        idiv.innerHTML = "Page: " + pageNumber.toString();
        $("#pageNumber").append(idiv);
        $("#jtable td").remove();
        getList(pageNumber);

    });

    $("#create").click(function () {

       $.jnotify('Item Added ', 1000);
       var data = {};
       create(data, pageNumber);

    });

    authenticate(getList);

    $.jnotify('Demo Loaded ', 1000);
    $.jnotify('Time to just Do it! ', 2000);

})();






