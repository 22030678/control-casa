import { useEffect, useState } from "react";
import client from "../mqtt/mqttClient";

export default function SensorStatus({ name, topic }) {
  const [status, setStatus] = useState("0"); // 0 = abierto, 1 = cerrado

  useEffect(() => {
    client.subscribe(topic);

    const handler = (t, msg) => {
      if (t === topic) {
        setStatus(msg.toString());
      }
    };

    client.on("message", handler);

    return () => {
      client.unsubscribe(topic);
      client.off("message", handler);
    };
  }, [topic]);

  const toggle = () => {
    const newState = status === "1" ? "0" : "1";

    // 🔥 Actualiza el estado inmediatamente
    setStatus(newState);

    // 🔥 Publica al MQTT
    client.publish(topic, newState);
  };

  return (
    <div className="device-card">
      <div className="device-caption">{name}</div>

      <div className="device-subtitle">
        {status === "1" ? "Cerrado" : "Abierto"}
      </div>

      <button className="device-toggle" onClick={toggle}>
        {status === "1" ? "Abrir" : "Cerrar"}
      </button>
    </div>
  );
}
