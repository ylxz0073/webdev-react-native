const QUESTION_API_URL =
    'http://localhost:8080/api/exam/EID/question';
const ALL_QUESTION_API_URL =
    'http://localhost:8080/api/question'

let _singleton = Symbol();
export default class QuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new QuestionService(_singleton);
        return this[_singleton]
    }

    createQuestion(examId, question) {
        var questions = [question]
        return fetch(QUESTION_API_URL.replace('EID', examId),
            {   body: JSON.stringify(questions),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response; })
    }

    updateQuestion(QId, question) {
        // console.log(assignmentId)
        // console.log(assignment)
        return fetch(ALL_QUESTION_API_URL + '/' + QId,
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            }).then(function (response)
        {
            return response.json(); })
    }

    findQuestionForId(QId) {
        return fetch(
            ALL_QUESTION_API_URL + '/' + QId
        )
            .then(function (response) {
                return response.json();
            })
    }

    findAllQuestionsForExam(EID) {
        return fetch(
            QUESTION_API_URL
                .replace('EID', EID))
            .then(function (response) {
                return response.json();
            })
    }

    findAllQuestions() {
        return fetch(ALL_QUESTION_API_URL).then(function(response){
            return response.json();
        })
    }

    deleteQuestion(QId) {
        return fetch(
            ALL_QUESTION_API_URL + '/' + QId, {
                method: 'delete'
            })
    }


}