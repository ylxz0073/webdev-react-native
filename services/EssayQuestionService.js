const ESSAY_API_URL =
    'https://jtao-webdev-hw-2018.herokuapp.com/api/exam/EID/essay';
const ALL_ESSAY_API_URL =
    'https://jtao-webdev-hw-2018.herokuapp.com/api/essay'

let _singleton = Symbol();
export default class EssayService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new EssayService(_singleton);
        return this[_singleton]
    }

    createEssayQuestion(examId, question) {
        var questions = [question]
        return fetch(ESSAY_API_URL.replace('EID', examId),
            {   body: JSON.stringify(questions),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response; })
    }

    updateEssayQuestion(QId, question) {
        // console.log(assignmentId)
        // console.log(assignment)
        return fetch(ALL_ESSAY_API_URL + '/' + QId,
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            }).then(function (response)
        {
            return response.json(); })
    }

    findEssayQuestionForId(QId) {
        return fetch(
            ALL_ESSAY_API_URL + '/' + QId
        )
            .then(function (response) {
                return response.json();
            })
    }

    findAllEssayQuestionsForExam(EID) {
        return fetch(
            ESSAY_API_URL
                .replace('EID', EID))
            .then(function (response) {
                return response.json();
            })
    }

    findAllEssayQuestions() {
        return fetch(ALL_ESSAY_API_URL).then(function(response){
            return response.json();
        })
    }

    deleteEssayQuestion(QId) {
        return fetch(
            ALL_ESSAY_API_URL + '/' + QId, {
                method: 'delete'
            })
    }


}