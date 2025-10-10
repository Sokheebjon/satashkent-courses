export const Trim = (text: string) => {
  if (typeof text !== 'string') return text;
  return text?.replace(/  +/g, ' ')?.trim().replace(/\|/g, ',');
};
