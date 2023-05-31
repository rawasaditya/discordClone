import { AiOutlineSend } from "react-icons/ai";

const MessageInput = () => {
  return (
    <div className="flex-1 w-full form-control">
      <div className="flex input-group">
        <input
          type="text"
          placeholder="Search…"
          className="flex-1 input input-bordered"
        />
        <button className="btn btn-square">
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
