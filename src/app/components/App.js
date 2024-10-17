"use client";
import React, { useState, useEffect } from "react";
import Salon from "./Salon/page";
import Chat from "./Chat/page";

export default function App({ children }) {
  const [selectedRoom, setSelectedRoom] = useState(null); // Salon sélectionné

  // Gérer la sélection du salon
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div className="flex h-screen">
      {/* Salon sur la gauche */}
      <div className="w-1/3 border-r border-gray-300 p-4">
        <Salon onSelectRoom={handleSelectRoom} />
      </div>

      {/* Chat à droite */}
      <div className="w-2/3 p-4">
        {selectedRoom ? (
          <Chat room={selectedRoom} />
        ) : (
          <p className="text-gray-500">
            Sélectionnez un salon pour commencer à discuter
          </p>
        )}
      </div>
    </div>
  );
}
