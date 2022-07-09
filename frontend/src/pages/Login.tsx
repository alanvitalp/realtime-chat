import { Button, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useChannelContext } from "../hooks/useChannelContext"

export const Login = () => {
  const [userName, setUserName] = useState('')
  const { login } = useChannelContext()
  const navigate = useNavigate();
  
  return (
    <Flex direction="column" py="12">
      <Heading as="h1">Login</Heading>

      <Flex 
        my="8"
        align="center"
        as="form" 
        action="" 
        onSubmit={(e) => 
          {
            e.preventDefault(); 
            login(userName)
            navigate('/channels')
      }}>
        <FormLabel fontSize="xl">Usuário</FormLabel>
        <Input type="text" fontSize="18px" placeholder="Seu usuário" value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <Button type="submit">Entrar</Button>
      </Flex>
    </Flex>
  )  
}