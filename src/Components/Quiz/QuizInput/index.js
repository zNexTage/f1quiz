import styled from 'styled-components';
import PropTypes from 'prop-types'

const QuizInputBase = styled.input`
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

function QuizInput({ onChange, placeholder }) {
  return (
    <QuizInputBase
      onChange={onChange}
      placeholder={placeholder} />
  )
}

QuizInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};


export default QuizInput;