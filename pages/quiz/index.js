import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'

import Widget from '../../src/Components/Widget';
import QuizBackground from '../../src/Components/Quiz/QuizBackground';
import QuizContainer from '../../src/Components/Quiz/QuizContainer';

import db from '../../db.json'
import confetti from '../../src/Assets/confetti.json'
import { QuizButtonBase } from '../../src/Components/Quiz/QuizButton';
import QuizButton from '../../src/Components/Quiz/QuizButton';
import AlternativesForm from '../../src/Components/AlternativeForm';
import BackLinkArrow from '../../src/Components/BackLinkArrow'
import styled from 'styled-components';
import Lottie from '../../src/Components/Lottie';
import WidgetLoading from '../../src/Components/Widget/WidgetLoading';
import Modal from '../../src/Components/Modal';
import PlayerHistory from '../../src/Util/PlayerHistory';

const AnswerResultBase = styled.div`
    flex-direction:row;
    display:flex;
    align-items:center;
    justify-content:center;
    margin: 20px 20px 0 20px;
`;

const ResultsWidgetBase = styled.div`
    background-color: ${(({ correctAnswer, theme }) => correctAnswer ? theme.colors.success : theme.colors.wrong)};
`

const PlayerResult = styled.p`
    font-size: 17px;
`;

const axis = ["x", "y"];


function ResultsWidget({ results }) {
    const router = useRouter();

    const { playerName } = router.query;

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
                    <BackLinkArrow href="/" />{' '}Resultado!
                </Widget.Header>
                <Widget.Content>
                    <PlayerResult>{playerName}, Você acertou {totalHits} perguntas</PlayerResult>
                    <ul>
                        {
                            results.map((result, index) => {
                                const numberQuestion = index + 1;
                                const resultKey = `result___${index}`

                                let formatNumberQuestion = numberQuestion;

                                if (numberQuestion < 10) {
                                    formatNumberQuestion = `0${formatNumberQuestion}`;
                                }

                                const randomAxis = axis[Math.floor(Math.random() * axis.length)];

                                return (
                                    <motion.div
                                        key={resultKey}
                                        transition={{ delay: index * 0.5, duration: 0.5 }}
                                        variants={{
                                            show: { opacity: 1, [randomAxis]: 0 },
                                            hidden: { opacity: 0, [randomAxis]: '100%' }
                                        }}
                                        initial="hidden"
                                        animate="show">
                                        <ResultsWidgetBase
                                            as={Widget.Topic}
                                            correctAnswer={result}
                                        >
                                            <li>
                                                Questão {formatNumberQuestion}: {result ? "Acertou" : "Errou"}
                                            </li>
                                        </ResultsWidgetBase>
                                    </motion.div>
                                )
                            })
                        }
                    </ul>
                    <ResultsPercentageInformation totalHits={totalHits} totalQuestions={results.length} />
                    <PreviousResults />
                </Widget.Content>
            </Widget>

        </>
    );
}

function PreviousResults() {
    const [isModalShow, setIsModalShow] = useState(false);

    const PreviousResultsButton = styled(QuizButtonBase)`
        margin: 0;
        cursor:pointer;
        height:50px;
    `;

    const showModal = () => {
        setIsModalShow(true)
    }

    const closeModal = () => {
        setIsModalShow(false)
    }

    const WidgetPreviousResults = styled(Widget)`
        margin: 24px;   
        width: 40%;
        margin: 10px;  

        @media(max-width: 1212px){
            width: 100%;   
        }
    `;

    const Row = styled.div`
        display:flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        justify-content: space-between;

        h1{
            margin:0;
        }
    `;

    function PreviousResultsInformation({ performedDay, totalHits, percentage, totalQuestions }) {


        return (
            <>
                <Row>
                    <h1>
                        Realizado no dia:
                    </h1>
                    <label>
                        {performedDay}
                    </label>
                </Row>
                <Row>
                    <h1>
                        Total de Questões:
                    </h1>
                    <label>
                        {totalQuestions}
                    </label>
                </Row>
                <Row>
                    <h1>
                        Total acertos:
                    </h1>
                    <label>
                        {totalHits}
                    </label>
                </Row>
                <Row>
                    <h1>
                        Porcentagem:
                    </h1>
                    <label>
                        {percentage}%
                    </label>
                </Row>
            </>
        )
    }

    function ModalPreviousResult() {

        const playerHistory = PlayerHistory.getPlayerHistory();

        return (
            <Modal onClose={closeModal}>
                {
                    playerHistory.map((history, index) => (
                        <WidgetPreviousResults>
                            <Widget.Topic>
                                <PreviousResultsInformation
                                    key={`history___${index}`}
                                    performedDay={history.datePerformed}
                                    percentage={history.percentage}
                                    totalHits={history.totalHits}
                                    totalQuestions={history.totalQuestions}
                                />
                            </Widget.Topic>
                        </WidgetPreviousResults>
                    ))
                }
            </Modal>
        )
    }

    return (
        <>
            <PreviousResultsButton onClick={showModal}>
                Confira seus resultados anteriores
            </PreviousResultsButton>

            {isModalShow && <ModalPreviousResult />}
        </>
    )
}

function ResultsPercentageInformation({ totalQuestions, totalHits }) {
    const percentage = Math.floor((totalHits / totalQuestions) * 100);
    let resPercentInfo = { text: "", img: "" };

    PlayerHistory.setPlayerHistory(percentage, totalHits, totalQuestions);

    const Row = styled.div`
        display:flex;
        flex-direction:row;

        img{
            margin-right: 10px;
        }

        h1{
            margin:0;
        }
    `

    if (percentage == 100) {
        resPercentInfo = {
            text: "Parabéns! Você acertou todas as questões!!",
            img: "rocket.png"
        }
    }
    else if (percentage >= 50) {
        resPercentInfo = {
            text: "Parabéns! Você realmente conhece o mundo da F1!!",
            img: "champagne.png"
        }
    }
    else if (percentage >= 30 && percentage < 50) {
        resPercentInfo = {
            text: "Você se saiu bem :)",
            img: "confetti.png"
        };
    }
    else if (percentage >= 1 && percentage < 30) {
        resPercentInfo = {
            text: "Você não se saiu muito bem :(",
            img: "girl.png"
        }
    }
    else {
        resPercentInfo = {
            text: "Você errou todas :O",
            img: "anxiety.png"
        };
    }

    return (
        <Widget>
            <Widget.Topic style={{ cursor: "auto" }}>
                <Row>
                    <img width="40" src={resPercentInfo.img} /> <h1 >{resPercentInfo.text}</h1>
                </Row>
                <p>
                    A porcentagem de acertos foi: {percentage}%
                </p>
            </Widget.Topic>
        </Widget>
    )
}

function AnswerResult({ src }) {
    return (
        <AnswerResultBase>
            <img width="60" height="60" src={src} />
        </AnswerResultBase>
    )
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
                <BackLinkArrow href="/" />
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
                            setSelectedAlternative(undefined);
                            onSubmit();
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
                                as={motion.label}
                                whileHover={{ scale: 1.09 }}
                                htmlFor={alternativeId}
                                data-selected={isSelected}
                                data-status={isQuestionSubmited && alternativeStatus}
                            >
                                <input
                                    // style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    type="radio"
                                    checked={selectedAlternative === alternativeIndex}
                                    onChange={() => {
                                        if (!isQuestionSubmited) {
                                            setSelectedAlternative(alternativeIndex)
                                        }
                                    }}
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}
                    {!isQuestionSubmited && <QuizButton
                        disabled={!hasAlternativeSelected}
                        type="submit">
                        Confirmar
                    </QuizButton>}
                    {isQuestionSubmited && isCorrect && <AnswerResult src="/correct.png" />}
                    {isQuestionSubmited && !isCorrect && <AnswerResult src="/error.png" />}
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


function Quiz({ quizDatabase = db }) {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = quizDatabase.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = quizDatabase.questions[questionIndex];

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
        <>
            <QuizBackground backgroundImage={quizDatabase.bg}>
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

                    {screenState === screenStates.LOADING && <WidgetLoading />}

                    {screenState === screenStates.RESULT && <Results results={results} />}
                </QuizContainer>

            </QuizBackground>

        </>
    )
}

const ConfettiBase = styled.div`
    position: fixed;
    width: '100%';
    height: '100%';
    top: 0;
    left: 0;
    z-index: 15;
`;

function ConfettiDiv() {
    const [isFinishedAnimation, setIsFinishedAnimation] = useState(true);

    return (
        <>
            {isFinishedAnimation && (<ConfettiBase>
                <Lottie animation={confetti} autoplay={true} loop={false} onComplete={() => setIsFinishedAnimation(false)} />
            </ConfettiBase>)}
        </>
    )
}

function Results({ results }) {

    return (
        <>
            <motion.div
                transition={{ duration: 1 }}
                variants={{
                    show: { scale: 1 },
                    hidden: { scale: 0 }
                }}
                initial="hidden"
                animate="show">
                <ResultsWidget results={results} />
            </motion.div>

            <ConfettiDiv />
        </>
    )
}

export default Quiz;