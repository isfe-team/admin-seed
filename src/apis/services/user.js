import menus from '@/menu.json'
export const getUserInfo = (pageNo, pageSize) => Promise.resolve({ name: 'admin' })

export const login = () => Promise.resolve()

export const getMenus = () => Promise.resolve(menus)
