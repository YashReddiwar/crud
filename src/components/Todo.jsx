import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

function Todo() {
    const [tasks,setTasks]=useState([]);
    const [task,setTask]=useState('');
    const [isEdit,setIsEdit]=useState(false);
    const [editIndex,seteditIndex]=useState(null);

    const addTask=()=>{
        if(!task.trim())
        {
            toast.error("error");
        }

        const newTask={id:uuidv4(),task:task};
        setTasks([...tasks,newTask]);
        setTask('');
        toast.success("task added");
    }

    const deleteTask=(id)=>{
      setTasks(tasks.filter((value)=>value.id!== id));
      toast.error("task deleted")
    }

    const editTask=(id)=>{
    const foundTask=tasks.find((value)=>value.id===id);
    setTask(foundTask.task);
    seteditIndex(id);
    setIsEdit(true)
    }

    const updateTask=()=>{
        if(!task.trim())
            {
                toast.error("error");
            }

            setTasks(tasks.map((values)=>(values.id===editIndex?{...values,task:task}:values)));
            setTask('');
            setIsEdit(false)
            seteditIndex(null);
            toast.success("task updated")

    }

  return (
    <div className=' container mt-4'>
        <h1 className='mb-3 text-center'>Todo List</h1>
        <div className='d-flex'>
       <input
       type='text'
       value={task}
        className='form-control me-2'
       placeholder='enter your task'
       onChange={(e)=>setTask(e.target.value)}
       /><br></br>
       {
        isEdit?
        <button onClick={updateTask} className='btn btn-warning'>update</button>:
      
        <button onClick={addTask} className='btn btn-success'>Add</button>
       }
       </div>
       <ul className='list-group mt-3'>
        {
          tasks.map((values)=>(
             <li key={values.id}
             className='list-group-item d-flex justify-content-between align-items-end'
>{values.task}
            <button onClick={()=>editTask(values.id)} className='btn btn-primary btn-sm me-2'>Edit</button><br>
            </br>
            <button onClick={()=>deleteTask(values.id)}className='btn btn-danger btn-sm '>delete</button>
            </li>
          ))
        }
       </ul>
      
    </div>
  )
}

export default Todo