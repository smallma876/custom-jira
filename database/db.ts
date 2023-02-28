import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
enum READY_STATE {
  Disconnected = 0,
  Connected = 1,
  Connecting = 2,
  Disconnecting = 3,
}

const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log("Ya estabamos conectados");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;

    if (mongooConnection.isConnected === READY_STATE.Connected) {
      console.log("Usando conexión anterior");
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongooConnection.isConnected = READY_STATE.Connected;
  console.log("Conectado a MongoDB:", process.env.MONGO_URL);
};

export const disconnect = async () => {

  if (mongooConnection.isConnected === READY_STATE.Disconnected) return;
  await mongoose.disconnect();
  mongooConnection.isConnected = READY_STATE.Disconnected;
  console.log("Desconectado de MongoDB");
};
