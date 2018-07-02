import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
import QuestionService from '../services/QuestionService'
import Swipeout from 'react-native-swipeout'

class QuestionList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            examId: 1,
            questionId: 1
        }
        this.updateQuestionList=this.updateQuestionList.bind(this)
        this.deleteQuestion=this.deleteQuestion.bind(this)
        this.questionService=QuestionService.instance
    }
    componentDidMount() {
        this.updateQuestionList()
    }

    componentWillReceiveProps(newProp) {
        this.updateQuestionList()
    }

    updateQuestionList() {
        const examId = this.props.examId
        this.questionService.findAllQuestionsForExam(examId)
            .then(questions => {this.setState({questions})
                // console.log(this.state.questions)
            })
    }

    deleteQuestion(QId) {
        this.questionService.deleteQuestion(QId)
            .then(() => {this.updateQuestionList()})

    }


    render() {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteQuestion(this.state.questionId) }
        }]

        return(
            <View>
            <Button	backgroundColor="green"
                       color="white"
                       onPress={() => {this.props.navigate.navigate("CreateQuestionEditor",
                           {isEditing: false,
                               examId: this.props.examId,
                               updateQuestionList: this.updateQuestionList
                               // widgetId: widget.id,
                               // topicId: this.props.topicId,
                               // refreshAssignmentList:this.refreshAssignmentList
                           })
                       }}
                       title="Create Question"/>}
            <View style={{padding: 15}}>

                {this.state.questions.sort((x, y) => {
                    return x.id - y.id;
                }).map(
                    (question, index) => (
                        <Swipeout right={swipeBtns}
                                  key={index}
                                  autoClose={true}
                                  onOpen={()=>{this.setState({questionId: question.id})}}
                                  backgroundColor= 'transparent'>
                            <ListItem
                                // onPress={() => {
                                //     if(question.type === "TrueFalse")
                                //         this.props.navigation
                                //             .navigate("TrueFalseQuestionEditor", {questionId: question.id})
                                //     if(question.type === "MultipleChoice")
                                //         this.props.navigation
                                //             .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
                                // }}
                                onPress={() => {this.props.navigate.navigate("QuestionEditor",
                                    {isEditing: true,
                                        examId: this.props.examId,
                                        questionId: question.id,
                                        questionType: question.type,
                                        updateQuestionList: this.updateQuestionList
                                    })}}
                                key={index}
                                subtitle={question.description}
                                title={question.questionTitle}/>
                        </Swipeout>
                            ))}
            </View>
            </View>
        )
    }
}
export default QuestionList