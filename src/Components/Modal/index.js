import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components';
import Widget from '../Widget';

const ModalContainer = styled.div`
    background-color: rgba(${({ theme }) => `${theme.colors.primaryRgb}, 0.8`});
    height: 100%;
    width:100%;
    position: fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index: 11;
`;

const ModalBody = styled.div`
    background-color:#FFF;
    width: 50%;
    height: 90%;
    border-radius: 10px;
    color: #000;

    @media(max-width: 1043px){
        width: 80%;
    }

    @media(max-width:650px){
        width: 100%;
        margin: 0 15px;
    }
`;

function Modal({ children }) {
    return (
        <ModalContainer
            as={motion.div}
            transition={{ duration: 0.5 }}
            variants={{
                show: { opacity: 1 },
                hidden: { opacity: 0 }
            }}
            initial="hidden"
            animate="show"
        >
            <ModalBody
                as={motion.div}
                transition={{ duration: 0.5, delay: 0.5 }}
                variants={{
                    show: { opacity: 1, x: '0' },
                    hidden: { opacity: 0, x: '100%' }
                }}
                initial="hidden"
                animate="show"
            >
                {
                    children
                }
            </ModalBody>

        </ModalContainer>
    )
}

export default Modal;