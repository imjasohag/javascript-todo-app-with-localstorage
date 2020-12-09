// selector
const todo_input=document.querySelector("#todo_input");
const todo_btn=document.querySelector("#todo_btn");
const todo_ul=document.querySelector("#todo-ul")
const todo_filter=document.querySelector("#todo-filter")

let todos=[];
const key="todo_key"

// check local storage ; get data from local storage
if(localStorage.getItem(key)!==null){
    //string to javascript arry/obj
    todos=JSON.parse(localStorage.getItem(key))
}

todos.forEach((todo) => {

        // completed check
        let completed=""
        if (todo.isCompleted===true){
            completed="li-class"
        }



    todo_ul.insertAdjacentHTML("beforeend",
            `<li class="list-group-item d-flex justify-content-between align-items-start my-2 border border-primary text-justify ${completed}">
                    ${todo.title}
                   <div class="d-flex">
                        <button title="mark todo as completed" class="btn btn-success ml-2"><i class="fa fa-check-square " aria-hidden="true"></i></button>     
                        <button title="delete todo" class="btn btn-danger ml-2"><i class="fa fa-trash-o " aria-hidden="true"></i></button> 
                   </div>
            </li>`)
});



// add event listener
todo_btn.addEventListener("click",addtodo);
todo_ul.addEventListener("click",com_del_todo);
todo_filter.addEventListener("change",todo_selection);


// add todo function
function addtodo(event){
    event.preventDefault();

    if(todo_input.value===undefined || todo_input.value===null || todo_input.value===""){
        alert("write something first")
        
    }
    else{

       
        // todo ui

        todo_ul.insertAdjacentHTML("beforeend",
            `<li class="list-group-item d-flex justify-content-between align-items-start my-2 border border-primary text-justify">
                    ${todo_input.value}
                   <div class="d-flex">
                        <button class="btn btn-success ml-2"><i class="fa fa-check-square " aria-hidden="true"></i></button>     
                        <button class="btn btn-danger ml-2"><i class="fa fa-trash-o " aria-hidden="true"></i></button> 
                   </div>
            </li>`)
            
        //local storage start
         // creating todo object
         const value=todo_input.value
         const date=new Date();
         const time=date.getTime();
         const todo_obj={
             id:time,
             title:value,
             isCompleted:false
         }
         // push object into temporary array
         todos.push(todo_obj)
         //save array into local storage
         localStorage.setItem(key,JSON.stringify(todos));

         //local storage end 


         todo_input.value="";
    
    }
}


// complete/delete todo function

function com_del_todo(event){
    const click_target=event.target;
    // detele todo fuction
    if (click_target.classList[1]==="btn-danger"){
        const todo=click_target.parentNode.parentNode;
        const ck = confirm("Sure to delete?");//yes->true.n0->false//enter 1 if you awnt to delete
        
        if (ck) {
            // li delete from ui
            todo.remove();
                //li delete into local strorage
                todos=todos.filter(todo_item=>{
                   
                    if(todo_item.title.trim()===todo.innerText.trim()){
                        return false;
                    }else{
                        return true;
                    }
                    
                });
                console.log(`after delete `,todos);

                localStorage.setItem(key,JSON.stringify(todos));

        }else{
            
            console.log("cancel the deletion");
        }
    }
    
        // complete button starts
   
    else if (click_target.classList[1]==="btn-success"){
        const todo=click_target.parentNode.parentNode;

        //check todo completed or not
        if(todo.classList.contains("li-class")){
            alert("todo is already completed")
        }
        else{
            //complete the todo
            const ck=confirm("are you sure it is completed?");
        if(ck){
                todo.classList.add("li-class");
                //li save into local strorage
                    todos=todos.map(todo_item=>{
                            if(todo_item.title===todo.innerText){
                            todo_item.isCompleted=true
                            return todo_item;
                            }else{
                            return todo_item;
                            }
                            
                        });
                    console.log(todos);

                    localStorage.setItem(key,JSON.stringify(todos));
                    

            }
        else{

            }
        }

        }
}


// todo filter function

function todo_selection(e){
    //const todo=todo_ul.childNodes;
    const todo=todo_ul.children;
    console.log(todo)

    switch( e.target.value ){//all,completed,unco...
        case"completed":                                    // todo=[0.........li.1.2.3.4] todo.item(o)
            for(let i=0;i<todo.length;i++){
                const item=todo.item(i);//li li li->li-class
                // console.log(item);
                if(item.classList.contains("li-class")){
                    // console.log("completed ",item);
                    item.classList.remove("hide")
                    item.classList.add("show")
                }else{
                    item.classList.remove("show")
                    item.classList.add("hide")
                }
            }
        break;
        case"uncompleted":
            for(let i=0;i<todo.length;i++){
                const item=todo.item(i);//li li li->li-class
                if(!item.classList.contains("li-class")){
                    console.log("uncompleted ",item);
                    item.classList.remove("hide")
                    item.classList.add("show")
                }else{
                    item.classList.remove("show")
                    item.classList.add("hide")
                }
            }   
        break;
        default:
            for(let i=0;i<todo.length;i++){
                const item=todo.item(i);//li li li->li-class
                item.classList.remove("hide")
                item.classList.add("show")
            }

      }

}




