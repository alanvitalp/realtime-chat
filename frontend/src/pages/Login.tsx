import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useChannelContext } from "../hooks/useChannelContext"

export const Login = () => {
  const [userName, setUserName] = useState('')
  const { login } = useChannelContext()
  const navigate = useNavigate();
  return (
    <div>
      <h1>Login</h1>

      <form action="" onSubmit={(e) => 
        {
          e.preventDefault(); 
          login(userName)
          navigate('/channels')
      }}>
        <label>Usuário</label>
        <input type="text" placeholder="Seu usuário" value={userName} onChange={(e) => setUserName(e.target.value)}/>

        <button type="submit">Entrar</button>
      </form>
    </div>
  )  
}