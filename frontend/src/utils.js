export const getPage = (paging) => {
  if (paging && paging.next) {
    const str = paging?.next?.split('&');
    const page = str.filter((item) => item.includes('page'));
    if (page?.length > 0) {
      return parseInt(page[0].split('=')[1]);
    }
  }

  if (paging && paging.previous) {
    const str = paging?.previous?.split('&');
    const page = str.filter((item) => item.includes('page'));
    if (page?.length > 0) return parseInt(page[0].split('=')[1]);
  }

  return 1;
};
