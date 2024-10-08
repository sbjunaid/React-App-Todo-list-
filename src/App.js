import './App.css';
import Header from "./Mycomponents/Header";
import {Todos} from "./Mycomponents/Todos";
import Footer from "./Mycomponents/Footer";
import React, { useState ,useEffect} from 'react';
import {AddTodo} from './Mycomponents/AddTodo';
import About from "./Mycomponents/About";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete=(todo)=>{
    console.log("Iam delete",todo)
    // let index=todos.indexOf(todo);
    // todos.splice(index,1);

    setTodos(todos.filter((e)=>{
      return e!==todo;
    }));
    localStorage.setItem("todos",JSON.stringify(todos));
    
  }
  const addTodo =(title,desc)=>{
    console.log("I am adding todo",title,desc);
    let sno;
    if(todos.length===0){
      sno=0
    }
    else{
      sno=todos[todos.length-1].sno+1;
    }
    
    const myTodo ={
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
    
    
  }
  const [todos,setTodos] = useState(initTodo);

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
   } ,[todos]
  )

  return (
    <>
    <Router>
    <Header title="MyTodosList" searchBar={false} />
    <Routes>
          <Route exact path="/" element={
            <> 
            <AddTodo addTodo={addTodo}/>
            <Todos todos={todos} onDelete={onDelete}/>
            </>
            
          }/>
          
          <Route exact path="/About" element={<About />}/>
            
        </Routes>
    
    <Footer/>
    </Router>
    </>
  );
}

export default App;
