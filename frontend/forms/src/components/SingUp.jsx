import { useNavigate } from "react-router-dom"
import { useState } from "react"
const SingUp = () =>{
  const [formData, setformData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    check: false,
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value,type, checked} = e.target
    setformData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()

  // Basic validation
  if (!formData.name || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
    alert('Please fill in all fields!');
    return;
  }
  
  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

    if (!formData.check) {
      alert('Please agree to the terms!');
      return;
    }
    try{
        const response = await fetch('http://localhost:5000/api/singup',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          if(response.ok){
            navigate('/login')
          }else{
            alert('Error ao cadastrar')
          }
      }catch(error){
        console.log(error)
        alert('Server error')
      }
    // Log form data (for now, until MongoDB is integrated)
    console.log('Form Data:', formData);

 /*    // Navigate to Login after successful sign-up
    navigate('/login'); */
  }
  
  return (
    <div className="Container">
      <form onSubmit={handleSubmit}>
        <h1>Sing-Up</h1>
        <div className="form-group">
          <div>
            <label htmlFor="name">
              <input type="text" name="name" id="name" placeholder="Nome" value={formData.name} onChange={handleChange}/>
            </label>
          </div>

          <div>
          <label htmlFor="lastName">
            <input type="text" name="lastName" id="lastName" placeholder="Sobrenome" value={formData.lastName} onChange={handleChange}/>
          </label>
          </div>

          <div>
          <label htmlFor="email">
            <input type="text"  name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
          </label>
          </div>
          <div>
            <label htmlFor="password">
              <input type="password" name="password" id="password" placeholder="Senha" value={formData.password} onChange={handleChange}/>
            </label>
          </div>

          <div>
            <label htmlFor="confirmPassword">
              <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirmar Senha" value={formData.confirmPassword} onChange={handleChange} />
            </label>
          </div>
          
          <div>
            <p>
              <input type="checkbox" name="check" id="check"  required  value={formData.check} onChange={handleChange}/>
               Está de acordo com os termos?            
            </p>
          </div> 
           
           <div>
            <input type="submit" value="Sing-Up" />
           </div>

          <div>
          <p> Já tem conta ? <a href="/Login">Sign-in</a></p>
          </div>

        </div>
      </form>
    </div>
  
  )

}

export default SingUp