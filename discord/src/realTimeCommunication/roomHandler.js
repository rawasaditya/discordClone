import store from "../store/store";
import { setOpenRoom, setRoomDetails } from "../store/actions/roomActions";
import * as socketConnection from "./socketConnect";
export const createNewRoom = (id) => {
  store.dispatch(setOpenRoom(true, true));
  socketConnection.createNewRoom(id);
};

export const newRoomCreated = (data) => {
  store.dispatch(setRoomDetails(data));
};
