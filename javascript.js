function insertToDoTask() {
    var table = document.getElementById("progressTable");
    var taskv=document.getElementById("task").value;
    var namev = document.getElementById("assignee").value;
    var dd = document.getElementById('dueDate').value;
    //var curr_date = getTime();
    var todayDate = new Date();
    var dd1 = new Date(dd);

    if (taskv==null || taskv==""){  
        alert("Task can't be blank");  
        return false;  
    }
    
    else if(namev==null || namev==""){  
        alert("Assignee can't be blank.");  
        return false;  
    }
    else if (dd == ""){
        alert("Due Date is not given so end it by EOD");
        dd = todayDate;
    }
    else if (todayDate > dd1){
        alert("Due Date can't be before today!!");
        return false;
    }
    // else if(dd.getTime() < curr_date.getTime()){  
    //     alert("Assignee can't be blank.");  
    //     return false;  
    // }
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = taskv;
    cell2.innerHTML = namev;
    cell3.innerHTML = dd;
    cell4.appendChild(checkbox);
    checkbox.addEventListener("click", changeTableOnCheckbox);
}

function changeTableOnCheckbox(){
    var table = document.getElementById("progressTable").tBodies[0];
    var rowCount = table.rows.length;

// var i=1 to start after header
    for(var i=1; i<rowCount; i++) {
        var row = table.rows[i];
    // index of td contain checkbox is 8
        var chkbox = row.cells[3].getElementsByTagName('input')[0];
        if('checkbox' == chkbox.type && true == chkbox.checked) {
            addCompletedTask(row);
            table.deleteRow(i);
        }
    }
}

function addCompletedTask(row_data){
    var table = document.getElementById("completedTable");
    var temp1 = row_data.cells[0].innerHTML;
    var temp2 = row_data.cells[1].innerHTML;
    var temp3 = row_data.cells[2].innerHTML;
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = temp1;
    cell2.innerHTML = temp2;
    cell3.innerHTML = temp3;
}
 
