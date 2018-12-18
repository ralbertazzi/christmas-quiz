import React from 'react';
import { Button } from 'react-native-paper'
const { Speech } = Expo

const ListenButton = (props) => (
    <Button
        style={{ margin: 10 }}
        onPress={() => Speech.speak(props.speech, { language: 'it' })}>
        {'🔉 ' + props.buttonText}
    </Button>
)

export default ListenButton