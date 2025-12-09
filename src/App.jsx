import LedControl from "./components/LedControl";
import SensorStatus from "./components/SensorStatus";
import DHTStatus from "./components/DHTStatus";
import ServoControl from "./components/ServoControl";
import "./App.css";

export default function App() {
  const updateTime = new Date().toLocaleTimeString();

  return (
    <div className="dashboard-container">

      {/* Encabezado */}
      <header className="dashboard-header">
        <h1>Dashboard Domótico</h1>
        <p className="update-time">Última actualización: {updateTime}</p>
      </header>

      {/* Resumen */}
      <section className="summary-section">
        <div className="summary-grid">
          <div className="summary-card yellow">5 Focos<span>Activos / Inactivos</span></div>
          <div className="summary-card blue">4 Sensores<span>Puertas / Ventanas</span></div>
          <div className="summary-card green">Clima<span>Temperatura / Humedad</span></div>
          <div className="summary-card purple">Persiana<span>Control de ángulo</span></div>
        </div>
      </section>

      {/* Secciones */}
      <div className="section-block">

        {/* FOCOS */}
        <section>
          <h2>Focos</h2>
          <div className="device-grid">
            <LedControl id={1} />
            <LedControl id={2} />
            <LedControl id={3} />
            <LedControl id={4} />
            <LedControl id={5} />
          </div>
        </section>

        {/* PUERTAS Y VENTANAS */}
        <section>
          <h2>Puertas y Ventanas</h2>
          <div className="two-column-row">
            <SensorStatus name="Puerta 1" topic="domotica/sensores/p1" />
            <SensorStatus name="Puerta 2" topic="domotica/sensores/p2" />
            <SensorStatus name="Ventana 1" topic="domotica/sensores/v1" />
            <SensorStatus name="Ventana 2" topic="domotica/sensores/v2" />
          </div>
        </section>

        {/* CLIMA */}
        <section>
          <h2>Clima</h2>
          <DHTStatus />
        </section>

        {/* PERSIANA */}
        <section>
          <h2>Persiana</h2>
          <div className="blind-section">
            <ServoControl />
          </div>
        </section>
      </div>
    </div>
  );
}
