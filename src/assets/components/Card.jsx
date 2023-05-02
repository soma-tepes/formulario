import React from 'react'

const Card =({data : user , edit : editar, setUpdate , borrar})=>{

const handleEdit=()=>{
    setUpdate(user)
    editar(user)
}

const handleDelete =()=>{
    borrar(user.id)
}

return (

<>
 <section>
    <ul>
        <li>{user.email}</li>
        <li>{user.password}</li>
        <li>{user.first_name}</li>
        <li>{user.last_name}</li>
        <li>{user.birthday}</li>
       
    </ul>
    <img className='ima_form' src={user.image_url} alt="" />
    
    <button onClick={handleEdit}>Edit</button>
    <button onClick={handleDelete}>End</button>
 </section>
</>

)

}

export default Card