import { dataProvider } from './dataProvider'

export const QuestService = {
  getMyQuests: () => {
    return dataProvider('/quest/my-quests', { method: 'GET' })
  },
  getAllQuests: (limit) => {
    return dataProvider('/quest/', { method: 'GET', params: { limit } })
  },
  getQuestCategory: (skip, _idCategory) => {
    return dataProvider('/quest', {
      method: 'GET',
      params: {
        limit: 4,
        skip: (skip - 1) * 4,
        filter: { category: _idCategory },
      },
    })
  },
  getQuestInfo: (idQuest) => {
    return dataProvider(`/quest/${idQuest}`, { method: 'GET' })
  },
  getQuest: (idQuest) => {
    return dataProvider(`/quest/${idQuest}`, { method: 'GET' })
  },
  likeQuest: (_id) => {
    return dataProvider('/quest/like', { method: 'POST', data: { _id } })
  },
  createQuest: (newQuest) => {
    return dataProvider('/quest', {
      method: 'POST',
      data: { newQuest: newQuest },
    })
  },
  updateQuest: (newQuest) => {
    return dataProvider('/quest/update', {
      method: 'POST',
      data: { newQuest: newQuest },
    })
  },
  addQuestion: (newQuestion) => {
    return dataProvider('/quest/question', {
      method: 'POST',
      data: { newQuestion: newQuestion },
    })
  },
  deleteQuestion: (quest) => {
    return dataProvider('/quest/delete-question', {
      method: 'POST',
      data: { quest: quest },
    })
  },
  startGame: (idQuest) => {
    return dataProvider('/quest/start', { method: 'POST', data: { idQuest } })
  },
  deleteQuest: (idQuest) => {
    return dataProvider(`/quest/delete/${idQuest}`, { method: 'GET' })
  },
}
