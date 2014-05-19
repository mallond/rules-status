//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.

/*global $: false, console: false, alert: false*/

(function () {


    "use strict";

    var credentials = "";
    var pageNumber = 1;
    var itemCount = 0;
    var pageSize = 10;

    function getPageNumber() {

        return pageNumber;
    }

    function setPageNumber(pageNum) {
        pageNumber = pageNum;
    }

    function setItemCount(count) {
        itemCount = count;
    }

    function getItemCount() {
        return itemCount;
    }

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
        row.append($("<td>" + rowData.header + "</td>"));
        row.append($("<td>" + rowData.detail + "</td>"));
        row.append($("<td>" + "" + rowData._id + "</td>"));
    }

    function create(data, pageNumber) {

        data.userId = 'mary';
        data.pageNumber = pageNumber;
        data.token = getCredentials();
        data.user = $('#userSelected').val();
        data.status = $('#statusSelected').val();
        data.priority = $('#prioritySelected').val();
        data.header = $('#header').val();
        data.detail = $('#detail').val();

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

    function getList() {

        pageNumber = getPageNumber();

        var data = {};
        data.token = getCredentials();
        data.userId = 'mary';
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
                setItemCount(response.itemCount);
                console.dir(response);
                console.log("ItemCount:" + itemCount);
                drawTable(response.paginatedResults);

            },
            error: function (err) {
                // Todo
            }
        });

    }

    function authenticate(callback) {

        var data = {"userId": "mary"};
        var jdata = JSON.stringify(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/authenticate",
            data: jdata,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            beforeSend: function (request) {
            },
            success: function (response) {


                if (response.error) {



                    setError(response.error.msg);

                } else {
                    setCredentials(response.token);
                    callback();
                }

            },
            error: function (err) {
                setError(err);
            }
        });

    }

    function setError(err) {

        console.dir(err);

        $.jnotify("no go", 3000);
        //alert(err);
    }

    var idiv = document.createElement('div');
    idiv.id = "page";
    idiv.innerHTML = "Page: " + pageNumber.toString();

    $("#pageNumber").append(idiv);

    $("#next").click(function () {

        setPageNumber(getPageNumber()+1);
        var pgn = getPageNumber();

        $("#page").remove();
        var idiv = document.createElement('div');
        idiv.id = "page";
        idiv.innerHTML = "Page: " + pgn.toString();
        $("#pageNumber").append(idiv);
        $("#jtable td").remove();
        getList();

    });

    $("#previous").click(function () {

        setPageNumber(getPageNumber()-1);
        var pgn = getPageNumber();

        if (pgn<1) {
            pgn = 1;
        }

        $("#page").remove();
        var idiv = document.createElement('div');
        idiv.id = "page";
        idiv.innerHTML = "Page: " + pgn.toString();
        $("#pageNumber").append(idiv);
        $("#jtable td").remove();
        getList();

    });

    $("#create").click(function () {

       $.jnotify('Item Added ', 1000);
       var data = {};
       create(data, pageNumber);

    });

    $("#update").click(function () {

        $.jnotify('Item Updated ', 1000);
        var data = {};


    });

    $("#delete").click(function () {

        $.jnotify('Item Deleted ', 1000);
        var data = {};


    });

    setPageNumber(1);
    authenticate(getList);

    $.jnotify('Demo Loaded ', 1000);
    $.jnotify('Time to just Do it! ', 2000);


    // Switch
    $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();

})();






