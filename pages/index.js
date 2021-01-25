import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/Components/Widget'
import Footer from '../src/Components/Footer'
import GitHubCorner from '../src/Components/GitHubCorner'
import QuizBackground from '../src/Components/QuizBackground'

/*const Title = styled.h1`
  font-size: 50px;  
  color: ${({ theme }) => theme.colors.secondary};
` */

/*function Title({children}){
  return (<h1>{children}</h1>)
}*/


/*const Background = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size:cover;
  background-position:center;
`;*/

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;


export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>Formula 1</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://google.com" />
    </QuizBackground>
  )
}
