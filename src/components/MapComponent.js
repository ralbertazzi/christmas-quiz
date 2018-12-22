import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
const { MapView } = Expo


const PORTE = [
    {
        name: 'Porta Santo Stefano',
        latitude: 44.484669,
        longitude: 11.356312
    },
    {
        name: 'Porta Castiglione',
        latitude: 44.485548, 
        longitude: 11.348255
    },
    {
        name: 'Porta San Mamolo',
        latitude: 44.486441, 
        longitude: 11.339546
    },
    {
        name: 'Porta Saragozza',
        latitude: 44.490468, 
        longitude: 11.329982
    },
    {
        name: "Porta Sant'Isaia",
        latitude: 44.494671, 
        longitude: 11.328565
    },
    {
        name: 'Porta San Felice',
        latitude: 44.499243, 
        longitude: 11.327181
    },
    {
        name: 'Porta Lame',
        latitude: 44.502325, 
        longitude: 11.333304
    },
    {
        name: 'Porta Galliera',
        latitude: 44.504085, 
        longitude: 11.344738
    },
    {
        name: 'Porta Mascarella',
        latitude: 44.502167, 
        longitude: 11.352705
    },
    {
        name: 'Porta San Donato',
        latitude: 44.498405, 
        longitude: 11.356438
    },
    {
        name: 'Porta San Vitale',
        latitude: 44.493994, 
        longitude: 11.356833
    },
    {
        name: 'Porta Maggiore',
        latitude: 44.490059, 
        longitude: 11.357310
    }
]

const BOLOGNA_REGION = {
    latitude: 44.49541659162844,
    latitudeDelta: 0.027930152845833334,
    longitude: 11.342401932924986,
    longitudeDelta: 0.040199942886829376
}



export default class MapComponent extends React.Component {

    constructor(props)
    {
        super(props)
        this.solution = [3, 10, 6, 8, 0, 2, 11, 1, 9, 7, 5, 4]
        this.state = {
            isMapReady: false,
            currentIdx: -1,
            clickedIdx: -1
        }

        this.onMapReady = this.onMapReady.bind(this)
        this.setInitialRegion = this.setInitialRegion.bind(this)
    }

    onMarkerClick(i)
    {
        if (this.state.clickedIdx < 0 && this.solution.indexOf(i) > this.state.currentIdx)
        {
            this.setState({ clickedIdx: i })
            setTimeout(() => {
                if (this.solution[this.state.currentIdx + 1] == i)
                    this.setState({ currentIdx: this.state.currentIdx + 1 })
                else if (this.solution.indexOf(i) > this.state.currentIdx && this.state.currentIdx >= 0)
                    this.setState({ currentIdx: -1})

                this.setState({ clickedIdx: -1})
            }, 1000)
        }
    }

    getMarkerColor(i)
    {
        if (this.state.clickedIdx == i)
            return 'yellow'
        else if(this.solution.indexOf(i) > this.state.currentIdx)
            return 'red'
        else
            return 'green'
    }

    onMapReady() {
        this.setState({ isMapReady: true })
    }

    setInitialRegion() {
        this.map.animateToRegion(BOLOGNA_REGION, 1000)
    }

    // Sant'Isaia, San Vitale
    // Lame, San Mamolo
    drawSolutionLines()
    {
        let coords = []
        if (this.state.currentIdx == 11)
            coords.push([4, 10])
        if (this.state.currentIdx >= 5)
            coords.push([2, 6])

        let lines = []
        for(let i = 0; i < coords.length; i++)
            lines.push(<MapView.Polyline 
                key={`${i}${Date.now()}`}
                coordinates={ [PORTE[coords[i][0]], PORTE[coords[i][1]]] }/>)

        return lines
    }


    render()
    {
        //console.log('Selected marker idx is', this.state.selectedMarkerIdx)
        //console.log('Lines:', this.state.lines)
        return (
            <View>
                <MapView 
                    style={styles.map}
                    ref={ref => { this.map = ref }}
                    loadingEnabled={true}
                    moveOnMarkerPress={false}
                    showsTraffic={false}
                    showsIndoors={false}
                    onMapReady={this.onMapReady}
                    initialRegion={BOLOGNA_REGION}>
                {
                    this.state.isMapReady &&

                    PORTE.map((loc, i) => (
                        <MapView.Marker
                            key={`${i}${this.getMarkerColor(i)}`}
                            coordinate={loc}
                            title={loc.name}
                            pinColor={this.getMarkerColor(i)}
                            onPress={() => this.onMarkerClick(i)}/>
                    ))
                }
                {
                    this.drawSolutionLines()
                }
                </MapView>
                <Button onPress={this.setInitialRegion}>Torna alla vista di partenza</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height: 300
    }
})