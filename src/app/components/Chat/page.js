import React, { useState, useEffect } from "react";
import io from "socket.io-client";

export default function Chat({ room }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:3001");

  useEffect(() => {
    socket.emit("joinRoom", room); // Rejoindre la salle sélectionnée

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [room]);

  const sendMessage = () => {
    if (message) {
      socket.emit("message", { room, message });
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Salon : {room}</h2>
      <div className="mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-200 p-2 rounded-lg">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Votre message"
          className="border border-gray-300 rounded-lg p-2 flex-grow"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
