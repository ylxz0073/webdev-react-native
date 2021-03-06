import React from 'react'
import {View, TextInput,StyleSheet} from 'react-native'
import {Text, Button,  CheckBox, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import TrueOrFaleQuestionService from '../services/TrueOrFalseQuestionService'

class CreateTrueOrFalseQuestionEditor extends React.Component {
    // static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '0',
            options: '',

            isTrue: false,
            swipeIndex: 0
        }


        this.createQuestion = this.createQuestion.bind(this)
        // this.updateQuestion = this.updateQuestion.bind(this)
        this.trueOrFalseQuestionService=TrueOrFaleQuestionService.instance
    }

    componentDidMount(){
        // console.log(this.props.examId)
        // () => this.updateQuestion()
    }



    updateForm(newState) {
        this.setState(newState)
    }


    createQuestion() {
        const updateQuestionList = this.props.navigate.getParam('updateQuestionList')

        this.trueOrFalseQuestionService
            .createTrueOrFalseQuestion(this.props.examId,
                {questionTitle: this.state.title,
                    description: this.state.description,
                    points: this.state.points,
                    isTrue: this.state.isTrue})
            .then(()=>updateQuestionList())
            .then(this.props.navigate.goBack())
    }

    render() {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => {
                console.log(this.state.swipeIndex)
                this.deleteChoice(this.state.swipeIndex)
            }
        }
        ]
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }
                           value={this.state.title}/>
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



                <Button	backgroundColor="green"
                           color="white"
                           style={{margin: 5}}
                           borderRadius={10}
                           onPress={() => this.createQuestion()}
                           title="Create"/>
                <Button	backgroundColor="red"
                           color="white"
                           style={{margin: 5}}
                           borderRadius={10}
                           onPress={() => this.props.navigate.goBack()}
                           title="Cancel"/>

                <View style={{padding: 15}}>
                    <Text h3>Preview</Text>
                    <View
                        style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}
                    >
                        <Text h4>{this.state.title}</Text>
                        <Text style={{textAlign: 'right'}}>{this.state.points + 'pts'}</Text>
                    </View>
                    <Text>{this.state.description}</Text>
                    <Text h4>True or False</Text>
                    <CheckBox
                        key={1}
                        title={'True'}
                        containerStyle={this.state.isTrue == true && {backgroundColor: 'lightskyblue'}}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        onPress={()=> this.setState({isTrue: true})}
                        checked={this.state.isTrue == true}
                    />
                    <CheckBox
                        key={2}
                        title={'False'}
                        containerStyle={this.state.isTrue == false && {backgroundColor: 'lightskyblue'}}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        onPress={()=> this.setState({isTrue: false})}
                        checked={this.state.isTrue == false}
                    />
                    <View style={{flex: 1, flexDirection: 'row', padding: 10}}>
                        <Button	backgroundColor="green"
                                   color="white"
                                   borderRadius={10}
                                   title="Submit"/>
                        <Button	backgroundColor="red"
                                   color="white"
                                   borderRadius={10}
                                   title="Cancel"/>
                    </View>
                </View>
            </View>
        )
    }
}




export default CreateTrueOrFalseQuestionEditor