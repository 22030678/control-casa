import mqtt from "mqtt";

const MQTT_URL = "ws://192.168.100.38:9001"; // PUERTO DE WEBSOCKETS

const options = {
  reconnectPeriod: 1000,
};

const client = mqtt.connect(MQTT_URL, options);

client.on("connect", () => {
  console.log("MQTT conectado");

  client.subscribe("domotica/leds/l1");
  client.subscribe("domotica/leds/l2");
  client.subscribe("domotica/leds/l3");
  client.subscribe("domotica/leds/l4");
  client.subscribe("domotica/leds/l5");

  client.subscribe("domotica/sensores/p1");
  client.subscribe("domotica/sensores/p2");
  client.subscribe("domotica/sensores/v1");
  client.subscribe("domotica/sensores/v2");

  client.subscribe("domotica/dht/temperatura");
  client.subscribe("domotica/dht/humedad");

  client.subscribe("domotica/servo/pos");
});

export default client;
