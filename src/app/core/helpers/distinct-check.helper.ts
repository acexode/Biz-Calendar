export const distinctCheckObj = (o1, o2) => {
  try {
    return JSON.stringify(o1) === JSON.stringify(o2);
  } catch (e) {
    return false;
  }
};
