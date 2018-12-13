import React from 'react';
import TaskComponent from './TaskComponent';
import SimpleCard from './SimpleCard';
import { Text } from 'react-native'
const { Location } = Expo
import { distanceBetweenGpsCoordinates } from '../utils'

let DISTANCE_THRESHOLD = 0.020  // 20 m

export default class GpsComponent extends TaskComponent {

    constructor(props)
    {
        super(props)
        this.targetLocation = props.location
        this.state = {}
    }

    async getLocationAsync()
    {
        return Location.getCurrentPositionAsync({enableHighAccuracy: true})
    }

    componentDidMount()
    {
        this.gpsInterval = setInterval(async () => {
            let location = await this.getLocationAsync()
            let distance = distanceBetweenGpsCoordinates(location.coords, this.targetLocation)
            if (distance < DISTANCE_THRESHOLD)
                this.done()
            else
                this.setState({ location: location, distance: distance })
        }, 5000)
    }

    componentWillUnmount()
    {
        clearInterval(this.gpsInterval)
    }

    renderDistance()
    {
        if (this.state.distance == null || !this.props.showDistance)
            return null

        
        let distanceString = this.state.distance >= 1 ? 
                                this.state.distance.toFixed(2) + " km" :
                                Math.round(this.state.distance * 1000) + " m"

        return <Text>{distanceString}</Text>
    }

    render()
    {
        return (
        <SimpleCard {...this.props}>
            <Text>{JSON.stringify(this.state.location)}</Text>
            {this.renderDistance()}
        </SimpleCard>
        )
    }
}