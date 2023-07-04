import { SocketContext } from "@/controller/Contex";
import React, { useContext, useEffect, useState } from "react";

const Name = () => {
  const socket: any = useContext(SocketContext);
  const [name, setName] = useState("");
  const handleSend = () => {
    socket.emit("set-name", name);
  };

  const [showInstructions, setShowInstructions] = useState(true);

  function pointerlockchange() {
    setShowInstructions(!showInstructions);
  }

  useEffect(() => {
    document.addEventListener("pointerlockchange", pointerlockchange, false);
    return () => {
      document.removeEventListener(
        "pointerlockchange",
        pointerlockchange,
        false
      );
    };
  });
  return (
    <>
      <div
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
          pointerEvents: showInstructions ? "all" : "none",
          visibility: showInstructions ? "visible" : "hidden",
        }}
        className="name"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: -1,
          }}
        ></div>
        <div
          style={{
            width: 200,
            height: 200,
            backgroundColor: "white",
            padding: 20,
            borderRadius: 5,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div>Adınız Giriniz</div>
          <div
            style={{
              border: "1px solid black",
              borderRadius: 5,
            }}
          >
            <input
              type="text"
              style={{
                width: "100%",
                padding: 10,
                outline: "none",
                border: "none",
                backgroundColor: "transparent",
              }}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <button
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "green",
                borderRadius: 5,
                cursor: "pointer",
                color: "white",
              }}
              onClick={handleSend}
              id="button"
            >
              Gönder
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Name;
