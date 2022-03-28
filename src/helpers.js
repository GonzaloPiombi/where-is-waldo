const formatTime = (time) => {
  const seconds = `0${Math.round(time % 60)}`.slice(-2);
  const mins = `${Math.floor(time / 60)}`;
  const minutes = `0${Math.floor(mins % 60)}`.slice(-2);
  const hours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

export { formatTime };
