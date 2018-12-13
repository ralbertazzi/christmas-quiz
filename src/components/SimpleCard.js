import React from 'react';
import TaskComponent from './TaskComponent';
import { Text, Button } from 'react-native';
import { Card } from 'react-native-elements'

export default class SimpleCard extends TaskComponent {

    constructor(props)
    {
        super(props)
    }

    onButtonPress = () => this.done()

    renderText()
    {
        if (this.props.text)
            return (    
            <Text style={{marginBottom: 10}}>
                {this.props.text}
            </Text>
        )

        return null
    }

    renderButton()
    {
        if (this.props.buttonText)
            return (
            <Button
                icon={{name: 'code'}}
                backgroundColor='#03A9F4'
                onPress={this.onButtonPress}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title={this.props.buttonText} />
            )
        return null
    }

    render = () =>
    (
        <Card
            title={this.props.title}
            image={this.props.image}>
            {this.renderText()}
            {this.props.children}
            {this.renderButton()}
        </Card>
    )
}