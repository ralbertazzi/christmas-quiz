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
                <Dialog.Title>Inserisci codice di aiuto</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Hai bisogno di un aiuto? 🤷 Scrivi qui il codice che hai ricevuto 📩</Paragraph>
                    <TextInput
                        mode='outlined'
                        label='Codice'
                        value={this.state.text}
                        onChangeText={text => this.setState({ text })} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={this.props.onCancel}>Annulla</Button>
                    <Button onPress={() => this.props.onConfirm(this.state.text)}>Inserisci</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
        )
    }
}