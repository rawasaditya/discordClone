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
        isUserRoomCreator: action.isUserRoomCreator,
        isUserInRoom: action.isUserInRoom,
      };
    case roomActions.SET_ROOM_DETAILS:
      // eslint-disable-next-line no-case-declarations
      if (action?.roomDetails?.roomId) {
        const existingRoom = state.roomDetails.findIndex((i) => {
          return i.roomDetails.roomId === action?.roomDetails?.roomId;
        });
        if (existingRoom !== -1) {
          state.roomDetails[existingRoom].participants =
            action.roomDetails.participants;
        }
        return {
          ...state,
        };
      }
      const alreadyHasRoom = state.roomDetails.find((i) => {
        return i.to === action?.roomDetails?.to;
      });
      if (alreadyHasRoom?.to) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        roomDetails: [...state.roomDetails, action.roomDetails],
      };
    default:
      return state;
  }
};

export default reducer;
