"use strict";
let assigneeName = ["Jayesh", "Rahul", "Prabhjot", "Shibobrota", "Anubhav", "Hari", "Sarthak", "Rakesh", "Abdul", "Chetan", "Rishab"];
let selectHandler = document.getElementById("assignee");
for (let i = 0; i < assigneeName.length; i++) {
    let name = assigneeName[i];
    var optionEle = document.createElement("option");
    optionEle.textContent = name;
    optionEle.value = name;
    selectHandler.appendChild(optionEle);
}
var taskStatus;
(function (taskStatus) {
    taskStatus[taskStatus["inProgress"] = 0] = "inProgress";
    taskStatus[taskStatus["completed"] = 1] = "completed";
})(taskStatus || (taskStatus = {}));
let taskIdCounter = 0;
let taskData = [];
function insertToDoTask() {
    let progressTable = document.getElementById("progressTable");
    let taskValue = document.getElementById("task").value;
    let assigneeValue = document.getElementById("assignee").value;
    let dueDate = document.getElementById('dueDate').value;
    taskIdCounter += 1;
    if (!checkInput(taskValue.trim(), assigneeValue.trim(), dueDate.trim())) {
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
        dueDate: dueDateObj, status: taskStatus.inProgress,
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
}
function checkInput(taskValue, assigneeValue, dueDate) {
    let dueDateObj = new Date(dueDate);
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (taskValue == null || taskValue == "") {
        alert("Task can't be blank");
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
    taskData[taskId - 1].status = taskStatus.completed;
    let progressTableRow = document.getElementById(`task_id${taskId}`);
    (_a = document.getElementById(`task_id${taskId}`)) === null || _a === void 0 ? void 0 : _a.remove();
    let cell = progressTableRow === null || progressTableRow === void 0 ? void 0 : progressTableRow.childNodes;
    if (cell) {
        appendTaskToCompletedTable(cell);
    }
}