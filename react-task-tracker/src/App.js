
import { useState,useEffect } from "react";
import Button from "./components/Button";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = ()=> {
  const[showAddTask, setShowAddTask]= useState(false)

  const [tasks, setTasks] =  useState([])
useEffect(()=>{
  const getTasks = async () =>{
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
  getTasks();
}, [] )

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

    //add task


    //adding task without json server - here creating random id but json server will do it auto
     // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

    //delete task
    const deleteTask = async (id)=>{
      await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE'})
      setTasks(tasks.filter((task)=>task.id!==id))
    }

    //toggle reminder

      // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }
    // const  toggleReminder = (id)=>{
    //   setTasks(tasks.map((task)=>task.id===id?{...task, reminder:!task.reminder}:task))
    // }

  return (

    <div className="container">
    <Header onAdd={()=>setShowAddTask(!showAddTask)}  showAdd = {showAddTask}/>
    {showAddTask && <AddTask onAdd = {addTask}/>}
    {tasks.length>0?
    <Tasks 
    tasks = {tasks} 
    onDelete = {deleteTask} 
    onToggle = {toggleReminder}/>
    :'No tasks to show'}
   
    </div>
  );
}

export default App;
