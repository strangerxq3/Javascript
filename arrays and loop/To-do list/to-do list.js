
const ToDoList = [{name :'washing', duedate: '14/11/23' }, {name:'clotthing',duedate:'13/11/23'}];
rendertodolist();
function rendertodolist() {

    let todolistHTML = '';
    
    for (let i = 0; i < ToDoList.length; i++) {

        const todoOject = ToDoList[i];
        const { name }= todoOject;
        const { duedate } = todoOject;
        const html = 
        `<p> 
        ${name} ${duedate}
        <button onclick ="ToDoList.splice(${i},1); rendertodolist();"> Delete </button> 
        </p>`;
        todolistHTML = todolistHTML + html;

    }
    document.querySelector('.js-loop').innerHTML = todolistHTML
}

function todofunc() {
    
    const inputElement = document.querySelector('.js-input');
    const name = inputElement.value;
    
    const dateinputElement = document.querySelector('.js-date');
    const duedate = dateinputElement.value;
    
    ToDoList.push({ name , duedate});
    
    console.log(ToDoList)
    
    
    inputElement.value = '';
    
    rendertodolist()
}
// console.log(todolistHTML)

function CostKeydown(event) {
    if (event.key === 'Enter') {
        todofunc();
    }
}