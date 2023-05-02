import { useEffect, useRef, useState } from 'react'

import './App.css'
import axios from 'axios'
import Card from './assets/components/Card'
import './assets/components/styles/Form.css'
const URL = `https://users-crud.academlo.tech/users/`

function App() {
  
//States
const [link, setLink] = useState()
const [image, setImage] = useState()
const [update, setUpdate] = useState()
//


const handleSubmit =(e)=>{
  e.preventDefault()
  const alpha = {
  email: e.target.email.value,
  password: e.target.password.value,
  first_name: e.target.first_name.value,
  last_name: e.target.last_name.value,
  birthday: e.target.birthday.value,
  image_url: image,
  }
  if(update){ editame(alpha)}
  else{posteo(alpha)}
  
  e.target.reset()
}


const imageChange = (event)=>{

  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    setImage(event.target.result);
  };
  reader.readAsDataURL(file);
}

const refrito = useRef()
const edit =(data)=>{

  refrito.current.email.value = data.email
  refrito.current.password.value = data.password
  refrito.current.first_name.value = data.first_name
  refrito.current.last_name.value = data.last_name
  refrito.current.birthday.value = data.birthday
  
  

}

//  CRUD PETICION 
const syncro = ()=>{
  axios
  .get(URL)
  .then(({data})=>setLink(data))
  .catch((err)=>console.log(err))
}

const posteo =(data)=>{
  axios
  .post(URL ,data)
  .then(()=>syncro())
  .catch((err)=>console.log(err))
}


const editame = (data)=>{
  axios
  .patch(`${URL}${update.id}/` ,data)
  .then(()=>syncro())
  .catch((err)=>console.log(err))
}

const borrar = (id)=>{
  axios
  .delete(`${URL}${id}/`)
  .then(()=>syncro())
  .catch((err)=>console.log(err))
}
//
useEffect(()=>{
  syncro()
},[])

  return (
    <>
      <div>
      Form
      
      <div className='form'>
      <form ref={refrito} onSubmit={handleSubmit}>
     <div><span>email</span>       <input type="text"  id='email' /></div>   
     <div> <span>password</span>    <input type="password"  id='password' /></div>    
     <div> <span>first_name</span>  <input type="text" id='first_name'  /></div> 
     <div><span>last_name</span>   <input type="text"  id='last_name' /></div> 
     <div> <span>birthday</span>    <input type="date" id='birthday'  /></div> 
      <div><span><input type="file" id="image_url" onChange={imageChange} /></span></div>
   
      <div><button>Enviar</button></div>  
        </form>
      </div>

       <article>
        {link && link.map(data=> 
        <Card
         key={data.id} 
         data={data} 
         edit={edit} 
         image={image} 
         setUpdate={setUpdate}
         borrar={borrar}
         />) }
       </article>
      </div>
   
    </>
  )
}

export default App
