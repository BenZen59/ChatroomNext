import React, { useState, useEffect } from "react";
import { IoLogoWechat } from "react-icons/io5";

export default function Salon({ onSelectRoom }) {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  // Chargement des salons stockés dans le LocalStorage
  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("chatRooms")) || [];
    setRooms(storedRooms);
  }, []);

  // Fonction pour créer un salon
  const createRoom = () => {
    if (roomName.trim() === "") {
      setError("Le nom du salon ne peut pas être vide.");
      return;
    }
    if (rooms.includes(roomName)) {
      setError("Le salon existe déjà.");
      return;
    }

    const updatedRooms = [...rooms, roomName];
    setRooms(updatedRooms);
    localStorage.setItem("chatRooms", JSON.stringify(updatedRooms)); // Mettre à jour le localStorage
    setRoomName("");
    setError(""); // Réinitialiser le message d'erreur
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex">
        <IoLogoWechat className="mt-1 mr-1" />
        Chat Room
      </h1>
      {/* Liste des salons créés */}
      <div>
        <h2 className="text-xl font-bold mb-2">Salons existants :</h2>
        {rooms.length > 0 ? (
          <ul>
            {rooms.map((room, index) => (
              <li key={index} className="mb-2">
                <div
                  className="bg-gray-200 p-2 rounded-lg w-[260px] cursor-pointer hover:bg-gray-300"
                  onClick={() => onSelectRoom(room)} // Sélection du salon
                >
                  {room}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun salon créé pour le moment.</p>
        )}
      </div>

      {/* Formulaire pour créer un nouveau salon */}
      <div className="mb-4">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Nom du salon"
          className="border border-gray-500 rounded-lg p-2 flex-grow"
        />
        <button
          onClick={createRoom}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 ml-2"
        >
          Créer
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
