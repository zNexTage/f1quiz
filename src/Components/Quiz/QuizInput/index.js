import styled from 'styled-components';

const QuizInput = styled.input`
  height: 35px;
  border-radius:6px;
  outline:none;
  background-color: ${({ theme }) => theme.colors.mainBg};
  color: #FFF;
  border: solid ${({ theme }) => theme.colors.primary} 1px;
  width: 100%;
  font-size: 18px;

  ::placeholder{
    color:white
  }
`;

export default QuizInput;