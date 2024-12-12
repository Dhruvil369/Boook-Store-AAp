import React from 'react'
import { useRef } from 'react'
import { useState,useEffect, } from 'react';
import {v4 as uuidv4} from 'uuid'

export default function Manager() {
  const ref=useRef();
  const passwordref=useRef();
  

  const [form , setForm] = useState({site: "", usernmae:"" , password:""})
  const [ passwordArray , setPasswordArray] = useState([])

  useEffect(()=>{
    let passwords=localStorage.getItem("passwords");
    if(passwords){
      setPasswordArray(JSON.parse(passwords))
    }
  },[])

  const savepassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3)
    {

      setPasswordArray([...passwordArray ,{...form , id : uuidv4()}])
      setForm({site:"",username:"",password:""})
      localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form,id: uuidv4()}]))
      console.log([...passwordArray,{...form,id: uuidv4()}])
    }
    else{
      alert("enter proper details")
    }

  }
  const editpassword = (id) => {
    console.log("Editing password ", id);
    const updatedPasswords = passwordArray.filter(item => item.id !== id);
    const edit = passwordArray.find(item => item.id === id); 
    if (edit) {
      setForm(edit); 
      setPasswordArray(updatedPasswords); 
    } else {
      console.log("Password not found.");
    }
  };
  
  
  
  const deletpassword = (id) => {
    console.log("Deleting password", id);
    const c = confirm("Really?")
    if(c){
      const updatedPasswords = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    }
  };
  

  const handlechange = (e) => {
    setForm({...form, [e.target.name]:e.target.value});
  }

  const showpassword = (params) => {
    
    if(ref.current.src === ("https://tse2.mm.bing.net/th?id=OIP.CBtft0WyXQ3sq5Vrqu7aPQHaHa&pid=Api&P=0&h=180"))
    {
      ref.current.src = "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3232937/eye-closed-icon-md.png"
      passwordref.current.type="text"
    }
    else{
      ref.current.src= "https://tse2.mm.bing.net/th?id=OIP.CBtft0WyXQ3sq5Vrqu7aPQHaHa&pid=Api&P=0&h=180"
      passwordref.current.type="password"
    }
  }

  return (
    <div className="container mx-auto max-w-4xl bg-green-50 ">
    <div className="flex flex-col p-4 m-2 gap-8 items-center">
      <h1 className="text-green-500 font-bold align-center justify-between container mx-auto max-w-4xl text-center text-3xl">MY TODO LIST</h1>
      <p className="text-black text-center">My own todo list </p>
      
      <input value={form.site} onChange={handlechange}  name="site" placeholder='Enter your website URL' className="pl-3 rounded-full border-black gap-8 border w-full " type="text"/>
      <div className="w-full flex justify-between gap-8 ">
      <input value={form.username} onChange={handlechange}  name="username" placeholder="Enter UserName" className="pl-3 rounded-full border-black w-full border  " type="text"/>
      <div className="relative">

      <input ref={passwordref} value={form.password} onChange={handlechange}  name="password" type="password" placeholder='Password' className="pl-3 rounded-full border-black w-full border " />
      <span className="absolute right-0 mt-1 mr-2 " onClick={showpassword}>
        <img  ref ={ref} width="20" src="https://tse2.mm.bing.net/th?id=OIP.CBtft0WyXQ3sq5Vrqu7aPQHaHa&pid=Api&P=0&h=180" alt="" />
      </span> 
      </div>
      </div>

      <button onClick={savepassword} className="bg-green-600  rounded-full border w-fit px-5 py-3  hover:bg-green-500">Submit it</button>
    </div>
    <div>
    <h2 className="font-bold text-3xl text-center pb-4">YOUR PASSWORDS</h2>
    {passwordArray=== 0 && <div> NO PASSWORD </div>}
    {passwordArray !=0 && 
    <table class="table-auto" className="w-full text-center bg-green-100">
  <thead className="bg-green-500 ">
    <tr className="w-12 ">
      <th>Site</th>
      <th>UserName</th>
      <th>Password</th>
      <th>Delet</th>
    </tr>
  </thead>
  <tbody>
  {passwordArray.map((item)=> {
  return(
  <tr >
    <td className="w-32 text-center py-2">{item.site}</td>
    <td className="w-32 text-center py-2">{item.username}</td>
    <td className="w-32 text-center py-2">{item.password}</td>
    <td className="w-32 text-center py-2 flex gap-4 fixed-left-0"> <span> <img onClick={()=>{deletpassword(item.id)}} width="30" src="https://cdn4.vectorstock.com/i/1000x1000/87/53/delete-icon-in-solid-style-for-any-projects-vector-38398753.jpg" alt="" /> </span> <span> <img onClick={()=>{editpassword(item.id)}} width="30" src="https://tse4.mm.bing.net/th?id=OIP.mUfg-Eczh0choVJw9tQ-4AHaHa&pid=Api&P=0&h=180" alt="" /></span></td>
  </tr>

  );
  
})}


    

  </tbody>
</table>}
    </div>
    </div>
  )
}
