import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = () =>{
  const [formData, setformData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target
    setformData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

      // Basic validation (you can expand this when connecting to MongoDB)
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields!');
      return;
    }
    try{
        const response = await fetch('http://localhost:5000/api/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          if(response.ok){
            navigate('/Dashboard')
          }else{
            alert('Error ao logar')
          }
      }catch(error){
        console.log(error)
        alert('Server error')
      }
   /*    
    // Log form data (for now, until MongoDB is integrated)
    console.log('Login Data:', formData);

    // Navigate to Dashboard after successful login
    navigate('/Dashboard'); */
  }
  return(
    <div className="Container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <div>
            <label htmlFor="">
              <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </label>
          </div>

          <div>
            <label htmlFor="">
              <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </label>
          </div>

          <div> 
            <input type="submit" value="Login" />
          </div>

          <div>
            <p>Não tem conta? <a href="/SingUp">SingUp</a></p>
          </div>

        </div>
      </form>
      
    </div>
  )
}

export default Login;

