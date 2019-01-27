import { axiosPromiseWrapper } from '..'

export const getTableInfo = (pageNo, pageSize) => axiosPromiseWrapper('get', `service?pageNo=${pageNo}&pageSize=${pageSize}`)

export const getRoleTable = (pageNo, pageSize) => axiosPromiseWrapper('get', `role?pageNo=${pageNo}&pageSize=${pageSize}`)
