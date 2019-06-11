export default {
    homepage: '/',
    login: 'user/login',
    addQuestion: '/topic/{}/question',
    getSubjects: '/subject',
    getProfessorQuestions: '/professor/{}/questions',
    getStudentQuestions: '/student/{}/questions',
    getQuestion: '/topic/question/{}',
    updateQuestions: '/topic/{}/question/[]',
    validateQuestions: '/topic/{}/question/[]',
    getNotificationsCount: '/topic/notificationsCount/{}', // number of question that are in a non-terminal status
    getNotifications: '/user/notifications' 
}
