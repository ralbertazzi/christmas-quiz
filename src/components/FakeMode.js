import React from 'react';
import { Button, Divider } from 'react-native-paper';
import TaskComponent from './TaskComponent';
import SimpleCard from './SimpleCard';

export default class FakeMode extends TaskComponent {

    render = () => (
        <SimpleCard {... this.props}>
            <Button onPress={() => this.done()} style={{ margin: 10 }}>Modalità facile</Button>
            <Button onPress={() => this.done()}>Modalità difficile</Button>
        </SimpleCard>
    )
}