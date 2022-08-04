
enum taskStatus{
    inProgress, completed,
}

let taskIdCounter : number = 0;
let taskData : Array<data> = [];

type data = { taskName : string;
    assignee : string;
    dueDate : Date;
    status : taskStatus;
    id : number;
}

function loadOptions() : void{
    let assigneeNames = ["Jayesh",  "Shibobrota", "Sarthak", "Anubhav", "Rishab", "Prabhjot", "Rakesh", "Abdul", "Hari Shankar", "Chetan", "Rahul"]
    let dropDown = document.getElementById("assignee");
    
    for(let i=0; i < assigneeNames.length; i++){
        var dropDownOption = document.createElement("option");
        dropDownOption.textContent = assigneeNames[i];
        dropDownOption.value = assigneeNames[i];
        if (dropDown){
            dropDown.appendChild(dropDownOption);
        }
    }
}

function insertToDoTask() : void{
    let progressTable = document.getElementById("progressTable") as HTMLTableElement;
    let taskValue = (document.getElementById("task")! as HTMLInputElement).value;
    let assigneeValue = (document.getElementById("assignee")! as HTMLInputElement).value;
    let dueDate = (document.getElementById('dueDate')! as HTMLInputElement).value;
    
    taskIdCounter += 1;
    
    if (!checkInput(taskValue.trim(), assigneeValue.trim(), dueDate.trim())){
        return;
    }
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (dueDate == ""){
        alert("Due Date is not given so end it by EOD");
        dueDate = todayDate.toLocaleDateString();
    }

    let dueDateObj = new Date(dueDate);
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = taskIdCounter.toString();
    appendTaskToProgressTable(taskValue, assigneeValue, dueDate,
         checkbox, progressTable);
    
    
    taskData.push({taskName : taskValue, assignee : assigneeValue, 
        dueDate : dueDateObj, status : taskStatus.inProgress, 
        id : taskIdCounter});
    checkbox.addEventListener("click", changeTableOnCheckbox);
    resetInputs();
    
}

function appendTaskToProgressTable(taskValue : string, assigneeValue : string, 
    dueDate : string, checkbox : HTMLElement, progressTable : HTMLElement){
    
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

function resetInputs() : void{
    (document.getElementById("task")! as HTMLInputElement).value = "";
    (document.getElementById("assignee")! as HTMLInputElement).value = "";
    (document.getElementById("dueDate")! as HTMLInputElement).value = "";
}

function checkInput(taskValue : string, assigneeValue : string, dueDate : string ):boolean{
    let dueDateObj = new Date(dueDate);
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (taskValue == null || taskValue == ""){  
        alert("Task can't be blank");  
        return false;  
    }
    else if(assigneeValue ==null || assigneeValue ==""){  
        alert("Assignee can't be blank.");  
        return false;  
    }
    else if (todayDate > dueDateObj){
        alert("Due Date can't be before today!!");
        return false;
    }
    return true;
}


function appendTaskToCompletedTable(cell : NodeListOf<ChildNode>): void{
    let completedTable = document.getElementById("completedTable") as HTMLTableElement;
    let completedTableRow = document.createElement("tr");

    let rowData1 = document.createElement('td');
    if(cell && cell[0] && (cell[0] as HTMLElement).innerText){
        rowData1.appendChild(document.createTextNode((cell[0] as HTMLElement).innerText));
    }
    
    let rowData2 = document.createElement('td');
    if(cell && cell[1] && (cell[1] as HTMLElement).innerText){
        rowData2.appendChild(document.createTextNode((cell[1] as HTMLElement).innerText));
    }

    let rowData3 = document.createElement('td');
    if(cell && cell[2] && (cell[2] as HTMLElement).innerText){
        rowData3.appendChild(document.createTextNode((cell[2] as HTMLElement).innerText));
    }

    completedTableRow.appendChild(rowData1);
    completedTableRow.appendChild(rowData2);
    completedTableRow.appendChild(rowData3);

    completedTable.appendChild(completedTableRow);
}


function changeTableOnCheckbox(event : any) : void{
    let taskId : number = +event.currentTarget.id;
    console.log(taskId);
    taskData[taskId - 1].status = taskStatus.completed;
    
    let progressTableRow = document.getElementById(`task_id${taskId}`);
    document.getElementById(`task_id${taskId}`)?.remove();
    
    let cell = progressTableRow?.childNodes
    if (cell){
        appendTaskToCompletedTable(cell);
    }   
}

loadOptions();
