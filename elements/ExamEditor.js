import React from 'react'
import {ScrollView, View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, }
    from 'react-native-elements'
import ExamService from '../services/ExamService'
import QuestionList from '../components/QuestionList'

class ExamEditor extends React.Component {
    static navigationOptions = { title: "Exam"}
    constructor(props) {
        super(props)
        this.state = {

            topicId: '',
            isEditing: false,
            examTitle: '',
            description: '',
            points: ''
        }
        this.examService = ExamService.instance
    }
    updateForm(newState) {
        this.setState(newState)
    }

    componentDidMount() {

        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId')
        const isEditing = navigation.getParam('isEditing')
        const refreshExamList = navigation.getParam('refreshExamList')
        this.setState({isEditing: isEditing,
            topicId: topicId,
            refreshExamList: refreshExamList})
        this.examService.findExamForId(this.props.navigation.getParam('examId'))
            .then(widgets => {

                this.setState({examTitle: widgets.examTitle,
                    description: widgets.description,
                    points: widgets.points})
                // console.log("***" + widgets[0])
                // console.log(JSON.stringify(widgets))
            })

    }

    updateExam() {
        const {navigation} = this.props;
        const refreshExamList = navigation.getParam('refreshExamList')
        console.log(this.props.navigation.getParam('examId'))
        this.examService.updateExam(
            this.props.navigation.getParam('examId'),
            {examTitle: this.state.examTitle,
                description: this.state.description,
                points: this.state.points})
            .then(() => {refreshExamList()})
            .then(this.props.navigation.goBack())

    }

    createExam() {
        const {navigation} = this.props;
        const refreshExamList = navigation.getParam('refreshExamList')
        this.examService.createExam(
            this.props.navigation.getParam('topicId'),
            {examTitle: this.state.examTitle,
            description: this.state.description,
                points: this.state.points})
            .then(() => {refreshExamList()})
            .then(this.props.navigation.goBack())

    }

    render() {
        // console.log(this.state.assignmentTitle)
        // console.log(this.state.paragraph)

        return(
            <ScrollView>
                <Text>{this.props.navigation.getParam('topicId')}</Text>
                <Text>{this.props.navigation.getParam('widgetId')}</Text>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({examTitle: text})
                }
                           value={this.state.examTitle}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }
                           value={this.state.description}/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>
                <FormLabel>Points</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({points: text})
                }
                           value={this.state.points}/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                {/*<CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}*/}
                {/*checked={this.state.isTrue} title='The answer is true'/>*/}

                {this.state.isEditing &&
                <Button	backgroundColor="green"
                           color="white"
                           onPress={() => {this.updateExam()
                           }}
                           title="Save"/>}
                {!this.state.isEditing &&
                <Button	backgroundColor="green"
                           color="white"
                           onPress={() => {this.createExam()
                           }}
                           title="Create"/>}

                <View style={{padding: 15}}>
                    <Text h3>Preview</Text>
                    <Text h2>{this.state.examTitle}</Text>
                    <Text style={{textAlign: 'right'}}>{this.state.points + 'pts'}</Text>
                    <Text>{this.state.description}</Text>


                    {this.props.navigation.getParam('examId') &&
                        <QuestionList
                            navigate={this.props.navigation}
                            examId={this.props.navigation.getParam('examId')}/>}
                </View>

            </ScrollView>
        )
    }
}

export default ExamEditor