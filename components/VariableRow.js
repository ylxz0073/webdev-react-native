import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import {Text, Button, CheckBox, ListItem} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'


export default class VariableRow extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            variableRow:[]
        }
    }

    componentDidMount() {
        var variableString = this.props.variable
        var startIndex = variableString.indexOf('[')
        var endIndex = variableString.indexOf(']')
        if (startIndex !== 0) {
            this.state.variableRow.push(variableString.substring(0, startIndex))
        }
        this.state.variableRow.push('[]')
        if (endIndex !== variableString.length -1) {
            this.state.variableRow.push(variableString.substring(endIndex+1, variableString.length))
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {this.state.variableRow.map(

                    (variable, index) => (
                        <View height={45} key={index}>
                            {variable != '[]' && <Text h4>{variable}</Text>}
                            {variable == '[]' && <TextInput
                                backgroundColor="white"
                                height={40}
                                width={120}/>}

                        </View>
                    )
                )}
            </View>
        )
    }
}