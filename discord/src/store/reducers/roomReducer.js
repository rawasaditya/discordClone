import { roomActions } from "../actions/roomActions";
const initState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: [],
  activeRooms: [],
  localStream: null,
  remoteStream: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case roomActions.OPEN_ROOM:
      return {
        ...state,
        roomDetails: [...state.roomDetails, action.roomDetails],
      };
    default:
      return state;
  }
};

export default reducer;
