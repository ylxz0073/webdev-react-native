const ASSIGNMENT_API_URL =
    'http://localhost:8080/api/topic/TID/assignment';
const ALL_ASSIGNMENT_API_URL =
    'http://localhost:8080/api/assignment'

let _singleton = Symbol();
export default class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }

    createAssignment(topicId, assignment) {
        var assignments = [assignment]
        return fetch(ASSIGNMENT_API_URL.replace('TID', topicId),
            {   body: JSON.stringify(assignments),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response; })
    }

    updateAssignment(assignmentId, assignment) {
        console.log(assignmentId)
        console.log(assignment)
        return fetch(ALL_ASSIGNMENT_API_URL + '/' + assignmentId,
            {   body: JSON.stringify(assignment),
                headers: { 'Content-Type': 'application/json' },
                method: 'PUT'
            }).then(function (response)
        {
            return response.json(); })
    }

    findAllAssignmentsForTopic(topicId) {
        return fetch(
            ASSIGNMENT_API_URL
                .replace('TID', topicId))
            .then(function (response) {
                return response.json();
            })
    }

    findALlAssignments() {
        return fetch(ALL_ASSIGNMENT_API_URL).then(function(response){
            return response.json();
        })
    }

    deleteAssignment(assignmentId) {
        return fetch(
            ALL_ASSIGNMENT_API_URL + '/' + assignmentId, {
                method: 'delete'
            })
    }


}