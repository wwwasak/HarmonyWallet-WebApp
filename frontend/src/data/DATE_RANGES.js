const currentDate = new Date();

export const DATE_RANGES = {
  weekly: formatDate(new Date(currentDate.getTime() - 7.776e8)), // 1 week
  monthly: formatDate(new Date(currentDate.getTime() - 2.628e9)), // 1 month
  yearly: formatDate(new Date(currentDate.getTime() - 3.154e10)), // 1 year
  twoYears: formatDate(new Date(currentDate.getTime() - 6.307e10)), // 2 years
};

function formatDate(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${date.getFullYear()}-${month}-${day}`;
}
