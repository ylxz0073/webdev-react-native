import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button, CheckBox, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import MultipleChoiceQuestionService from '../services/MultipleChoiceQuestionService'

class MultipleChoiceQuestionEditor extends React.Component {
    // static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '0',
            options: '',
            choices: [],
            checked: 0,
            swipeIndex: 0
        }

        this.addChoice = this.addChoice.bind(this)
        this.checkChoice = this.checkChoice.bind(this)
        this.deleteChoice = this.deleteChoice.bind(this)
        // this.createQuestion = this.createQuestion.bind(this)
        // this.updateQuestion = this.updateQuestion.bind(this)
        this.saveQuestion = this.saveQuestion.bind(this)
        this.multipleChoiceQuestionService=MultipleChoiceQuestionService.instance
    }

    componentDidMount(){
        // console.log(this.props.questionId)
        this.updateQuestion()
    }


    updateQuestion(){

        this.multipleChoiceQuestionService.findMultipleChoiceQuestionForId(this.props.questionId)
            .then((response)=> {
                // console.log(response)
                this.setState({choices: response.choices,
                                title: response.questionTitle,
                                description: response.description,
                                points: response.points,
                                correctChoice: response.correctChoice})

            })
    }


    updateForm(newState) {
        this.setState(newState)
    }

    addChoice(choice){

        // this.state.choices.concat(choice)
        this.setState({choices: [...this.state.choices, choice]})
    }

    checkChoice(index) {
        this.setState({checked: index})
    }

    deleteChoice(index) {
        // console.log(index)
        var choices = this.state.choices
        choices.splice(index, 1)
        this.setState({choices: choices})
        // console.log(this.state.choices)
    }

    saveQuestion(){
        console.log(this.state.checked)
        console.log(this.state.choices[this.state.checked])
        const updateQuestionList = this.props.navigate.getParam('updateQuestionList')
        this.multipleChoiceQuestionService
            .updateMultipleChoiceQuestion(this.props.questionId,
                {questionTitle: this.state.title,
                    description: this.state.description,
                    points: this.state.points,
                    choices: this.state.choices,
                    correctChoice: this.state.choices[this.state.checked]})
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

                <FormLabel>Choices</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({options: text})}
                           value={this.state.options}
                />
                <FormValidationMessage>
                </FormValidationMessage>
                <Button	backgroundColor="green"
                           color="white"
                           onPress={() => this.addChoice(this.state.options)}
                           title="Add Choice"/>

                <Button	backgroundColor="green"
                           color="white"
                           onPress={() => this.saveQuestion()}
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           onPress={() => this.props.navigate.goBack()}
                           title="Cancel"/>

                <View style={{padding: 15}}>
                    <Text h3>Preview</Text>
                    <Text h2>{this.state.title}</Text>
                    <Text style={{textAlign: 'right'}}>{this.state.points + 'pts'}</Text>
                    <Text>{this.state.description}</Text>
                    {this.state.choices.sort((x, y) => {
                        return x.id - y.id;
                    })
                    .map(
                        (choice, index) => (
                            <Swipeout right={swipeBtns}
                                      key={index}
                                      autoClose={true}
                                      style={styles.container}
                                      onOpen={()=>{this.setState({swipeIndex: index})
                                                    console.log(this.state.swipeIndex)}}
                                      backgroundColor= 'transparent'>
                            {/*<View*/}
                                {/*key={index}*/}
                                {/*style={styles.container}>*/}
                                <CheckBox
                                    key={index}
                                    title={choice}
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    containerStyle={this.state.checked == index && {backgroundColor: 'lightskyblue'}}
                                    onPress={()=> this.checkChoice(index)}
                                    checked={this.state.checked == index}
                                />
                            {/*</View>*/}
                            </Swipeout>

                        ))}
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button	backgroundColor="green"
                                   color="white"
                                   title="Submit"/>
                        <Button	backgroundColor="red"
                               color="white"
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

export default MultipleChoiceQuestionEditor