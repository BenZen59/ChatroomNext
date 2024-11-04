import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";

export default function Chat({ room }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const socket = io("http://localhost:3001");

  // Charger les messages du salon à partir du localStorage lorsque le salon change
  useEffect(() => {
    const storedMessages =
      JSON.parse(localStorage.getItem(`messages_${room}`)) || [];
    setMessages(storedMessages); // Charger les messages stockés pour ce salon

    // Rejoindre le salon spécifiquement
    socket.emit("joinRoom", room);

    // Écouter les nouveaux messages pour le salon actuel
    socket.on("message", (msg) => {
      const updatedMessages = [...storedMessages, msg]; // Ajouter le message au salon courant
      setMessages(updatedMessages);

      // Sauvegarder les messages dans le localStorage pour ce salon
      localStorage.setItem(`messages_${room}`, JSON.stringify(updatedMessages));
    });

    // Nettoyer l'écouteur de messages et quitter la salle lors du changement de salon
    return () => {
      socket.emit("leaveRoom", room); // Quitter le salon à la déconnexion
      socket.off("message"); // Nettoyer l'écouteur
    };
  }, [room]); // Dépendance au salon pour mettre à jour lors d'un changement

  const sendMessage = () => {
    if (message.trim()) {
      // Envoyer le message au serveur avec le nom du salon
      socket.emit("message", { room, message });
      setMessage("");
    }
  };

  const addEmoji = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    setShowPicker(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Salon : {room}</h2>
      <div className="mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-black text-white w-[260px] p-2 rounded-lg"
          >
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
      <button className="" onClick={() => setShowPicker(!showPicker)}>
        😊
      </button>

      {showPicker && <EmojiPicker onEmojiClick={addEmoji} />}
    </div>
  );
}
