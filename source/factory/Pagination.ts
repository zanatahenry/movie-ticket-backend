const DEFAULT_PAGE_SIZE = 10;
export interface PaginationType<T> {
  data:Array<T>
  pagination:{
    pageNumber:number,
    pageSize:number,
    totalPages:number,
    lastPage:boolean,
    firstPage:boolean
  }
}

interface IPaginate<T> {
  totalDocs: number
  size?: number
  page: number
  data:Array<T>
}

export function paginatedDocs<T> ({ totalDocs, size, data, page }: IPaginate<T>): PaginationType<T> {
  const definedSize = size || DEFAULT_PAGE_SIZE
  const totalPages = Math.round(totalDocs / definedSize)

  const pagination: PaginationType<T> = {
    data,
    pagination: {
      totalPages: totalPages,
      firstPage: page === 1,
      lastPage: page >= totalPages,
      pageSize: definedSize,
      pageNumber: page
    }
  }

  return pagination
}