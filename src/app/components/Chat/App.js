"use client";
import Chat from "./page";

export default function App({ children }) {
  return (
    <div className="bg-white">
      <main>
        <Chat />
      </main>
    </div>
  );
}
