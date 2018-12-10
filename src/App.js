import React from 'react';
import { StyleSheet, View } from 'react-native';
import RequestPermissions from './components/RequestPermissions'
import SimpleTask from './components/SimpleTask'

export default class App extends React.Component {

    constructor(props)
    {
        super(props)

        this.components = [
            {
                tag: RequestPermissions
            },
            {
                tag: SimpleTask,
                text: "Thanks for accepting the permissions",
                buttonText: "Move on"
            },
            {
                tag: SimpleTask,
                text: "Thanks for moving on!",
                buttonText: "Please, enough."
            }
        ]

        this.state = {
            currentComponent: 0
        }
    }

    nextComponent()
    {
        if (this.state.currentComponent < this.components.length - 1)
            this.setState({currentComponent: this.state.currentComponent + 1})
    }

    render() {
        let component = this.components[this.state.currentComponent]
        let ComponentTag = component.tag

        return (
            <View style={styles.container}>
                <ComponentTag {...component} onDone={this.nextComponent.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
