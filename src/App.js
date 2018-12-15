import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
import HintDialog from './components/HintDialog'
import { retrieveData, storeData, clearData } from './Storage'
import SantaTracker from './components/SantaTracker';
import levels from './Levels'

export default class App extends React.Component {

    constructor(props)
    {
        super(props)

        this.components = levels

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
            let endMessage = this.components[this.state.currentComponent].endMessage
            if (endMessage)
                this.showMessage(endMessage)
                
            this.setState({currentComponent: this.state.currentComponent + 1}, this.storeState)
            this.scroll.scrollTo({x: 0, y: 0, animated: false})
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
                    { component.endHint || component.gpsHint ? <Appbar.Action icon="redeem" onPress={this.triggerHintDialog} /> : null }
                </Appbar.Header>
                <ScrollView ref={(c) => {this.scroll = c}}>
                    <SantaTracker style={styles.card} progress={ (this.state.currentComponent + 1) / this.components.length }/>
                    <ComponentTag {...component} style={styles.card} onDone={this.nextComponent.bind(this)}/>
                </ScrollView>
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
