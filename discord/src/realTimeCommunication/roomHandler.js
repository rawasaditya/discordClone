import store from "../store/store";
import { setOpenRoom, setRoomDetails } from "../store/actions/roomActions";
import * as socketConnection from "./socketConnect";
export const createNewRoom = (id) => {
  store.dispatch(setOpenRoom(true, true));
  socketConnection.createNewRoom(id);
};

export const joinExistingRoom = (id) => {
  socketConnection.joinExistingRoom(id);
};

export const exitRoom = (id) => {
  socketConnection.exitRoom(id);
};

export const exitParticipants = (data) => {
  const { roomId, participants } = data;
  const roomDetails = store.getState().room.roomDetails;
  const idx = roomDetails.findIndex((i) => {
    return i.roomDetails.roomId === roomId;
  });
  if (data.participants.length) {
    roomDetails[idx].participants = participants;
  } else {
    roomDetails.splice(idx, 1);
  }
  store.dispatch(setRoomDetails(roomDetails));
};

export const newRoomCreated = (data) => {
  store.dispatch(setRoomDetails(data));
};
