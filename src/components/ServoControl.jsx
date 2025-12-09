import { useEffect, useState } from "react";
import client from "../mqtt/mqttClient";

export default function ServoControl() {
  const topic = "domotica/servo/pos";
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    client.on("message", (t, msg) => {
      if (t === topic) setAngle(msg.toString());
    });
  }, []);

  const handleChange = (e) => {
    const v = e.target.value;
    setAngle(v);
    client.publish(topic, v);
  };

  return (
    <>
      <div className="device-caption">Persiana</div>

      <div className="blind-control">
        <button onClick={() => handleChange({ target: { value: 0 } })}>Abrir</button>
        <input type="range" min="0" max="180" value={angle} onChange={handleChange} />
        <button onClick={() => handleChange({ target: { value: 180 } })}>Cerrar</button>
      </div>

      <p className="device-subtitle">{angle}°</p>
    </>
  );
}
