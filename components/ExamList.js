import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'
import ExamService from "../services/ExamService";
import Swipeout from 'react-native-swipeout'

class ExamList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1,
            topicId: 1,
            widgetId: 1
        }
        this.refreshExamList = this.refreshExamList.bind(this)
        this.examService = ExamService.instance
    }
    componentWillMount() {

        // this.state.topicId = topicId
        this.refreshExamList()
    }

    componentWillReceiveProps(newProps) {
        this.refreshExamList()
    }

    refreshExamList() {
        // const {navigation} = this.props;
        // console.log('*** refresh ***')
        const topicId = this.props.topicId
        this.setState({topicId: topicId})
        this.examService.findAllExamsForTopic(topicId)
            .then(widgets => this.setState({widgets}))


    }

    deleteExam(widgetId) {
        this.examService.deleteExam(widgetId)
            .then(() => {this.refreshExamList()})

    }

    render() {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteExam(this.state.widgetId) }
        }]

        return(
            <View style={{paddingTop: 15}}>
                {/*<Text>{this.state.topicId}</Text>*/}
                <Button	backgroundColor="green"
                           color="white"
                           borderRadius={10}
                           onPress={() => this.props.navigate
                               .navigate("ExamEditor",
                                   {isEditing: false,
                                       refreshExamList:this.refreshExamList,
                                       topicId: this.props.topicId})}
                           title="New Exam"/>
                {/*{console.log('###render###')}*/}
                {this.state.widgets.sort((x, y) => {
                    return x.id - y.id;
                }).map(
                    (widget, index) => (
                        <Swipeout right={swipeBtns}
                                  key={index}
                                  autoClose={true}
                                  onOpen={()=>{this.setState({widgetId: widget.id})}}
                                  backgroundColor= 'transparent'>
                            <ListItem
                                onPress={() => this.props.navigate
                                    .navigate("ExamEditor",
                                        {isEditing: true,
                                            examId: widget.id,
                                            topicId: this.props.topicId,
                                            refreshExamList:this.refreshExamList
                                        }
                                    )}
                                // onPress={() =>  console.log(widget.id)}
                                key={index}
                                subtitle={widget.description}
                                title={widget.examTitle}/>
                        </Swipeout>
                    ))}
            </View>
        )


    }
}
export default ExamList