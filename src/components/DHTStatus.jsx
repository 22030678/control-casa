import { useEffect, useState } from "react";
import client from "../mqtt/mqttClient";

export default function DHTStatus() {
  const [temp, setTemp] = useState("0");
  const [hum, setHum] = useState("0");

  useEffect(() => {
    client.subscribe("domotica/dht/temperatura");
    client.subscribe("domotica/dht/humedad");

    const handleMessage = (topic, msg) => {
      if (topic === "domotica/dht/temperatura") {
        setTemp(msg.toString());
      }
      if (topic === "domotica/dht/humedad") {
        setHum(msg.toString());
      }
    };

    client.on("message", handleMessage);

    return () => {
      client.off("message", handleMessage);
      client.unsubscribe("domotica/dht/temperatura");
      client.unsubscribe("domotica/dht/humedad");
    };
  }, []);

  return (
    <div className="device-card climate-card">

      <div className="climate-grid">
        
        {/* TEMPERATURA */}
        <div className="climate-box">
          <div className="climate-value">
            🌡 {temp}°C
          </div>
          <div className="climate-label">Temperatura</div>
        </div>

        {/* HUMEDAD */}
        <div className="climate-box">
          <div className="climate-value">
            💧 {hum}%
          </div>
          <div className="climate-label">Humedad</div>
        </div>

      </div>

    </div>
  );
}
