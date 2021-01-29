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

  let whileHover = {};
  let cursor = "not-allowed"

  if (!disabled) {
    whileHover = {
      scale: 1.1,
      transition: { duration: 1 },
    }

    cursor = "pointer";
  }

  return (
    <QuizButtonBase
      as={motion.button}
      whileHover={whileHover}
      whileTap={{ scale: 1 }}
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


export default QuizButton;