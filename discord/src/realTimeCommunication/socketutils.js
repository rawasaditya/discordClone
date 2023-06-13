import store from "../store/store";
import { setMessages } from "../store/actions/chatActions";
export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;
  // find id of user from token and id from active conversation
  const receiverId = store.getState().chatReducer.chosenChatDetails?.id;
  const userId = store.getState().authReducer.userDetails.id;

  if (receiverId && userId) {
    const usersInCoversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInCoversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInCoversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return usersInCoversation.includes(participantId);
  });
  if (result) {
    store.dispatch(setMessages(messages));
  }
};
