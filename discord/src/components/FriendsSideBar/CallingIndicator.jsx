const CallingIndicator = () => {
  return (
    <span className="relative flex w-3 h-3">
      <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"></span>
      <span className="relative inline-flex w-3 h-3 rounded-full bg-sky-500"></span>
    </span>
  );
};

export default CallingIndicator;
