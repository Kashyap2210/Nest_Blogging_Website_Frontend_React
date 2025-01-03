import { useState } from "react"

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" })
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        console.log("this is the event",e.target)
        const { name, value } = e.target
        console.log("this is the name ", name)
        console.log("this is the value ", value)
        setFormData((previousData) => ({
            ...previousData,
            [name]:value
        }))
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault(); // Prevents page reload

        console.log("this is the event", e)
        console.log("request for login recieved")
    console.log("Form Data Submitted: ", formData);

    }

  return (
    <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleChange}></input>
          <br />
          <br />
          <input type="text" name="password" placeholder="password" value={formData.password} onChange={ handleChange}></input>
          <button type="submit" >Login</button>
    </form>
  )
};

