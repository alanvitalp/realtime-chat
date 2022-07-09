import { ListItem, UnorderedList } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useChannelContext } from "../hooks/useChannelContext"

export const ChannelList = () => {
  const { channels } = useChannelContext()

  return (
    <UnorderedList>
      {channels.map(channel => (
        <ListItem key={channel.id}>
          <Link to={`/chat/${channel.id}`}>{channel.name}</Link>
        </ListItem>
      ))}
    </UnorderedList>
  )
}