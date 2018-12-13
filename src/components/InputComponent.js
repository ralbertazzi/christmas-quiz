import React from 'react';
import TaskComponent from './TaskComponent';
import SimpleCard from './SimpleCard';
import { Input, Icon } from 'react-native-elements';

export default class InputComponent extends TaskComponent {

    constructor(props)
    {
        super(props)
        this.errorMessage = this.props.errorMessage ? this.props.errorMessage : 'Answer not valid'
        this.state = {errorMessage : '', answer: ''}
    }

    onChangeText(text)
    {
        this.setState({
            answer: text,
            errorMessage: ''
        })
    }

    checkAnswer()
    {
        if (this.state.answer == this.props.answer)
            this.done()
        else
            this.setState({ errorMessage : this.errorMessage })
    }

    render()
    {
        return (
        <SimpleCard {...this.props} onDone={this.checkAnswer.bind(this)}>
            <Input
            placeholder='Answer'
            errorMessage={this.state.errorMessage}
            onChangeText={this.onChangeText.bind(this)}
            value={this.state.answer}
            leftIcon={
                <Icon
                name='send'
                size={24}
                color='gray'
                />
            }
            />
        </SimpleCard>
        )
    }
}