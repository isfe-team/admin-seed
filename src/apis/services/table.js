import { axiosPromiseWrapper } from '..'

export const getTableInfo = (pageNo, pageSize) => axiosPromiseWrapper('get', `service?pageNo=${pageNo}&pageSize=${pageSize}`)
