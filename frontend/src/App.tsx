import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ChannelCreate } from "./pages/ChannelCreate";
import { ChannelList } from "./pages/ChannelList";
import { Chat } from "./pages/Chat";
import { Login } from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

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
      </BrowserRouter>
    </div>
  );
}

export default App;
