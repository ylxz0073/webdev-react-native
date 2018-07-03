import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import {Text, Button, CheckBox, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import FillInTheBlankQuestionService from '../services/FillInTheBlankQuestionService'
import VariableRow from '../components/VariableRow'

class CreateFillInTheBlankQuestionEditor extends React.Component {
    // static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '0',
            variables: [],
            variable:'',
            swipeIndex: 0
        }

        this.addVariable = this.addVariable.bind(this)

        this.deleteVariable = this.deleteVariable.bind(this)
        this.createQuestion = this.createQuestion.bind(this)
        // this.updateQuestion = this.updateQuestion.bind(this)
        this.fillInTheBlankQuestionService=FillInTheBlankQuestionService.instance
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

    addVariable(variable){

        // this.state.choices.concat(choice)
        this.setState({variables: [...this.state.variables, variable]})
    }


    deleteVariable(index) {
        // console.log(index)
        var variables = this.state.variables
        variables.splice(index, 1)
        this.setState({variables: variables})
        // console.log(this.state.choices)
    }

    createQuestion() {
        const updateQuestionList = this.props.navigate.getParam('updateQuestionList')

        this.fillInTheBlankQuestionService
            .createFillInTheBlankQuestion(this.props.examId,
                {questionTitle: this.state.title,
                    description: this.state.description,
                    points: this.state.points,
                    variables: this.state.variables,
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
                this.deleteVariable(this.state.swipeIndex)
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

                <FormLabel>Variable</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({variable: text})}
                           value={this.state.variable}
                />
                <FormValidationMessage>
                    example: 2 + 2 = [four=4]
                </FormValidationMessage>
                <Button	backgroundColor="green"
                           color="white"
                           onPress={() => this.addVariable(this.state.variable)}
                           title="Add Variable"/>

                <Button	backgroundColor="green"
                           color="white"
                           onPress={() => this.createQuestion()}
                           title="Create"/>
                <Button	backgroundColor="red"
                           color="white"
                           onPress={() => this.props.navigate.goBack()}
                           title="Cancel"/>

                <View style={{padding: 15}}>
                    <Text h3>Preview</Text>
                    <Text h2>{this.state.title}</Text>
                    <Text style={{textAlign: 'right'}}>{this.state.points + 'pts'}</Text>
                    <Text>{this.state.description}</Text>
                    {this.state.variables.sort((x, y) => {
                        return x.id - y.id;
                    })
                        .map(
                            (variable, index) => (
                                <Swipeout right={swipeBtns}
                                          key={index}
                                          autoClose={true}
                                          style={styles.container}
                                          onOpen={()=>{this.setState({swipeIndex: index})
                                              console.log(this.state.swipeIndex)}}
                                          backgroundColor= 'transparent'>

                                    <VariableRow
                                        key={index}
                                        variable={variable}/>

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

export default CreateFillInTheBlankQuestionEditor