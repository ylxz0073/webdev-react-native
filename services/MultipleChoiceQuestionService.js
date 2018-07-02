const MC_API_URL =
    'http://localhost:8080/api/exam/EID/multipleChoiceQuestion';
const ALL_MC_API_URL =
    'http://localhost:8080/api/multipleChoiceQuestion'

let _singleton = Symbol();
export default class MultipleChoiceQuestionService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new MultipleChoiceQuestionService(_singleton);
        return this[_singleton]
    }

    createMultipleChoiceQuestion(examId, question) {
        var questions = [question]
        return fetch(MC_API_URL.replace('EID', examId),
            {   body: JSON.stringify(questions),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response; })
    }

    updateMultipleChoiceQuestion(QId, question) {
        // console.log(assignmentId)
        // console.log(assignment)
        return fetch(ALL_MC_API_URL + '/' + QId,
            {   body: JSON.stringify(question),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            }).then(function (response)
        {
            return response.json(); })
    }

    findMultipleChoiceQuestionForId(QId) {
        return fetch(
            ALL_MC_API_URL + '/' + QId
        )
            .then(function (response) {
                return response.json();
            })
    }

    findAllMultipleChoiceQuestionsForExam(EID) {
        return fetch(
            MC_API_URL
                .replace('EID', EID))
            .then(function (response) {
                return response.json();
            })
    }

    findALlMultipleChoiceQuestions() {
        return fetch(ALL_MC_API_URL).then(function(response){
            return response.json();
        })
    }

    deleteMultipleChoiceQuestion(QId) {
        return fetch(
            ALL_MC_API_URL + '/' + QID, {
                method: 'delete'
            })
    }


}