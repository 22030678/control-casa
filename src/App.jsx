import LedControl from "./components/LedControl";
import SensorStatus from "./components/SensorStatus";
import DHTStatus from "./components/DHTStatus";
import ServoControl from "./components/ServoControl";
import "./App.css";

export default function App() {
  const updateTime = new Date().toLocaleTimeString();

  return (
    <div className="dashboard-container">

      {/* ENCABEZADO */}
      <header className="dashboard-header">
        <h1>Dashboard Domótico</h1>
        <p className="update-time">Última actualización: {updateTime}</p>
      </header>

 {/* FOCOS */}
      <div className="big-section-title">Focos</div>
      <section>
        <div className="device-grid leds-grid">
          <LedControl id={1} />
          <LedControl id={2} />
          <LedControl id={3} />
          <LedControl id={4} />
          <LedControl id={5} />
        </div>
      </section>

      {/* SENSORES */}
      <div className="big-section-title">Sensores</div>
      <section>
        <div className="device-grid sensores-grid">
          <SensorStatus name="Puerta 1" topic="domotica/sensores/p1" />
          <SensorStatus name="Puerta 2" topic="domotica/sensores/p2" />
          <SensorStatus name="Ventana 1" topic="domotica/sensores/v1" />
          <SensorStatus name="Ventana 2" topic="domotica/sensores/v2" />
        </div>
      </section>

      {/* CLIMA */}
      <div className="big-section-title">Clima</div>
      <section>
        <div className="single-card-center">
          <DHTStatus />
        </div>
      </section>

      {/* PERSIANA */}
      <div className="big-section-title">Persiana</div>
      <section>
        <div className="single-card-center">
          <ServoControl />
        </div>
      </section>

    </div>
  );
}
