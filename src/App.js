import React from 'react';
import { StyleSheet, View, Button } from 'react-native'
import { Header } from 'react-native-elements'
import RequestPermissions from './components/RequestPermissions'
import SimpleCard from './components/SimpleCard'
import GpsComponent from './components/GpsComponent'
import InputComponent from './components/InputComponent'
import { retrieveData, storeData, clearData } from './Storage'

let GPS_PIAZZA_NETTUNO = { latitude: 44.494280, longitude: 11.342671 }
let GPS_CASA_LUCA = { latitude: 44.468682, longitude: 11.373693 }

export default class App extends React.Component {

    constructor(props)
    {
        super(props)

        this.components = [
            {
                tag: RequestPermissions
            },
            {
                tag: SimpleCard,
                text: "Thanks for accepting the permissions",
                buttonText: "Move on"
            },
            {
                tag: SimpleCard,
                title: "What a nice title!",
                image: require("../assets/torri.jpg"),
                text: "Thanks for moving on!",
                buttonText: "Please, enough."
            },
            {
                tag: GpsComponent,
                title: "My Gps component!",
                text: "Find this location",
                showDistance: false,
                location: GPS_CASA_LUCA
            },
            {
                tag: InputComponent,
                title: "The answer to all your problems",
                text: "You found me!",
                answer: "1234",
                buttonText: "Check"
            }
        ]

        this.state = {
            currentComponent: 0
        }

        this.loadState()
    }

    async loadState()
    {
        let state = await retrieveData('state')
        console.log('Stored state is:', state)
        if (state != null)
        {
            this.setState(state)
        }
    }

    async storeState()
    {
        console.log('Storing state:', this.state)
        await storeData('state', this.state)
    }

    nextComponent()
    {
        if (this.state.currentComponent < this.components.length - 1)
        {
            this.setState({currentComponent: this.state.currentComponent + 1}, this.storeState)
        }
    }

    render() {
        let component = this.components[this.state.currentComponent]
        let ComponentTag = component.tag

        console.log(component)

        return (
            <View style={styles.container}>
                <Header
                centerComponent={{ text: 'ChristmasQuiz', style: { color: '#fff' } }}
                />
                <View>
                    <ComponentTag {...component} onDone={this.nextComponent.bind(this)}/>
                </View>
                { __DEV__ && <Button title="Clear Async Storage" onPress={clearData}/> }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
