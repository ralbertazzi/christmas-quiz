import React from 'react';
import { Image } from 'react-native'
import { ProgressBar, Button, Surface } from 'react-native-paper'

const SantaTracker = (props) => (
    <Surface style={props.style}>
            <Button
            icon={() => (
                <Image
                source={require('../../assets/santa_claus.png')}
                style={{ width: 32, height: 32 }}
                />
            )}
            />
            <ProgressBar progress={ props.progress }/>
    </Surface>
)

export default SantaTracker