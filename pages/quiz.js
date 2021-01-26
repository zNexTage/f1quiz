import React from 'react'
import { useRouter } from 'next/router';

function Quiz() {
    const router = useRouter();

    const { playerName } = router.query;

    return (
        <div>
            <h1 style={{color: 'black'}}>
                {playerName}
            </h1>
        </div>
    )
}

export default Quiz;