import React from 'react';
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


export default class MapComponent extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            selectedMarkerIdx: -1,
            lines: []
        }
    }

    markerBelongsToALine(marker_idx)
    {
        for (let line of this.state.lines)
            if (line[0] == marker_idx || line[1] == marker_idx)
                return true

        return false
    }

    onMarkerClick(i)
    {
        // If two lines are already drawn and you select a marker that does not belong to one of the two lines, stop
        if (this.state.lines.length == 2 && !this.markerBelongsToALine(i))
            return

        if (this.state.selectedMarkerIdx >= 0)
        {
            if (this.state.selectedMarkerIdx != i)
            {
                let filteredLines = this.state.lines.filter(line => line[0] != i && line[1] != i)
                this.setState({ lines: [...filteredLines, [this.state.selectedMarkerIdx, i]]})
            }
                
            this.setState({ selectedMarkerIdx: -1 })
        }
        else
        {
            this.setState({ 
                selectedMarkerIdx: i,
                lines: this.state.lines.filter(line => line[0] != i && line[1] != i)
            })
        }
    }

    getMarkerColor(i)
    {
        if (this.state.selectedMarkerIdx == i)
            return 'yellow'
        else if (this.markerBelongsToALine(i))
            return 'green'
        else
            return 'red'
    }


    render()
    {
        //console.log('Selected marker idx is', this.state.selectedMarkerIdx)
        //console.log('Lines:', this.state.lines)
        return (
            <MapView 
                style={{ flex: 1 }}
                loadingEnabled = {true}
                moveOnMarkerPress = {false}
                initialRegion={{
                    latitude: 44.507502,
                    longitude: 11.320972,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}>
            {
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
                this.state.lines.map((line, i) => (
                    <MapView.Polyline 
                        key={`${i}${Date.now()}`}
                        coordinates={ [PORTE[line[0]], PORTE[line[1]]] }/>
                ))
            }
            </MapView>
        );
    }
}