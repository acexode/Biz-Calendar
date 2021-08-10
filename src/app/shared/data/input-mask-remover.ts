export const removeMask = (value: any) => {
  let newValue = '';
  if (value) {
    const valueArr = value.toString().split('');
    valueArr.forEach((char) => {
      if (char !== '.') {
        newValue += char;
      }
    });
  }
  return newValue;
};
