const timeInMilliseconds = (timeString) => {
  return new Date(timeString).getTime();
};

const isUpTo24Hours = (dbTime, currentTime) => {
  const currentTimeInMs = timeInMilliseconds(currentTime);
  const dbTimeInMs = timeInMilliseconds(dbTime);
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const timeOneDayAgo = currentTimeInMs - oneDayInMilliseconds;

  if (timeOneDayAgo < dbTimeInMs) {
    return false;
  } else {
    return true;
  }
};

export { isUpTo24Hours };
