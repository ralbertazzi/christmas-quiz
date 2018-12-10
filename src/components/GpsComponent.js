import React from 'react';
import TaskComponent from './TaskComponent';
import SimpleCard from './SimpleCard';
import { Text } from 'react-native'

export default class GpsComponent extends TaskComponent {

    constructor(props)
    {
        super(props)
    }

    componentDidMount()
    {
        this.gpsInterval = setInterval(async () => {
            let location = await this.getLocationAsync()
            this.setState({ location: location})
        }, 5000)
    }

    componentWillUnmount()
    {
        clearInterval(this.gpsInterval)
    }

    render()
    {
        return (
        <SimpleCard {...this.props}>
            <Text>{this.state ? JSON.stringify(this.state.location) : null}</Text>
        </SimpleCard>
        )
    }
}