import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/Components/Widget';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import QuizBackground from '../src/Components/Quiz/QuizBackground';
import QuizInput from '../src/Components/Quiz/QuizInput'
import QuizButton from '../src/Components/Quiz/QuizButton'
import QuizContainer from '../src/Components/Quiz/QuizContainer';
import Link from '../src/Components/Link';
import WidgetLoading from '../src/Components/Widget/WidgetLoading';

/* const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.secondary};
` */

/* function Title({children}){
  return (<h1>{children}</h1>)
} */

/* const Background = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size:cover;
  background-position:center;
`; */



const QuizForm = styled.form`
  margin-top: 20px;
`;

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  function PrincipalLayout() {
    const [playerName, setPlayerName] = useState("");

    const hasPlayerName = playerName.length > 0;

    const submitHandler = async (event) => {
      event.preventDefault();

      setIsLoading(true);
      await router.push(`/quiz?playerName=${playerName}`);
    }

    const inputHandler = (event) => {
      const { value } = event.target;

      setPlayerName(value);
    }

    return (
      <>
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { scale: 1 },
            hidden: { scale: 0 }
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Formula 1 - Quiz</h1>
          </Widget.Header>
          <Widget.Content>
            <label>
              Teste os seus conhecimentos sobre o incrível mundo da Formula 1
            </label>
            <QuizForm onSubmit={submitHandler}>
              <QuizInput
                onChange={inputHandler}
                placeholder="Diz ai o seu nome :)" />
              <QuizButton
                type="submit" disabled={!hasPlayerName}>
                Jogar
              </QuizButton>
            </QuizForm>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: .5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          initial="hidden"
          animate="show">
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <ul>
              {db.external.map((quizLinks, index) => {
                const quizHost = new URL(quizLinks).host;
                const [projectName, githubUser] = quizHost.split(".");

                const quizKey = `quiz__${index}`;

                return (
                  <li key={quizKey}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}>
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ delay: .5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          initial="hidden"
          animate="show"
        />
      </>
    )
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          F1 Quiz - Modelo Base
            </title>
      </Head>
      <QuizContainer>
        {!isLoading && <PrincipalLayout />}
        {isLoading && <WidgetLoading />}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/zNexTage/f1quiz" />
    </QuizBackground>
  );
}
