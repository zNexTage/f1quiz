import styled from 'styled-components';

const QuizButton = styled.button`
  width: 100%;
  margin-top: 20px;
  height: 40px;
  border-radius: 6px;  
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.buttonBg};
  border:none;
  outline:none;
  color: ${({ theme }) => theme.colors.contrastText};

  :disabled{
    background-color:'red'
  }
`;

export default QuizButton;