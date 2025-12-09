import { useEffect, useState } from "react";
import client from "../mqtt/mqttClient";


export default function LedControl({ id }) {
  const topic = `domotica/leds/l${id}`;
  const [state, setState] = useState(false);

  useEffect(() => {
    client.subscribe(topic);

    const handler = (t, msg) => {
      if (t === topic) {
        setState(msg.toString() === "1");
      }
    };

    client.on("message", handler);

    return () => {
      client.unsubscribe(topic);
      client.off("message", handler);
    };
  }, [topic]);

  const toggleLed = () => {
    const newState = !state;

    // 🔥 ACTUALIZA EL ESTADO INMEDIATAMENTE (sin esperar MQTT)
    setState(newState);

    // 🔥 ENVÍA EL NUEVO ESTADO POR MQTT
    client.publish(topic, newState ? "1" : "0");
  };

  return (
    <div className="device-card">
      <div className="device-caption">Foco {id}</div>

      <button
        className={`device-toggle ${state ? "active" : ""}`}
        onClick={toggleLed}
      >
        {state ? "Apagar" : "Encender"}
      </button>
    </div>
  );
}
