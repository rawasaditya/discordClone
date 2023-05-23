import PendingInvitationItem from "./PendingInvitationItem";
const PendingInvitationList = () => {
  const DUMMY = [
    {
      id: 1,
      senderID: {
        firstName: "Pruthvi",
        lastName: "Shelke",
        email: "pruthvishelke@gmail.com",
      },
    },
  ];
  return (
    <div className="flex flex-col items-center w-full px-2 overflow-auto h-1/5">
      {DUMMY.map((i) => {
        return (
          <PendingInvitationItem
            key={i.id}
            id={i.id}
            firstName={i.senderID.firstName}
            lastName={i.senderID.lastName}
            email={i.senderID.email}
          />
        );
      })}
    </div>
  );
};

export default PendingInvitationList;
