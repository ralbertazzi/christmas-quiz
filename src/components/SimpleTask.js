import React from 'react';
import TaskComponent from './TaskComponent';
import { Text, View, Button } from 'react-native';

export default class SimpleTask extends TaskComponent {

    constructor(props)
    {
        super(props)
    }

    onButtonPress = () => this.done()

    render = () =>
    (
        <View>
            <Text>{this.props.text}</Text>
            <Button onPress={this.onButtonPress} title={this.props.buttonText}></Button>
        </View>
    )
}