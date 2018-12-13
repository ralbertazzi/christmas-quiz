import React from 'react';

export default class TaskComponent extends React.Component {

    constructor(props)
    {
        super(props)

        this.doneCallback = props.onDone
    }

    done()
    {
        this.doneCallback()
    }
}