import React from 'react';
import { StyleSheet } from 'react-native';
import Dialog from 'react-native-dialog';

export default class HintDialog extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = { text: '' }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event)
    {
        const value = event.target && event.target.value
        this.setState({ text: value })
    }

    render()
    {
        return (
            <Dialog.Container visible={this.props.visible} onBackdropPress={this.props.onCancel}>
                <Dialog.Title>Insert hint code</Dialog.Title>
                <Dialog.Description>
                    Requested for help? Write the hint code that you received and go on :)
                </Dialog.Description>
                <Dialog.Input onChangeText={this.handleInputChange} value={this.state.text} style={styles.input}/>
                <Dialog.Button label='Cancel' onPress={this.props.onCancel} />
                <Dialog.Button label='Confirm' onPress={() => this.props.onConfirm(this.state.text)} />
            </Dialog.Container>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#169689',
        borderBottomWidth: 1,
    }
})