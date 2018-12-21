import React from 'react';
import { View } from 'react-native'
import TaskComponent from './TaskComponent';
import SimpleCard from './SimpleCard';
import { Paragraph, Text, Button } from 'react-native-paper'
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

    async enableWatchPosition()
    {
        try
        {
            if (this.gpsSubscription)
                this.gpsSubscription.remove()

            this.gpsSubscription = await Location.watchPositionAsync({
                enableHighAccuracy: true,
                timeInterval: 1000,
                distanceInterval: 1
            }, this.onNewLocation.bind(this))

            return true
        }
        catch(err){ return false }
    }

    async componentDidMount()
    {
        let watchLocationEnable = await this.enableWatchPosition()
        if (!watchLocationEnable)
            this.setState({ showGpsError: true })
    }

    onNewLocation(location)
    {
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
    }

    componentWillUnmount()
    {
        if (this.gpsSubscription)
            this.gpsSubscription.remove()
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
                <View>
                <Text style={{color: 'red'}}>
                    Couldn't update the location. Maybe you turned your GPS off?
                </Text>
                <Button onPress={this.enableWatchPosition.bind(this)}>Press me when GPS is on</Button>
                </View>
            )
    }

    render()
    {
        return (
        <SimpleCard {...this.props}>
            { this.props.children }
            { __DEV__ && <Paragraph>{JSON.stringify(this.state.location)}</Paragraph>}
            {this.renderDistance()}
            {this.renderGpsErrorMessage()}
        </SimpleCard>
        )
    }
}