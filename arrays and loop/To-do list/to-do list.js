
const ToDoList = ['washing' , ' clotthing'];
rendertodolist();
function rendertodolist() {

    let todolistHTML = '';
    
    for (let i = 0; i < ToDoList.length; i++) {

        const todo = ToDoList[i]
        const html = `<p> ${todo} </p>`
        todolistHTML = todolistHTML + html

    }
    document.querySelector('.js-loop').innerHTML = todolistHTML
}

function todofunc() {
    
    const inputElement = document.querySelector('.js-input');
    
    const name = inputElement.value;
    
    ToDoList.push(name);
    
    console.log(ToDoList)
    
    rendertodolist()
    
    inputElement.value = '';
    
}
// console.log(todolistHTML)

function CostKeydown(event) {
    if (event.key === 'Enter') {
        todofunc();
    }
}