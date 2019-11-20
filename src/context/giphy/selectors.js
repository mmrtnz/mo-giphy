export const getGifById = (state, id) => {
  const { apiData } = state;
  if (!apiData) return null;
  return apiData.data.find(gif => gif.id === id);
};
