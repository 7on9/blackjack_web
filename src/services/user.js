import { dataProvider } from './dataProvider'

export const UserService = {
  getAllUsers: limit => {
    return dataProvider('/user/', { method: 'GET', params: { limit } })
  },
  getMeetingUsers: idMeeting => {
    return dataProvider(`/user/${idMeeting}`, { method: 'GET' })
  },
  getUser: idUser => {
    return dataProvider(`/user/${idUser}`, { method: 'GET' })
  },
  deleteUser: idUser => {
    return dataProvider('/user/delete', { method: 'POST', data: { idUser } })
  },
}
