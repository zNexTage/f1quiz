import React from 'react'
import Lottie from '../Lottie' 
import loadingJson from '../../Assets/loading.json'

function Loading() {
    return (
        <Lottie
            animation={loadingJson}
            autoplay={true}
            loop={true}
        />
    )
}

export default Loading;