// var myNodelist = document.getElementsByClassName

addBtn.addEventListener("click", addTodoItem, false);
myInput.addEventListener("keydown", addTodoItem, false);

var todoItem = [];

function addTodoItem(e) {
    if ((e.type == "keydown") && (e.keyCode != 13)) {
        return;
    }
    if (myInput.value.length < 1) {
        return;
    }
    if (!todoItem.includes(myInput.value)) {
        var newTodoItem = document.createElement("p");
        newTodoItem.innerText = myInput.value;

        // newTodoItem.addEventListener("click", todoItemDone, false);
        // newTodoItem.addEventListener("dblclick", todoItemRemove, false)

        list.appendChild(newTodoItem);
        todoItem.push(myInput.value);
        myInput.value = "";
    }

}