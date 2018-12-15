import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
import RequestPermissions from './components/RequestPermissions'
import SimpleCard from './components/SimpleCard'
import GpsComponent from './components/GpsComponent'
import InputComponent from './components/InputComponent'
import HintDialog from './components/HintDialog'
import { retrieveData, storeData, clearData } from './Storage'
import SantaTracker from './components/SantaTracker';

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
                showDistance: false,
                location: GPS_CASA_LUCA,
                gpsHint: "pippo1",
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

        this.state = this.getInitialState()
        this.loadState()

        this.triggerHintDialog = this.triggerHintDialog.bind(this)
        this.hideMessage = this.hideMessage.bind(this)
    }

    getInitialState()
    {
        return {
            currentComponent: 0,
            displayHintDialog: false,
            displaySnackbar: false,
            snackbarMessage: ''
        }
    }

    clearState()
    {
        clearData()
        this.setState(this.getInitialState())
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

    triggerHintDialog() {
        this.setState({ displayHintDialog: !this.state.displayHintDialog })
    }

    onHint(hint)
    {
        this.triggerHintDialog()
        let component = this.components[this.state.currentComponent]
        if (component.endHint == hint)
        {
            this.nextComponent()
        }
        else if (component.gpsHint == hint)
        {
            this.components[this.state.currentComponent].showDistance = true
        }
        else this.showMessage('Invalid hint code')
    }

    showMessage(message)
    {
        this.setState({
            displaySnackbar: true,
            snackbarMessage: message
        })
    }

    hideMessage()
    {
        this.setState({ displaySnackbar: false })
    }

    render() {
        let component = this.components[this.state.currentComponent]
        let ComponentTag = component.tag

        console.log(component)

        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.Content title="Christmas Quiz"/>
                    { __DEV__ && <Appbar.Action icon="delete-forever" onPress={() => this.clearState()} /> }
                    <Appbar.Action icon="redeem" onPress={this.triggerHintDialog} />
                </Appbar.Header>
                <SantaTracker style={styles.card} progress={ (this.state.currentComponent + 1) / this.components.length }/>
                <ComponentTag {...component} style={styles.card} onDone={this.nextComponent.bind(this)}/>
                <HintDialog
                    onConfirm = { hint => this.onHint(hint) }
                    onCancel= { this.triggerHintDialog }
                    visible = { this.state.displayHintDialog }
                />
                <Snackbar
                    visible={this.state.displaySnackbar}
                    onDismiss={this.hideMessage}
                    duration={Snackbar.DURATION_MEDIUM}
                    action={{ label: 'Got It', onPress: this.hideMessage }}
                    >
                    { this.state.snackbarMessage }
                </Snackbar>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    card: {
        margin: 10,
    }
});
