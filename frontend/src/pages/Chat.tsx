import { Box, Button, Flex, FormControl, Heading, Input, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useChannelContext } from "../hooks/useChannelContext"

export const Chat = () => {
  const [message, setMessage] = useState('')
  const { currentChannel, joinChannel, createMessage, userName } = useChannelContext()
  const { channelId } = useParams<{ channelId: string} >()
  const navigate = useNavigate()

  const scrollDivRef = useRef<HTMLDivElement>(null)
  const messageDivRef = useRef<HTMLDivElement>(null)

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
      navigate('/');
      return;
    }

    joinChannel(channelId)
  }, [])


  return (
    <Flex direction="column" py="12">
      <Flex align="center" justify="space-between">
        <Heading as="h1"># {currentChannel?.name}</Heading>
        <Link to="/channels">Voltar</Link>
      </Flex>
      
      <Flex 
        direction="column"
        my="8"
        w="100%"
        maxH="300px"
        overflowY="auto"
        ref={scrollDivRef}
      >
        {currentChannel?.messages.map((message, index) => (
          <Flex key={index}>
            <Text as="strong" fontSize="lg">{message.userName}:</Text> <Text ml="1">{message.message}</Text>
          </Flex>
        ))}
      </Flex>

      <Flex 
        as="form" 
        w="100%"
        action="" 
        onSubmit={event => {
          event.preventDefault()
          createMessage(message)
          setMessage('')
      }}>
        <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Escreva sua mensagem"/>
        <Button type="submit">Enviar</Button>
      </Flex>

    </Flex>
  )
}