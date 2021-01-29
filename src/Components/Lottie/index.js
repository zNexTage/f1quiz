import React, { useEffect, useState } from 'react'
import LottiePlayer from 'lottie-web'

function Lottie({ loop, autoplay, animation }) {
    const [lottiePlayer, setLottiePlayer] = useState();

    useEffect(() => {
        LottiePlayer.loadAnimation({
            container: lottiePlayer,
            renderer: "svg",
            loop,
            autoplay,
            animationData: animation
        });

    }, [lottiePlayer]);


    return (
        <div ref={(ref) => setLottiePlayer(ref)}></div>
    )
}

export default Lottie;