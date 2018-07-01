import React from 'react'
import {ScrollView, View, TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage, }
    from 'react-native-elements'
import AssignmentService from '../services/AssignmentService'

class AssignmentEditor extends React.Component {
    static navigationOptions = { title: "Assignment"}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            topicId: '',
            isEditing: false,
            assignmentTitle: '',
            paragraph: '',
            points: ''
        }
        this.assignmentService = AssignmentService.instance
    }
    updateForm(newState) {
        this.setState(newState)
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId')
        const isEditing = navigation.getParam('isEditing')
        const refreshAssignmentList = navigation.getParam('refreshAssignmentList')
        this.setState({isEditing: isEditing,
                        topicId: topicId,
                        refreshAssignmentList: refreshAssignmentList})
        this.assignmentService.findAssignmentForId(this.props.navigation.getParam('widgetId'))
            .then(widgets => {

                this.setState({assignmentTitle: widgets.assignmentTitle,
                                paragraph: widgets.paragraph,
                                points: widgets.points})
                // console.log("***" + widgets[0])
                // console.log(JSON.stringify(widgets))
            })

    }

    updateAssignment() {
        const {navigation} = this.props;
        const refreshAssignmentList = navigation.getParam('refreshAssignmentList')
        this.assignmentService.updateAssignment(
            this.props.navigation.getParam('widgetId'),
            {assignmentTitle: this.state.assignmentTitle,
                paragraph: this.state.paragraph,
                points: this.state.points})
            .then(() => {refreshAssignmentList()})
            .then(this.props.navigation.goBack())

    }

    createAssignment() {
        const {navigation} = this.props;
        const refreshAssignmentList = navigation.getParam('refreshAssignmentList')
        this.assignmentService.createAssignment(
            this.props.navigation.getParam('topicId'),
            {assignmentTitle: this.state.assignmentTitle,
                paragraph: this.state.paragraph,
                points: this.state.points})
            .then(() => {refreshAssignmentList()})
            .then(this.props.navigation.goBack())

    }

    render() {
        // console.log(this.state.assignmentTitle)
        // console.log(this.state.paragraph)
        // console.log(this.state.isEditing)
        return(
            <ScrollView>
                <Text>{this.props.navigation.getParam('topicId')}</Text>
                <Text>{this.props.navigation.getParam('widgetId')}</Text>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({assignmentTitle: text})
                }
                            value={this.state.assignmentTitle}/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({paragraph: text})
                }
                           value={this.state.paragraph}/>
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
                           onPress={() => {this.updateAssignment()
                           }}
                           title="Save"/>}
                {!this.state.isEditing &&
                    <Button	backgroundColor="green"
                           color="white"
                           onPress={() => {this.createAssignment()
                           }}
                           title="Create"/>}

                <View style={{padding: 15}}>
                    <Text h3>Preview</Text>
                    <Text h2>{this.state.assignmentTitle}</Text>
                    <Text style={{textAlign: 'right'}}>{this.state.points + 'pts'}</Text>
                    <Text>{this.state.paragraph}</Text>
                    {/*<TextInput*/}
                        {/*multiline={true}*/}
                        {/*numberOfLines={4}*/}
                        {/*onChangeText={(text) => this.setState({text})}*/}
                        {/*value={this.state.text}/>*/}
                    <Text h4>Essay answer</Text>
                    <TextInput
                        backgroundColor="white"
                        multiline={true}
                        numberOfLines={4}
                        height={80}
                        // onChangeText={(text) => this.setState({text})}
                        // value={this.state.text}
                    />
                    <Text h4>Upload a file</Text>
                    <TextInput
                        backgroundColor="white"
                        multiline={true}
                        numberOfLines={4}
                        height={35}
                    />
                    <Text h4>Submit a link</Text>
                    <TextInput
                        backgroundColor="white"
                        multiline={true}
                        numberOfLines={4}
                        height={35}
                    />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button	backgroundColor="green"
                               color="white"
                               title="Submit"/>
                    <Button	backgroundColor="red"
                               color="white"
                               title="Cancel"/>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

export default AssignmentEditor