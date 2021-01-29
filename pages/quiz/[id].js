import React from 'react'
import { ThemeProvider } from 'styled-components';
import Quiz from '.';

function QuizDaGalera({ dbQuizExtern }) {

    return (
        <ThemeProvider theme={dbQuizExtern.theme}>
            <Quiz quizDatabase={dbQuizExtern} />
        </ThemeProvider>
    )
}

//Sempre que receber uma requisição essa função será executada no lado do servidor
export async function getServerSideProps(context) {
    const [projectName, githubUser] = context.query.id.split("___");

    const dbQuizExtern = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }

            throw new Error("Ops! Não foi possível obter os dados :(");
        })
        .then((dbQuiz) => dbQuiz)
        .catch((err) => {
            console.error(err);

            throw err;
        })

    return {
        props: {
            dbQuizExtern
        }, // will be passed to the page component as props
    };
}

export default QuizDaGalera