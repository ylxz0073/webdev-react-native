const EXAM_API_URL =
    'https://jtao-webdev-hw-2018.herokuapp.com/api/topic/TID/exam';
const ALL_EXAM_API_URL =
    'https://jtao-webdev-hw-2018.herokuapp.com/api/exam'

let _singleton = Symbol();
export default class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }

    createExam(topicId, exam) {
        var exams = [exam]
        return fetch(EXAM_API_URL.replace('TID', topicId),
            {   body: JSON.stringify(exams),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response; })
    }

    updateExam(examId, exam) {
        // console.log(assignmentId)
        // console.log(assignment)
        return fetch(ALL_EXAM_API_URL + '/' + examId,
            {   body: JSON.stringify(exam),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            }).then(function (response)
        {
            return response.json(); })
    }

    findExamForId(examId) {
        return fetch(
            ALL_EXAM_API_URL + '/' + examId
        )
            .then(function (response) {
                return response.json();
            })
    }

    findAllExamsForTopic(topicId) {
        return fetch(
            EXAM_API_URL
                .replace('TID', topicId))
            .then(function (response) {
                return response.json();
            })
    }

    findALlExams() {
        return fetch(ALL_EXAM_API_URL).then(function(response){
            return response.json();
        })
    }

    deleteExam(examId) {
        return fetch(
            ALL_EXAM_API_URL + '/' + examId, {
                method: 'delete'
            })
    }


}