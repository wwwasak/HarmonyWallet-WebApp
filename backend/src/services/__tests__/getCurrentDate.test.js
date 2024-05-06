import { getCurrentFormattedDate, getOneWeekAgoFormatted } from '../getCurrentDate';

describe('getCurrentFormattedDate', () => {
  it('should return the current date and time in the correct format', () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const expectedDate = `${year}${month}${day}T${hours}${minutes}`;

    const actualDate = getCurrentFormattedDate();

    expect(actualDate).toBe(expectedDate);
  });
});

describe('getOneWeekAgoFormatted', () => {
  it('should return the date and time one week ago in the correct format', () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const year = oneWeekAgo.getFullYear();
    const month = (oneWeekAgo.getMonth() + 1).toString().padStart(2, '0');
    const day = oneWeekAgo.getDate().toString().padStart(2, '0');
    const hours = oneWeekAgo.getHours().toString().padStart(2, '0');
    const minutes = oneWeekAgo.getMinutes().toString().padStart(2, '0');
    const expectedOneWeekAgo = `${year}${month}${day}T${hours}${minutes}`;
    const actualOneWeekAgo = getOneWeekAgoFormatted();
    expect(actualOneWeekAgo).toBe(expectedOneWeekAgo);
  });
});
