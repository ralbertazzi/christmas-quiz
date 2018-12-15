import React from 'react';
import { StyleSheet, View, Button } from 'react-native'
import { Appbar } from 'react-native-paper'
import RequestPermissions from './components/RequestPermissions'
import SimpleCard from './components/SimpleCard'
import GpsComponent from './components/GpsComponent'
import InputComponent from './components/InputComponent'
import HintDialog from './components/HintDialog'
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
                text: "Find the location of Ginza restaurant",
                showDistance: true,
                location: GPS_CASA_LUCA,
                endHint: "pippo"
            },
            {
                tag: InputComponent,
                title: "The answer to all your problems",
                text: "You found me!",
                answer: "1234",
                buttonText: "Check"
            }
        ]

        // DEFAULT STATE
        this.state = {
            currentComponent: 0,
            display: false
        }

        this.loadState()

        this.triggerModal = this.triggerModal.bind(this)
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

    triggerModal() {
        this.setState({ display: !this.state.display })
    }

    onHint(hint)
    {
        this.triggerModal()
        let component = this.components[this.state.currentComponent]
        if (component.endHint == hint)
            this.nextComponent()
    }

    render() {
        let component = this.components[this.state.currentComponent]
        let ComponentTag = component.tag

        console.log(component)

        return (
            <View style={styles.container}>
                <View>
                    <ComponentTag {...component} onDone={this.nextComponent.bind(this)}/>
                </View>
                { __DEV__ && <Button title="Clear Async Storage" onPress={clearData}/> }
                { __DEV__ && <Button 
                                onPress = { this.triggerModal }
                                title = "Open Modal"
                                color = "orange">
                            </Button>
                }
                <HintDialog 
                    onConfirm = { hint => this.onHint(hint) }
                    onCancel= { this.triggerModal }
                    visible = { this.state.display }
                />
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
