import React, { useEffect, useState } from 'react'
import LottiePlayer from 'lottie-web'

function Lottie({ loop, autoplay, animation, onComplete }) {
    const [lottiePlayer, setLottiePlayer] = useState();

    useEffect(() => {
        const lottie = LottiePlayer.loadAnimation({
            container: lottiePlayer,
            renderer: "svg",
            loop,
            autoplay,
            animationData: animation
        });

        lottie.addEventListener('complete', onComplete);

    }, [lottiePlayer]);


    return (
        <div ref={(ref) => setLottiePlayer(ref)}></div>
    )
}

export default Lottie;