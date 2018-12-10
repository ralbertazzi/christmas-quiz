import React from 'react';
import { StyleSheet, View } from 'react-native'
import { Header } from 'react-native-elements'
import RequestPermissions from './components/RequestPermissions'
import SimpleCard from './components/SimpleCard'
import GpsComponent from './components/GpsComponent'
import { retrieveData, storeData } from './Storage'

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
                text: "Find this location"
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
