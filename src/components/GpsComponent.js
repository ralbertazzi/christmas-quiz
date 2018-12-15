import React from 'react';
import TaskComponent from './TaskComponent';
import SimpleCard from './SimpleCard';
import { Paragraph, Text } from 'react-native-paper'
const { Location } = Expo
import { distanceBetweenGpsCoordinates } from '../utils'

let DEFAULT_DISTANCE_THRESHOLD = 20  // 20 m

export default class GpsComponent extends TaskComponent {

    constructor(props)
    {
        super(props)
        this.targetLocation = props.location
        this.state = {showGpsError: false, location: null}
    }

    async getLocationAsync()
    {
        return Location.getCurrentPositionAsync({enableHighAccuracy: true})
    }

    componentDidMount()
    {
        this.gpsInterval = setInterval(async () => {

            let location = null
            try
            {
                location = await this.getLocationAsync()
            }
            catch (err) { console.log(err) }

            if (location && location.coords.accuracy < 100)
            {
                let distance = distanceBetweenGpsCoordinates(location.coords, this.targetLocation)
                let distanceThreshold = this.props.thresh ? this.props.thresh : DEFAULT_DISTANCE_THRESHOLD
                distanceThreshold /= 1000.0
                
                if (distance < distanceThreshold)
                    this.done()
                else
                    this.setState({ location: location, distance: distance, showGpsError: false })
            }
            else
            {
                this.setState({ showGpsError: true })
            }

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

    renderGpsErrorMessage()
    {
        if (this.state.showGpsError)
            return (
                <Text style={{color: 'red'}}>
                    Couldn't update the location. Maybe you turned your GPS off?
                </Text>
            )
    }

    render()
    {
        return (
        <SimpleCard {...this.props}>
            { __DEV__ && <Paragraph>{JSON.stringify(this.state.location)}</Paragraph>}
            {this.renderDistance()}
            {this.renderGpsErrorMessage()}
        </SimpleCard>
        )
    }
}