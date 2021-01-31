import React from 'react'
import Loading from '../../Loading';
import Widget from '../index'

function WidgetLoading() {
    return (
        <Widget>
            <Widget.Header>
                Aguarde um pouquino :)
                </Widget.Header>
            <Widget.Content>
                <Loading />
            </Widget.Content>
        </Widget>
    )
}

export default WidgetLoading;