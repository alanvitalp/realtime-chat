import { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from 'socket.io-client'

interface IMessage {
  userName: string;
  message: string;
}


interface IChannel {
  name: string;
  id: string;
  messages: IMessage[]
}

interface IChannelContext {
  channels: IChannel[]
  currentChannel: IChannel | undefined;
  userName: string;

  createChannel: (name: string) => void;
  createMessage: (message: string) => void;
  login: (userName: string) => void;
  joinChannel: (channelId: string) => void;
}

export const ChannelContext = createContext<IChannelContext>({} as IChannelContext)

export const ChannelContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [userName, setUserName] = useState('')
  const [channels, setChannels] = useState<IChannel[]>([])
  const [currentChannel, setCurrentChannel] = useState<IChannel>();
  const socket = useRef<Socket>()

  useEffect(() => {
    socket.current = io("http://localhost:3333")

    socket.current.on('channels:get', (data) => {
      setChannels(data);
    })

    socket.current.on('channel:get', (channel) => {
      setCurrentChannel(channel);
    })
  }, [])
  
  const login = (userName: string) => {
    socket.current?.emit('user:login', userName)
    setUserName(userName)
  }

  const createChannel = (channelName: string) => {
    socket.current?.emit("channel:create", channelName)
  }  

  const joinChannel = ( channelId: string ) => {
    socket.current?.emit("channel:join", channelId)
  }

  const createMessage = ( message: string ) => {
    socket.current?.emit("message:create", {
      message,
      channelId: currentChannel?.id,
      userName
    })
  }

  return (
    <ChannelContext.Provider 
      value={{
        login, 
        currentChannel, 
        channels, 
        createChannel, 
        createMessage, 
        joinChannel, 
        userName
      }}>
      {children}
    </ChannelContext.Provider>
  )
}