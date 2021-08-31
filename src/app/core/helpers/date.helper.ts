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
