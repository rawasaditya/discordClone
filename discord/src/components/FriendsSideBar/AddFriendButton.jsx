const AddFriendButton = () => {
  const inviteForm = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <label
        htmlFor="dc_addFriends_modal"
        className="w-40 text-white rounded-sm btn btn-success btn-sm"
      >
        Add friend
      </label>

      <input
        type="checkbox"
        id="dc_addFriends_modal"
        className="modal-toggle"
      />
      <label
        htmlFor="dc_addFriends_modal"
        className="cursor-pointer modal modal-bottom sm:modal-middle"
      >
        <label className="relative bg-white modal-box" htmlFor="">
          <h3 className="text-lg font-semibold text-black uppercase">
            Invite a friend
          </h3>
          <form className="py-4" onSubmit={inviteForm}>
            Enter e-mail address of friend which you would like to invite
            <input
              type="email"
              required
              placeholder="EMAIL"
              className="w-full mt-4 bg-white rounded-none input-sm input input-bordered border-slate-400"
            />
            <button
              type="submit"
              className="w-full mt-4 rounded-none btn btn-sm"
            >
              Invite
            </button>
          </form>
        </label>
      </label>
    </>
  );
};

export default AddFriendButton;
