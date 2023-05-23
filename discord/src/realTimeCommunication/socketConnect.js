import io from "socket.io-client";
import packageJson from "../../package.json";
let socket = null;
export const connectWithSocketServer = () => {
  socket = io(packageJson.proxy);
  socket.on("connect", () => {
    console.log("successfully connected with socket server");
  });
};
