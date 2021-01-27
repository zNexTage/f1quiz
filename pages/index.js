import React, { useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router'

import db from '../db.json';
import Widget from '../src/Components/Widget';
import Footer from '../src/Components/Footer';
import GitHubCorner from '../src/Components/GitHubCorner';
import QuizBackground from '../src/Components/Quiz/QuizBackground';
import QuizInput from '../src/Components/Quiz/QuizInput'
import QuizButton from '../src/Components/Quiz/QuizButton'
import QuizContainer from '../src/Components/Quiz/QuizContainer';

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
`



export default function Home() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState("");

  const submitHandler = (event) => {
    router.push(`/quiz?playerName=${playerName}`);

    event.preventDefault();
  }

  const inputHandler = (event) => {
    const { value } = event.target;

    setPlayerName(value);
  }

  const hasPlayerName = playerName.length > 0;

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>
          F1 Quiz - Modelo Base
        </title>
      </Head>
      <QuizContainer>
        <Widget>
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
        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <label>Dá uma olhada nesses quizes incríveis que o pessoal da Imersão <del>Alguma coisa</del> fez:</label>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/zNexTage/f1quiz" />
    </QuizBackground>
  );
}
