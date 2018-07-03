import React from 'react'
import {ScrollView, View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, }
    from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'
import QuestionTypePicker from "./QuestionTypePicker";
import CreateMultipleChoiceQuestionEditor from "./CreateMultipleChoiceQuestionEditor";
import CreateEssayQuestionEditor from './CreateEssayQuestionEditor'
import CreateTrueOrFalseQuestionEditor from './CreateTrueOrFalseQuestionEditor'

class CreateQuestionEditor extends React.Component {
    static navigationOptions = { title: "Create Question"}
    constructor(props) {
        super(props)
        this.state={
            questionType: 'MC',
            examId: ''
        }
        this.pickQuestionType = this.pickQuestionType.bind(this)
    }

    componenetDidMount() {
        this.setState({ examId: this.props.navigation.getParam('examId')})
    }

    pickQuestionType(type) {
        this.setState({questionType: type})
    }

    render() {
        // console.log(this.state.assignmentTitle)
        // console.log(this.state.paragraph)
        // console.log(this.state.isEditing)
        return(
            <ScrollView>
                <QuestionTypePicker
                    pickQuestionType={this.pickQuestionType}/>
                {this.state.questionType == 'MC' &&
                <CreateMultipleChoiceQuestionEditor
                    navigate={this.props.navigation}
                    examId={this.props.navigation.getParam('examId')}/>}
                {this.state.questionType == 'ES' &&
                <CreateEssayQuestionEditor
                    navigate={this.props.navigation}
                    examId={this.props.navigation.getParam('examId')}/>}
                {this.state.questionType == 'TF' &&
                <CreateTrueOrFalseQuestionEditor
                    navigate={this.props.navigation}
                    examId={this.props.navigation.getParam('examId')}/>}
            </ScrollView>
        )
    }
}

export default CreateQuestionEditor