import React, { useEffect, useState } from "react";

export default function Chat({ socket }) {
  const messageRef = React.useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const newMessageList = (current) => [...current, data];
      setMessageList(newMessageList);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  const handleSubmit = () => {
    const message = messageRef.current.value;

    if (!message.trim()) return;

    socket.emit("message", message);

    clearInput();
  };

  const clearInput = () => {
    messageRef.current.value = "";
  };

  return (
    <div>
      <h1>Chat</h1>

      {messageList.map((message, index) => (
        <p key={index}>
          {message.author}: {message.text}
        </p>
      ))}

      <input type="text" ref={messageRef} placeholder="Mensagem" />
      <button onClick={() => handleSubmit()}>Enviar</button>
    </div>
  );
}
