const FB_API_URL =
    'http://localhost:8080/api/exam/EID/blanks';
const ALL_FB_API_URL =
    'http://localhost:8080/api/blanks'

let _singleton = Symbol();
export default class FillInTheBlankQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new FillInTheBlankQuestionService(_singleton);
        return this[_singleton]
    }

    createFillInTheBlankQuestion(examId, question) {
        var questions = [question]
        return fetch(FB_API_URL.replace('EID', examId),
            {   body: JSON.stringify(questions),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response; })
    }

    updateFillInTheBlankQuestion(QId, question) {
        // console.log(assignmentId)
        // console.log(assignment)
        return fetch(ALL_FB_API_URL + '/' + QId,
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            }).then(function (response)
        {
            return response.json(); })
    }

    findFillInTheBlankQuestionForId(QId) {
        return fetch(
            ALL_FB_API_URL + '/' + QId
        )
            .then(function (response) {
                return response.json();
            })
    }

    findAllFillInTheBlankQuestionsForExam(EID) {
        return fetch(
            FB_API_URL
                .replace('EID', EID))
            .then(function (response) {
                return response.json();
            })
    }

    findAllFillInTheBlankQuestions() {
        return fetch(ALL_FB_API_URL).then(function(response){
            return response.json();
        })
    }

    deleteFillInTheBlankQuestion(QId) {
        return fetch(
            ALL_FB_API_URL + '/' + QId, {
                method: 'delete'
            })
    }


}