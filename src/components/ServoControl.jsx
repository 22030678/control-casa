import { useEffect, useState } from "react";
import client from "../mqtt/mqttClient";

export default function ServoControl() {
  const topic = "domotica/servo/pos";
  const [angle, setAngle] = useState(0);
  const [remoteUpdate, setRemoteUpdate] = useState(false);

  useEffect(() => {
    client.subscribe(topic);

    const handler = (t, msg) => {
      if (t === topic) {
        const val = Number(msg.toString());
        setRemoteUpdate(true);
        setAngle(val);
      }
    };

    client.on("message", handler);

    return () => {
      client.off("message", handler);
      client.unsubscribe(topic);
    };
  }, []);

  const updateServo = (value) => {
    let v = Number(value);

    // Limitar entre 0 y 180
    if (v < 0) v = 0;
    if (v > 180) v = 180;

    setAngle(v);

    if (!remoteUpdate) {
      client.publish(topic, String(v));
    }

    setRemoteUpdate(false);
  };

  // Botones + y -
  const increase = () => updateServo(angle + 5);
  const decrease = () => updateServo(angle - 5);

  return (
    <div className="servo-card">

      <div className="servo-angle-display">{angle}°</div>

      <div className="servo-control-row">

        <button className="servo-btn minus" onClick={decrease}>–</button>

        <input
          type="range"
          min="0"
          max="180"
          value={angle}
          onChange={(e) => updateServo(e.target.value)}
          className="servo-slider"
        />

        <button className="servo-btn plus" onClick={increase}>+</button>
      </div>

    </div>
  );
}
