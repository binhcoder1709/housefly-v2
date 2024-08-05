export const timeAsJwtExpireFormat = (): number => {
  return Math.floor(Date.now() / 1000);
};
