export const dateDifference = (
  date1: string | number | Date,
  date2: string | number | Date,
  interval: any
) => {
  const second = 1000;
  const minute: number = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  date2 = new Date(date2);
  date1 = new Date(date1);
  const timediff: any = date2.getTime() - date1.getTime();
  if (isNaN(timediff)) {
    return NaN;
  }
  switch (interval) {
    case 'years': return date2.getFullYear() - date1.getFullYear();
    case 'months': return (
      (date2.getFullYear() * 12 + date2.getMonth())
      -
      (date1.getFullYear() * 12 + date1.getMonth())
    );
    case 'weeks':
      return Math.floor(timediff / week);
    case 'days':
      return Math.floor(timediff / day);
    case 'hours':
      return Math.floor(timediff / hour);
    case 'minutes':
      return Math.floor(timediff / minute);
    case 'seconds':
      return Math.floor(timediff / second);
    default:
      return undefined;
  }
};

export const getDateInYearMonthDay = (date: Date) => {
  const dateObj = new Date(date);
  /* const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return `${ year }-${ month }-${ day }`; */
  return dateObj.toISOString().slice(0, 10); // yyyy-mmm-dd
};

export const dayInAWeekWithDate = (current: Date): Array<Date> => {
  const week = new Array();
  // Starting Monday not Sunday // current.getDate() - current.getDay() + 1
  console.log(current.getDate());
  console.log(current.getDay());
  current.setDate((current.getDate() - current.getDay()));
  for (let i = 0; i < 7; i++) {
    week.push(
      new Date(current)
    );
    current.setDate(current.getDate() + 1);
  }
  return week; // dayInAWeekWithDate(new Date('2021-10-18'));
};
