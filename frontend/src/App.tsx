import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChannelCreate } from "./pages/ChannelCreate";
import { ChannelList } from "./pages/ChannelList";
import { Chat } from "./pages/Chat";
import { Login } from "./pages/Login";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/chat/:channelId" element={<Chat />} />

          <Route 
          path="/channels" 
          element={
            <>
              <ChannelCreate />
              <ChannelList /> 
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
