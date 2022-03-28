import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useChannelContext } from "../hooks/useChannelContext"

export const Chat = () => {
  const [message, setMessage] = useState('')
  const { currentChannel, joinChannel, createMessage, userName } = useChannelContext()
  const { channelId } = useParams<{ channelId: string} >()
  const navigate = useNavigate()

  const scrollDivRef = useRef<HTMLDivElement>(null)

  const goToBottom = () => {

    if (scrollDivRef.current) {
      scrollDivRef.current.scrollTop = scrollDivRef.current?.scrollHeight
    } 
  }

  useEffect(() => {
    goToBottom()
  }, [currentChannel?.messages])

  useEffect(() => {
    if (!channelId) {
      navigate('/channels')
      return;
    }

    if (!userName) {
      navigate('/login');
      return;
    }

    joinChannel(channelId)
  }, [])


  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h5># {currentChannel?.name}</h5>
        <Link to="/channels">Voltar</Link>
      </div>
      
      <div 
        ref={scrollDivRef}
        style={{
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {currentChannel?.messages.map((message, index) => (
          <div key={index}>
            <strong>{message.userName}</strong>: {message.message}
          </div>
        ))}
      </div>
      <form action="" onSubmit={event => {
        event.preventDefault()
        createMessage(message)
        setMessage('')
      }}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escreva sua mensagem"/>
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}