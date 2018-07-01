import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import AssignmentList from "./AssignmentList";

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
        fetch("http://localhost:8080/api/topic/"+topicId+"/widget")
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets}))
    }


    render() {
        // console.log(this.props.navigation.getParam("topicId"))
        return(
            <View>
                <Text>{this.state.topicId}</Text>
                <AssignmentList
                    topicId={this.props.navigation.getParam("topicId")}
                    navigate={this.props.navigation}/>
            </View>

        )
    }
}
export default WidgetList