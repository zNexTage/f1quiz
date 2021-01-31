import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion'

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
  const cursor = !disabled ? "pointer" : "not-allowed";

  return (
    <QuizButtonBase
      style={{ cursor }}
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

export { QuizButtonBase };

export default QuizButton;