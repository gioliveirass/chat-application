import "./App.css";
import { useState } from "react";

import Chat from "./components/Chat";
import Join from "./components/Join";

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);

  return (
    <div className="App">
      {chatVisibility ? (
        <Chat socket={socket} />
      ) : (
        <Join setChatVisibility={setChatVisibility} setSocket={setSocket} />
      )}
    </div>
  );
}

export default App;
