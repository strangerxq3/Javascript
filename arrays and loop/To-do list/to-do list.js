const ToDo_List =[]
// let  todo = ToDo_List.value
function ToDoList(){
    const inputElement = document.querySelector('.js-input');
    let ToDo_name=inputElement.value;
    ToDo_List.push(ToDo_name);
    console.log(ToDo_List)
    inputElement.value ='';
    // document.querySelector('js-div').innerHTML =todo;
}

function CostKeydown(event) {
    // console.log(event.key)
    if (event.key === 'Enter') {
            ToDoList();
    }
}