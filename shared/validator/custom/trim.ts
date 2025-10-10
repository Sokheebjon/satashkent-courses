export const TrimCustom = (text) => {
  if (typeof text !== 'string') return text;
  return text?.replace(/  +/g, ' ')?.trim().replace(/\|/g, ',');
};
