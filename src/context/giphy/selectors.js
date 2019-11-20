export const getGifById = (state, id) => {
  const {
    feed: {
      apiData: apiDataFeed,
    },
    single: {
      apiData: apiDataSingle,
    },
  } = state;

  // API data is empty
  if (!apiDataSingle && !apiDataFeed) {
    return null;
  }

  if (apiDataSingle && apiDataSingle.data.id === id) {
    return apiDataSingle.data;
  }

  return apiDataFeed && apiDataFeed.data.find(gif => gif.id === id);
};
