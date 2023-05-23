import io from "socket.io-client";
import packageJson from "../../package.json";
let socket = null;
export const connectWithSocketServer = (userDetails) => {
  socket = io(packageJson.proxy, {
    auth: {
      jwtToken: userDetails.token,
    },
  });
  socket.on("connect", () => {
    console.log("successfully connected with socket server");
  });
};
