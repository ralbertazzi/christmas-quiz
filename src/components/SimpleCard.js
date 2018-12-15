import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import TaskComponent from './TaskComponent';

export default class SimpleCard extends TaskComponent {

    constructor(props)
    {
        super(props)
    }

    onButtonPress = () => this.done()

    render = () =>
    (
        <Card style={styles.card}>
            { this.props.image && <Card.Cover source={this.props.image}/> }
            <Card.Content>
                { this.props.title      && <Title>{this.props.title}</Title>}
                { this.props.buttonText && <Paragraph>{this.props.text}</Paragraph> }
                { this.props.children }
            </Card.Content>
            <Card.Actions>
                { this.props.buttonText && <Button onPress={this.onButtonPress}>{this.props.buttonText}</Button> }
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
      margin: 10,
    }
});