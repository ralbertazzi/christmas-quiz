import React from 'react';
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
            <Card style={this.props.style}>
                { this.props.image && <Card.Cover source={this.props.image}/> }
                <Card.Content>
                    { this.props.title      && <Title>{this.props.title}</Title>}
                    { this.props.text       && <Paragraph>{this.props.text}</Paragraph> }
                    { this.props.children }
                </Card.Content>
                <Card.Actions>
                    { this.props.buttonText && <Button onPress={this.onButtonPress}>{this.props.buttonText}</Button> }
                </Card.Actions>
            </Card>
        )
}