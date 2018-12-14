import React from 'react';
import { Button, Paragraph, Dialog, Portal, TextInput } from 'react-native-paper';

export default class HintDialog extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = { text: '' }
    }

    render()
    {
        return (
            <Portal>
                <Dialog
                    visible={this.props.visible}
                    onDismiss={this.props.onCancel}>
                <Dialog.Title>Insert hint code</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Requested for help? Write the hint code that you received and go on :)</Paragraph>
                    <TextInput 
                        label='Hint code'
                        value={this.state.text}
                        onChangeText={text => this.setState({ text })} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={this.props.onCancel}>Cancel</Button>
                    <Button onPress={() => this.props.onConfirm(this.state.text)}>Insert</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
        )
    }
}