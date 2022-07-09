import { Button, Flex, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useChannelContext } from "../hooks/useChannelContext"

export const ChannelCreate = () => {
  const [channelName, setChannelName] = useState('')
  const { createChannel, userName} = useChannelContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userName) {
      navigate('/');
      return;
    }
  }, [])
  return (
    <Flex direction="column" py="12">
      <Heading as="h1">Crie o seu canal</Heading>
      <Flex 
        as="form" 
        flexDirection="column"
        my="8"
        w="100%"
        borderRadius={8}
        action="" 
        onSubmit={(e) => {
          e.preventDefault()
          createChannel(channelName)
          setChannelName('')
      }}>
        <FormLabel>Nome do canal</FormLabel>
        <Input type="text" value={channelName} onChange={(e) => setChannelName(e.target.value)} />
        
        <Button mt="4" type="submit">Criar canal</Button>
      </Flex>
    </Flex>
  )
}