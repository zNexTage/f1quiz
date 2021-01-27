import styled from 'styled-components';
import PropTypes from 'prop-types';

const QuizButtonBase = styled.button`
  width: 100%;
  margin-top: 20px;
  height: 40px;
  border-radius: 6px;  
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.buttonBg};
  border:none;
  outline:none;
  color: ${({ theme }) => theme.colors.contrastText};
 
`;

function QuizButton({ disabled, type, children }) {
  console.log(children);
  return (
    <QuizButtonBase
      style={{ cursor: !disabled ? "pointer" : "not-allowed" }}
      type={type}
      disabled={disabled} >
      {children}
    </QuizButtonBase>
  )
}


QuizButton.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired
}


export default QuizButton;