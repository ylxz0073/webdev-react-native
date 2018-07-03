import React from 'react'
import {ScrollView, View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, }
    from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'
import QuestionTypePicker from "./QuestionTypePicker";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import EssayQuestionEditor from './EssayQuestionEditor'
import TrueOrFalseQuestionEditor from './TrueOrFalseQuestionEditor'
import FillInTheBlankQuestionEditor from "./FillInTheBlankQuestionEditor";

class QuestionEditor extends React.Component {
    static navigationOptions = { title: "Edit Question"}
    constructor(props) {
        super(props)
        this.state={
            questionType: 'MC',
            examId: ''
        }
        this.pickQuestionType = this.pickQuestionType.bind(this)
    }

    componenetDidMount() {
        console.log(this.props.navigation.getParam('questionType'))
        this.setState({ examId: this.props.navigation.getParam('examId'),
                        questionType: this.props.navigation.getParam('questionType')})
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
                <Text>{this.props.navigation.getParam('questionId')}
                    {this.props.navigation.getParam('questionType')}
                </Text>
                {/*<QuestionTypePicker*/}
                    {/*pickQuestionType={this.pickQuestionType}/>*/}
                {this.props.navigation.getParam('questionType') == 'MC' &&
                    <MultipleChoiceQuestionEditor
                        navigate={this.props.navigation}
                        questionId={this.props.navigation.getParam('questionId')}
                        examId={this.props.navigation.getParam('examId')}/>}
                {this.props.navigation.getParam('questionType') == 'ES' &&
                <EssayQuestionEditor
                    navigate={this.props.navigation}
                    questionId={this.props.navigation.getParam('questionId')}
                    examId={this.props.navigation.getParam('examId')}/>}
                {this.props.navigation.getParam('questionType') == 'TF' &&
                <TrueOrFalseQuestionEditor
                    navigate={this.props.navigation}
                    questionId={this.props.navigation.getParam('questionId')}
                    examId={this.props.navigation.getParam('examId')}/>}
                {this.props.navigation.getParam('questionType') == 'FB' &&
                <FillInTheBlankQuestionEditor
                    navigate={this.props.navigation}
                    questionId={this.props.navigation.getParam('questionId')}
                    examId={this.props.navigation.getParam('examId')}/>}
            </ScrollView>
        )
    }
}

export default QuestionEditor