import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import ExamService from '../services/ExamService'

class QuestionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: 1
        }
        this.updateQuestionList=this.updateQuestionList.bind(this)
        this.examService=ExamService.instance
    }
    componentDidMount() {
        this.updateQuestionList()
    }

    componentWillReceiveProps(newProp) {
        this.updateQuestionList()
    }

    updateQuestionList() {
        const examId = this.props.examId
        fetch("http://localhost:8080/api/exam/"+examId+"/question")
            .then(response => (response.json()))
            .then(questions => {this.setState({questions})
                console.log(this.state.questions)})
    }


    render() {
        return(
            <View>
            <Button	backgroundColor="green"
                       color="white"
                       onPress={() => {this.props.navigate.navigate("QuestionEditor",
                           {isEditing: true,
                               examId: this.props.examId,
                               updateQuestionList: this.updateQuestionList
                               // widgetId: widget.id,
                               // topicId: this.props.topicId,
                               // refreshAssignmentList:this.refreshAssignmentList
                           })
                       }}
                       title="Create Question"/>}
            <View style={{padding: 15}}>
                {this.state.questions.map(
                    (question, index) => (
                        <ListItem
                            // onPress={() => {
                            //     if(question.type === "TrueFalse")
                            //         this.props.navigation
                            //             .navigate("TrueFalseQuestionEditor", {questionId: question.id})
                            //     if(question.type === "MultipleChoice")
                            //         this.props.navigation
                            //             .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                            // }}
                            key={index}
                            subtitle={question.description}
                            title={question.questionTitle}/>))}
            </View>
            </View>
        )
    }
}
export default QuestionList