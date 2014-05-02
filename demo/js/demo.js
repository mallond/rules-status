//     http://www.bizrez.com
//     (c) 2004-2014 David Mallon
//     Freely distributed under the MIT license.


var datax = [
    {
        "ownerId": "fred",
        "status": "New",
        "priority": "Med",
        "header": "Header",
        "body": "body"
    },
    {
        "ownerId": "fred",
        "status": "New",
        "priority": "Med",
        "header": "Header",
        "body": "body"
    },
    {
        "ownerId": "fred",
        "status": "New",
        "priority": "Med",
        "header": "Header",
        "body": "body"
    },
    {
        "ownerId": "fred",
        "status": "New",
        "priority": "Med",
        "header": "Header",
        "body": "body"
    },
    {
        "ownerId": "fred",
        "status": "New",
        "priority": "Med",
        "header": "Header",
        "body": "body"
    },
    {
        "ownerId": "fred",
        "status": "New",
        "priority": "Med",
        "header": "Header",
        "body": "body"
    }
];

function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}


function drawRow(rowData) {
    var row = $("<tr />")
    $("#jtable").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
    row.append($("<td>" + rowData.ownerId + "</td>"));
    row.append($("<td>" + rowData.status + "</td>"));
    row.append($("<td>" + rowData.priority + "</td>"));
    row.append($("<td>" + rowData.header + "</td>"));
    row.append($("<td>" + rowData.body + "</td>"));
}



function put(data) {

    //curl -H "Content-Type: application/json" -b cookies.txt -c cookies.txt -X PUT -d '{"name":"john","password":"password"}' http://localhost:3000/status

    console.log('about to put the data ');

    //$.toJSON(myObj);
    data.name = 'mary';

    var jdata = JSON.stringify(data);
    console.log(jdata);


    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/status",
        data: jdata,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        beforeSend: function (request)
        {
        },
        success: function(response) {

        },
        error: function(err) {
            console.log(err);
        }
    });


}

function getToken() {



    var name = {"name":"mary"};

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/authenticate",
        data: name,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        beforeSend: function (request)
        {
            console.log('getting the token');
        },
        success: function(response) {

            console.log('success');
            console.log('going to put the data');
            console.dir(response);

            put(response);


        },
        error: function(err) {
            console.log('error in getting the token');
            console.log(err);

        }
    });


}


drawTable(datax);

getToken();






