import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, Button, ListItem} from 'react-native-elements'
import AssignmentService from "../services/AssignmentService";
import Swipeout from 'react-native-swipeout'

class AssignmentList extends Component {

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
        this.refreshAssignmentList = this.refreshAssignmentList.bind(this)
        this.assignmentService = AssignmentService.instance
    }
    componentWillMount() {

        // this.state.topicId = topicId
        this.refreshAssignmentList()
    }

    componentWillReceiveProps(newProps) {
        this.refreshAssignmentList()
    }

    refreshAssignmentList() {
        // const {navigation} = this.props;
        // console.log('*** refresh ***')
        const topicId = this.props.topicId
        this.setState({topicId: topicId})
        this.assignmentService.findAllAssignmentsForTopic(topicId)
            .then(widgets => this.setState({widgets}))


    }

    deleteAssignment(widgetId) {
        this.assignmentService.deleteAssignment(widgetId)
            .then(() => {this.refreshAssignmentList()})

    }

    render() {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteAssignment(this.state.widgetId) }
        }]

        return(
            <View style={{paddingTop: 15}}>
                {/*<Text>{this.state.topicId}</Text>*/}
                <Button	backgroundColor="green"
                           color="white"
                           borderRadius={10}
                           onPress={() => this.props.navigate
                               .navigate("AssignmentEditor",
                                   {isEditing: false,
                                       refreshAssignmentList:this.refreshAssignmentList,
                                       topicId: this.props.topicId})}
                           title="New Assignment"/>
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
                                    .navigate("AssignmentEditor",
                                        {isEditing: true,
                                            widgetId: widget.id,
                                            topicId: this.props.topicId,
                                            refreshAssignmentList:this.refreshAssignmentList
                                            }
                                        )}
                                // onPress={() =>  console.log(widget.id)}
                                key={index}
                                subtitle={widget.paragraph}
                                title={widget.assignmentTitle}/>
                        </Swipeout>
                    ))}
            </View>
        )


    }
}
export default AssignmentList