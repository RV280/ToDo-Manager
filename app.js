"use strict";
var taskStatus;
(function (taskStatus) {
    taskStatus[taskStatus["IN_PROGRESS"] = 0] = "IN_PROGRESS";
    taskStatus[taskStatus["COMPLETED"] = 1] = "COMPLETED";
})(taskStatus || (taskStatus = {}));
let taskIdCounter = 0;
let taskData = [];
function loadOptions() {
    //let assigneeNames = ["Jayesh",  "Shibobrota", "Sarthak", "Anubhav", "Rishab", "Prabhjot", "Rakesh", "Abdul", "Hari Shankar", "Chetan", "Rahul"]
    let assigneeNames = [{ name: "Rahul", email: "rahul.varshney@dream11.com" },
        { name: "Jayesh", email: "jayesh@dream11.com" },
        { name: "Shibobroota", email: "shibobrota@dream11.com" },
        { name: "Sarthak", email: "sarthak@dream11.com" },
        { name: "Anubhav", email: "anubhav@dream11.com" },
        { name: "Rishab", email: "rishab@dream11.com" },
        { name: "Prabjhot", email: "prabjhot@dream11.com" }];
    let dropDown = document.getElementById("assignee");
    for (let i = 0; i < assigneeNames.length; i++) {
        var dropDownOption = document.createElement("option");
        dropDownOption.textContent = assigneeNames[i].name;
        dropDownOption.value = assigneeNames[i].name;
        if (dropDown) {
            dropDown.appendChild(dropDownOption);
        }
    }
}
function insertToDoTask() {
    let progressTable = document.getElementById("progressTable");
    let taskValue = document.getElementById("task").value;
    let assigneeValue = document.getElementById("assignee").value;
    let dueDate = document.getElementById('dueDate').value;
    taskIdCounter += 1;
    if (!checkInput(taskValue.trim(), assigneeValue.trim(), dueDate.trim())) {
        taskIdCounter -= 1;
        return;
    }
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (dueDate == "") {
        alert("Due Date is not given so end it by EOD");
        dueDate = todayDate.toLocaleDateString();
    }
    let dueDateObj = new Date(dueDate);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = taskIdCounter.toString();
    appendTaskToProgressTable(taskValue, assigneeValue, dueDate, checkbox, progressTable);
    taskData.push({ taskName: taskValue, assignee: assigneeValue,
        dueDate: dueDateObj, status: taskStatus.IN_PROGRESS,
        id: taskIdCounter });
    checkbox.addEventListener("click", changeTableOnCheckbox);
    resetInputs();
}
function appendTaskToProgressTable(taskValue, assigneeValue, dueDate, checkbox, progressTable) {
    let row = document.createElement("tr");
    row.id = `task_id${taskIdCounter}`;
    let rowData1 = document.createElement('td');
    rowData1.appendChild(document.createTextNode(taskValue));
    let rowData2 = document.createElement('td');
    rowData2.appendChild(document.createTextNode(assigneeValue));
    let rowData3 = document.createElement('td');
    rowData3.appendChild(document.createTextNode(dueDate));
    let rowData4 = document.createElement('td');
    rowData4.appendChild(checkbox);
    row.appendChild(rowData1);
    row.appendChild(rowData2);
    row.appendChild(rowData3);
    row.appendChild(rowData4);
    progressTable.appendChild(row);
}
function resetInputs() {
    document.getElementById("task").value = "";
    document.getElementById("assignee").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementsByName("task")[0].placeholder = "Enter a task name";
}
function checkInput(taskValue, assigneeValue, dueDate) {
    let dueDateObj = new Date(dueDate);
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (taskValue == null || taskValue == "") {
        //alert("Task can't be blank");
        document.getElementsByName("task")[0].placeholder = "Please enter a valid task name!";
        return false;
    }
    else if (assigneeValue == null || assigneeValue == "") {
        alert("Assignee can't be blank.");
        return false;
    }
    else if (todayDate > dueDateObj) {
        alert("Due Date can't be before today!!");
        return false;
    }
    return true;
}
function appendTaskToCompletedTable(cell) {
    let completedTable = document.getElementById("completedTable");
    let completedTableRow = document.createElement("tr");
    let rowData1 = document.createElement('td');
    if (cell && cell[0] && cell[0].innerText) {
        rowData1.appendChild(document.createTextNode(cell[0].innerText));
    }
    let rowData2 = document.createElement('td');
    if (cell && cell[1] && cell[1].innerText) {
        rowData2.appendChild(document.createTextNode(cell[1].innerText));
    }
    let rowData3 = document.createElement('td');
    if (cell && cell[2] && cell[2].innerText) {
        rowData3.appendChild(document.createTextNode(cell[2].innerText));
    }
    completedTableRow.appendChild(rowData1);
    completedTableRow.appendChild(rowData2);
    completedTableRow.appendChild(rowData3);
    completedTable.appendChild(completedTableRow);
}
function changeTableOnCheckbox(event) {
    var _a;
    let taskId = +event.currentTarget.id;
    console.log(taskId);
    taskData[taskId - 1].status = taskStatus.COMPLETED;
    let progressTableRow = document.getElementById(`task_id${taskId}`);
    (_a = document.getElementById(`task_id${taskId}`)) === null || _a === void 0 ? void 0 : _a.remove();
    let cell = progressTableRow === null || progressTableRow === void 0 ? void 0 : progressTableRow.childNodes;
    if (cell) {
        appendTaskToCompletedTable(cell);
    }
}
loadOptions();
