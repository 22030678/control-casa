import { useEffect, useState } from "react";
import client from "../mqtt/mqttClient";

export default function DHTStatus() {
  const [temp, setTemp] = useState("0");
  const [hum, setHum] = useState("0");

  useEffect(() => {
    client.on("message", (topic, msg) => {
      if (topic === "domotica/dht/temperatura") setTemp(msg.toString());
      if (topic === "domotica/dht/humedad") setHum(msg.toString());
    });
  }, []);

  return (
    <div className="device-card">
      <div className="device-caption">Clima</div>
      <p>🌡 Temperatura: {temp} °C</p>
      <p>💧 Humedad: {hum} %</p>
    </div>
  );
}
