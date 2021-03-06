import React, {Component} from 'react'
import {View, ScrollView,Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import AssignmentList from "./AssignmentList";
import ExamList from './ExamList'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}
    constructor(props) {
        super(props)
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            lessonId: 1,
            topicId: 1
        }
    }
    componentDidMount() {

        const {navigation} = this.props;
        const topicId = navigation.getParam("topicId")
        this.state.topicId = topicId
        fetch("https://jtao-webdev-hw-2018.herokuapp.com/api/topic/"+topicId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }


    render() {
        // console.log(this.props.navigation.getParam("topicId"))
        return(
            <ScrollView>
                <View>
                    {/*<Text>{this.state.topicId}</Text>*/}
                    <AssignmentList
                        topicId={this.props.navigation.getParam("topicId")}
                        navigate={this.props.navigation}/>
                </View>
                <View>
                    {/*<Text>{this.state.topicId}</Text>*/}
                    <ExamList
                        topicId={this.props.navigation.getParam("topicId")}
                        navigate={this.props.navigation}/>
                </View>
            </ScrollView>

        )
    }
}
export default WidgetList