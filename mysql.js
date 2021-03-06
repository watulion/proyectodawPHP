/**
 * Created by lsanchez on 11/24/15.
 */


var request;

function log() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    mysqlLogin(username, password);
}

function createAccount() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var values = [username, password];
    var columns = ["username", "password"];
    var table = "user";
    mysqlInsert(table, columns, values);
}


function getRequestObject() {
    if (window.ActiveXObject) {
        return (new ActiveXObject("Microsoft.XMLHTTP"));
    } else if (window.XMLHttpRequest) {
        return (new XMLHttpRequest());
    } else {
        return (null);
    }
}

function handleResponse() {
    if (request.status == 200) {
        alert(request.responseText);
        if (request.responseText == '"Login correcto"') {
            window.location.href = "index.php";

        }
    }
}

function mysqlLogin(username, password) {
    request = new XMLHttpRequest();
    console.log("entro este meme");
    request.open("POST", 'ajaxHandler.php', true);
    request.onload = handleResponse;
    var data = new FormData();
    data.append("function", "login");
    data.append("username", username);
    data.append("password", password);
    request.send(data);
}

function mysqlSelect(table, columns, where) {
    request = getRequestObject();
    request.open("POST", 'ajaxHandler.php', true);
    request.onload = handleResponse;
    var data = new FormData();
    data.append("function", "select");
    data.append("table", table);
    var columnsString = JSON.stringify(columns);
    data.append("columns", columnsString);
    console.log(columnsString);

    data.append("where", where);
    request.send(data);
}


//update
function mysqlUpdate(table, columns, values, where) {
    request = getRequestObject();
    request.open("POST", 'ajaxHandler.php', true);
    request.onload = handleResponse;
    var data = new FormData();
    data.append("function", "update");
    data.append("table", table);
    var columnsString = JSON.stringify(columns);
    data.append("columns", columnsString);
    var valuesString = JSON.stringify(values);
    data.append("values", valuesString);
    console.log(valuesString);
    console.log(values);
    console.log("cool");
    data.append("where", where);
    request.send(data);
}

//insert
function mysqlInsert(table, columns, values) {
    request = getRequestObject();
    console.log("entro este meme de insert");
    console.log(columns);
    console.log(values);
    request.open("POST", 'ajaxHandler.php', true);
    request.onload = handleResponse;
    var data = new FormData();
    data.append("function", "insert");
    data.append("table", table);
    var columnsString = JSON.stringify(columns);
    console.log(columnsString);
    data.append("columns", columnsString);
    var valuesString = JSON.stringify(values);
    console.log(valuesString);
    data.append("values", valuesString);
    request.send(data);
}

//delete
function mysqlDelete(table, where) {
    request = getRequestObject();
    request.open("POST", 'ajaxHandler.php', true);
    request.onload = handleResponse;
    var data = new FormData();
    data.append("function", "delete");
    data.append("table", table);
    data.append("where", where);
    request.send(data);
}

//create
function mysqlCreate(table, columns) {
    request = getRequestObject();
    request.open("POST", 'ajaxHandler.php', true);
    request.onload = handleResponse;
    var data = new FormData();
    data.append("function", "create");
    data.append("table", table);
    var columnsString = JSON.stringify(columns);
    data.append("columns", columnsString);
    console.log(columnsString);
    request.send(data);
}

//drop
function mysqlDrop(table) {
    request = getRequestObject();
    request.open("POST", 'ajaxHandler.php', true);
    request.onload = handleResponse;
    var data = new FormData();
    data.append("function", "drop");
    data.append("table", table);
    request.send(data);
}

//alter
function mysqlAlter(table, operation, column) {
    request = getRequestObject();
    request.open("POST", 'ajaxHandler.php', true);
    request.onload = handleResponse;
    var data = new FormData();
    data.append("function", "alter");
    data.append("table", table);
    data.append("operation", operation);
    data.append("column", column);
    request.send(data);
}