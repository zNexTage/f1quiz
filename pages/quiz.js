import React, { useState } from 'react'
import { useRouter } from 'next/router';

import Widget from '../src/Components/Widget';
import QuizBackground from '../src/Components/Quiz/QuizBackground';
import QuizContainer from '../src/Components/Quiz/QuizContainer';

import db from '../db.json'
import QuizButton from '../src/Components/Quiz/QuizButton';
import AlternativesForm from '../src/Components/AlternativeForm';

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

function ResultsWidget({ results }) {
    const totalHits = results.reduce((totalSum, resultActual) => {
        const isCorrect = resultActual === true;

        if (isCorrect) {
            return totalSum + 1;
        }

        return totalSum;
    }, 0);

    return (
        <>
            <Widget>
                <Widget.Header>
                    Resultado!
                </Widget.Header>
                <Widget.Content>
                    <p>Você acertou {totalHits} perguntas</p>
                    <ul>
                        {
                            results.map((result, index) => {
                                const numberQuestion = index + 1;

                                let formatNumberQuestion = numberQuestion;

                                if (numberQuestion < 10) {
                                    formatNumberQuestion = `0${formatNumberQuestion}`;
                                }

                                return (
                                    <li>
                                        Questão {formatNumberQuestion}: {result ? "Acertou" : "Errou"}
                                    </li>
                                )
                            })
                        }
                    </ul>
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
    addResult
}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState();
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

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

                <AlternativesForm
                    onSubmit={(infosDoEvento) => {
                        infosDoEvento.preventDefault();
                        setIsQuestionSubmited(true);

                        setTimeout(() => {
                            addResult(isCorrect);
                            setIsQuestionSubmited(false);
                            onSubmit();
                            setSelectedAlternative(undefined);
                        }, 3 * 1000)
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative === alternativeIndex;

                        return (
                            <Widget.Topic
                                key={alternativeId}
                                as="label"
                                htmlFor={alternativeId}
                                data-selected={isSelected}
                                data-status={isQuestionSubmited && alternativeStatus}
                            >
                                <input
                                    // style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    type="radio"
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    <QuizButton
                        disabled={!hasAlternativeSelected}
                        type="submit">
                        Confirmar
                    </QuizButton>
                    {isQuestionSubmited && isCorrect && <p>Você Acertou!!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você Errou!!</p>}
                </AlternativesForm>
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
    const [results, setResults] = React.useState([]);
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

    function addResult(result) {
        setResults([...results, result]);
    }

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
                        addResult={addResult}
                    />
                )}

                {screenState === screenStates.LOADING && <LoadingWidget />}

                {screenState === screenStates.RESULT && <ResultsWidget results={results} />}
            </QuizContainer>
        </QuizBackground>
    )
}

export default Quiz;