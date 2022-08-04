var taskStatus;
(function (taskStatus) {
    taskStatus[taskStatus["inProgress"] = 0] = "inProgress";
    taskStatus[taskStatus["completed"] = 1] = "completed";
})(taskStatus || (taskStatus = {}));
var taskIdCounter = 0;
var taskData = [];
function loadOptions() {
    var assigneeNames = ["Jayesh", "Shibobrota", "Sarthak", "Anubhav", "Rishab", "Prabhjot", "Rakesh", "Abdul", "Hari Shankar", "Chetan", "Rahul"];
    var dropDown = document.getElementById("assignee");
    for (var i = 0; i < assigneeNames.length; i++) {
        var dropDownOption = document.createElement("option");
        dropDownOption.textContent = assigneeNames[i];
        dropDownOption.value = assigneeNames[i];
        if (dropDown) {
            dropDown.appendChild(dropDownOption);
        }
    }
}
function insertToDoTask() {
    var progressTable = document.getElementById("progressTable");
    var taskValue = document.getElementById("task").value;
    var assigneeValue = document.getElementById("assignee").value;
    var dueDate = document.getElementById('dueDate').value;
    taskIdCounter += 1;
    if (!checkInput(taskValue.trim(), assigneeValue.trim(), dueDate.trim())) {
        return;
    }
    var todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (dueDate == "") {
        alert("Due Date is not given so end it by EOD");
        dueDate = todayDate.toLocaleDateString();
    }
    var dueDateObj = new Date(dueDate);
    var checkbox = document.createElement("input");
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
    var row = document.createElement("tr");
    row.id = "task_id".concat(taskIdCounter);
    var rowData1 = document.createElement('td');
    rowData1.appendChild(document.createTextNode(taskValue));
    var rowData2 = document.createElement('td');
    rowData2.appendChild(document.createTextNode(assigneeValue));
    var rowData3 = document.createElement('td');
    rowData3.appendChild(document.createTextNode(dueDate));
    var rowData4 = document.createElement('td');
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
    var dueDateObj = new Date(dueDate);
    var todayDate = new Date();
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
    var completedTable = document.getElementById("completedTable");
    var completedTableRow = document.createElement("tr");
    var rowData1 = document.createElement('td');
    if (cell && cell[0] && cell[0].innerText) {
        rowData1.appendChild(document.createTextNode(cell[0].innerText));
    }
    var rowData2 = document.createElement('td');
    if (cell && cell[1] && cell[1].innerText) {
        rowData2.appendChild(document.createTextNode(cell[1].innerText));
    }
    var rowData3 = document.createElement('td');
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
    var taskId = +event.currentTarget.id;
    console.log(taskId);
    taskData[taskId - 1].status = taskStatus.completed;
    var progressTableRow = document.getElementById("task_id".concat(taskId));
    (_a = document.getElementById("task_id".concat(taskId))) === null || _a === void 0 ? void 0 : _a.remove();
    var cell = progressTableRow === null || progressTableRow === void 0 ? void 0 : progressTableRow.childNodes;
    if (cell) {
        appendTaskToCompletedTable(cell);
    }
}
loadOptions();
