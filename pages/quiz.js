import React from 'react'
import { useRouter } from 'next/router';

import Widget from '../src/Components/Widget';
import QuizBackground from '../src/Components/Quiz/QuizBackground';
import QuizContainer from '../src/Components/Quiz/QuizContainer';

import db from '../db.json'
import QuizButton from '../src/Components/Quiz/QuizButton';

function LoadingWidget() {
    return (
        <>
            <div>
                Página de quiz
            </div>
            <Widget>
                <Widget.Header>
                    Carregando...
                </Widget.Header>
                <Widget.Content>
                    [Desafio do Loading]
                </Widget.Content>
            </Widget>
        </>
    );
}

function QuestionWidget({
    question,
    questionIndex,
    totalQuestions,
    onSubmit,
}) {     
    const questionId = `question__${questionIndex}`;
     
    return (
        <Widget>
            <Widget.Header>
                {/* <BackLinkArrow href="/" /> */}
                <h3>
                    {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                </h3>
            </Widget.Header>

            <img
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>

                <form
                    onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        onSubmit();
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        return (
                            <Widget.Topic
                                key={`${alternativeIndex}`}
                                as="label"
                                htmlFor={alternativeId}
                            >
                                <input
                                    // style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    type="radio"
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    <QuizButton 
                    
                    type="submit">
                        Confirmar
                    </QuizButton>
                </form>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

function Quiz() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    const router = useRouter();

    const { playerName } = router.query;

    React.useEffect(() => {
        // fetch() ...
        setTimeout(() => { 
            setScreenState(screenStates.QUIZ);
        }, 1 * 1000);
        // nasce === didMount
    }, []);

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                {/*<QuizLogo />*/}
                {screenState === screenStates.QUIZ && (
                    <QuestionWidget
                        question={question}
                        questionIndex={questionIndex}
                        totalQuestions={totalQuestions}
                        onSubmit={handleSubmitQuiz}
                    />
                )}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
            </QuizContainer>
        </QuizBackground>
    )
}

export default Quiz;