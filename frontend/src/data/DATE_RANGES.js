const currentDate = new Date();

export const DATE_RANGES = {
  weekly: formatDate(new Date(currentDate.getTime() - 6.048e8)), // 1 week
  fortnightly: formatDate(new Date(currentDate.getTime() - 1.2096e9)), //2 weeks
  monthly: formatDate(new Date(currentDate.getTime() - 2.628e9)), // 1 month
  yearly: formatDate(new Date(currentDate.getTime() - 3.154e10)), // 1 year
};

function formatDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${date.getFullYear()}-${month}-${day}`;
}
