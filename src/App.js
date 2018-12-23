import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView  } from 'react-native'
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
        this.previousComponent = this.previousComponent.bind(this)
        this.nextComponent = this.nextComponent.bind(this)
    }

    getInitialState()
    {
        return {
            currentComponent: 0,
            displayHintDialog: false,
            displaySnackbar: false,
            snackbarMessage: '',
            showBackForwardArrows: false
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

    previousComponent()
    {
        if (__DEV__ && this.state.currentComponent > 0)
        {                
            this.setState({currentComponent: this.state.currentComponent - 1}, this.storeState)
            this.scrollToTop()
        }
    }

    nextComponent()
    {
        if (this.state.currentComponent < this.components.length - 1)
        {
            let endMessage = this.components[this.state.currentComponent].endMessage
            if (endMessage)
                this.showMessage(endMessage)
                
            this.setState({currentComponent: this.state.currentComponent + 1}, () => {
                if (this.state.currentComponent == this.components.length - 1)
                    this.setState({ showBackForwardArrows: true }, this.storeState)
                else
                    this.storeState()
            })

            this.scrollToTop()
        }
    }

    scrollToTop()
    {
        this.scroll.scrollTo({x: 0, y: 0, animated: false})
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

        //console.log(component)

        return (
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.Content title="Christmas Quiz"/>
                    { ( __DEV__ || this.state.showBackForwardArrows) 
                        && this.state.currentComponent > 0 
                        && <Appbar.Action icon="rotate-left" onPress={this.previousComponent} /> }
                    { ( __DEV__ || this.state.showBackForwardArrows) 
                        && this.state.currentComponent < this.components.length - 1 
                        && <Appbar.Action icon="rotate-right" onPress={this.nextComponent} /> }
                    { __DEV__ && <Appbar.Action icon="delete-forever" onPress={() => this.clearState()} /> }
                    { component.endHint || component.gpsHint ? <Appbar.Action icon="redeem" onPress={this.triggerHintDialog} /> : null }
                </Appbar.Header>

                <SantaTracker style={styles.card} progress={ (this.state.currentComponent + 1) / this.components.length }/>

                <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                    <ScrollView ref={(c) => {this.scroll = c}}>

                        <ComponentTag {...component} style={styles.card} onDone={this.nextComponent}/>

                    </ScrollView>

                    <HintDialog
                        onConfirm = { hint => this.onHint(hint) }
                        onCancel= { this.triggerHintDialog }
                        visible = { this.state.displayHintDialog }
                    />
                </KeyboardAvoidingView>
                
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
