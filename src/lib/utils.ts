export const calculateTimeDifferenceBetweenNowAndPostCreated = (
  date: string
) => {
  const currentDate = new Date();
  const postDate = new Date(date);
  const difference = currentDate.getTime() - postDate.getTime();
  const minutes = difference / (1000 * 60);
  const hours = difference / (1000 * 60 * 60);
  const days = difference / (1000 * 60 * 60 * 24);

  if (minutes < 60) {
    return `${Math.floor(minutes)} ${
      Math.floor(minutes) === 1 ? "minute" : "minutes"
    }`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} ${Math.floor(hours) === 1 ? "hour" : "hours"}`;
  } else {
    return `${Math.floor(days)} ${Math.floor(days) === 1 ? "day" : "days"}`;
  }
};
