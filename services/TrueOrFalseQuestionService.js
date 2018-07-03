const TF_API_URL =
    'http://localhost:8080/api/exam/EID/truefalse';
const ALL_TF_API_URL =
    'http://localhost:8080/api/truefalse'

let _singleton = Symbol();
export default class TrueOrFalseQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TrueOrFalseQuestionService(_singleton);
        return this[_singleton]
    }

    createTrueOrFalseQuestion(examId, question) {
        var questions = [question]
        return fetch(TF_API_URL.replace('EID', examId),
            {   body: JSON.stringify(questions),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response; })
    }

    updateTrueOrFalseQuestion(QId, question) {
        // console.log(assignmentId)
        // console.log(assignment)
        return fetch(ALL_TF_API_URL + '/' + QId,
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            }).then(function (response)
        {
            return response.json(); })
    }

    findTrueOrFalseQuestionForId(QId) {
        return fetch(
            ALL_TF_API_URL + '/' + QId
        )
            .then(function (response) {
                return response.json();
            })
    }

    findAllTrueOrFalseQuestionsForExam(EID) {
        return fetch(
            TF_API_URL
                .replace('EID', EID))
            .then(function (response) {
                return response.json();
            })
    }

    findAllTrueOrFalseQuestions() {
        return fetch(ALL_TF_API_URL).then(function(response){
            return response.json();
        })
    }

    deleteTrueOrFalseQuestion(QId) {
        return fetch(
            ALL_TF_API_URL + '/' + QId, {
                method: 'delete'
            })
    }


}