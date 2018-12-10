import React from 'react';
const { Location } = Expo;

export default class TaskComponent extends React.Component {

    constructor(props)
    {
        super(props)

        this.doneCallback = props.onDone
    }

    async getLocationAsync()
    {
        return Location.getCurrentPositionAsync({enableHighAccuracy: true})
    }

    done()
    {
        this.doneCallback()
    }
}