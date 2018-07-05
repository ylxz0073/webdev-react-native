import React from 'react'
import {View, TextInput,StyleSheet} from 'react-native'
import {Text, Button,  CheckBox, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import EssayQuestionService from '../services/EssayQuestionService'

class CreateEssayQuestionEditor extends React.Component {
    // static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '0',
            options: '',

            checked: '',
            swipeIndex: 0
        }


        this.createQuestion = this.createQuestion.bind(this)
        // this.updateQuestion = this.updateQuestion.bind(this)
        this.essayQuestionService=EssayQuestionService.instance
    }

    componentDidMount(){
        // console.log(this.props.examId)
        // () => this.updateQuestion()
    }


    // componentWillReceiveProps(newProps) {
    //     this.forceUpdate()
    //     console.log('force update')
    // }

    // updateQuestion(){
    //     this.multipleChoiceQuestionService.findAllMultipleChoiceQuestionsForExam(this.props.examId)
    //         .then((response)=> {
    //             console.log(response)
    //             this.setState({choices: response})
    //
    //         })
    // }

    updateForm(newState) {
        this.setState(newState)
    }


    createQuestion() {
        const updateQuestionList = this.props.navigate.getParam('updateQuestionList')

        this.essayQuestionService
            .createEssayQuestion(this.props.examId,
                {questionTitle: this.state.title,
                    description: this.state.description,
                    points: this.state.points,
                    })
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
                    <Text h4>Essay answer</Text>
                    <TextInput
                        backgroundColor="white"
                        multiline={true}
                        numberOfLines={4}
                        height={80}
                        // onChangeText={(text) => this.setState({text})}
                        // value={this.state.text}
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



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});

export default CreateEssayQuestionEditor