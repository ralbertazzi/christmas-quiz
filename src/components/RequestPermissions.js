import React from 'react';
import TaskComponent from './TaskComponent';
import SimpleCard from './SimpleCard';
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
        <SimpleCard {...this.props}
            title='Require permissions'
            text='First I need to get access to your GPS'
            buttonText='Grant permissions'
            onDone={this.requestPermissions.bind(this)}/>
    )
}