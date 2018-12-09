import React from 'react';
import TaskComponent from './TaskComponent';
import { Text, View, Button } from 'react-native';
const { Permissions } = Expo;

export default class RequestPermissions extends TaskComponent {

    constructor(props)
    {
        super(props)
    }

    async requestPermissions()
    {
        console.log('Asking for permissions')
        const { status } = await Permissions.askAsync(Permissions.LOCATION)
        if (status === 'granted')
            this.done()
    }

    render = () =>
    (
        <View>
            <Text>First I need to get access to your GPS</Text>
            <Button onPress={this.requestPermissions.bind(this)} title={"Require permissions"}></Button>
        </View>
    )
}