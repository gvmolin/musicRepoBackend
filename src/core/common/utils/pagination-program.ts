export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: PaginationQuerySearch[];
  filter?: string;
}

export interface PaginationQuerySearch {
  field: string;
  value: string;
}

const defaultPagination: PaginationQuery = {
  limit: 10,
  page: 0,
  sortBy: 'created:ASC',
  filter: '',
};

function mountObjectItems(str: string) {
  if (str.length > 0) {
    let all = {};
    const arr = str.split(',');
    if (arr.length > 0) {
      arr.forEach((element: string) => {
        const splitted = element.split(':');
        // const dotSplitted = splitted[0].split('.');
        // if (dotSplitted.length >= 2) {
        //   all = {
        //     ...all,
        //     [dotSplitted[0]]: {
        //       [dotSplitted[1]]: splitted[1],
        //     },
        //   };
        // } else {
        all = {
          ...all,
          [splitted[0]]: splitted[1],
        };
        // }
      });
    }
    return all;
  } else {
    return {};
  }
}

export function paginator(query: PaginationQuery) {
  const obj = {
    skip: query.page ? (query.page - 1) * query.limit : defaultPagination.page,
    take: query.limit ? query.limit : defaultPagination.limit,
    order: query.sortBy
      ? mountObjectItems(query.sortBy)
      : mountObjectItems(defaultPagination.sortBy),
    where: query.filter ? mountObjectItems(query.filter) : {},
  };
  console.log(obj);
  return obj;
}
