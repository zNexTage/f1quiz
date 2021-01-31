import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styled from 'styled-components';

const ModalContainer = styled.div`
    background-color: rgba(${({ theme }) => `${theme.colors.primaryRgb}, 0.8`});
    height: 100%;
    width:100%;
    position: fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    top:0;
    left:0;
    z-index: 11;
`;

const ModalBody = styled.div`
    background-color:#FFF;
    width: 80%;
    max-height: 90%;
    border-radius: 10px;
    color: #000;
    overflow:auto;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    overflow-x: hidden;
    justify-content: space-between;

    @media(max-width: 1043px){
        width: 80%;
    }

    @media(max-width:650px){
        width: 100%;
        margin: 0 15px;
    }
`;

const CloseModal = styled.div`
    text-align:right;
    width:100%;
    display: flex;
    justify-content: flex-end;

    h1{
        margin:0;
        font-size: 30px;
        color:red;
        cursor:pointer;
    }
`

function Modal({ children, onClose }) {
    const modalControls = useAnimation()
    const modalBody = useAnimation()

    useEffect(() => {
        modalControls.start("show").then(() => {
            modalBody.start("show");
        })
    }, []);

    const closeModal = () => {
        modalBody.start("hidden").then(() => {
            modalControls.start("hidden");
            onClose();
        });
    }

    return (
        <ModalContainer
            onClick={closeModal}
            as={motion.div}
            transition={{ duration: 0.5 }}
            variants={{
                show: { opacity: 1 },
                hidden: { opacity: 0 }
            }}
            initial="hidden"
            animate={modalControls}
        >
            <ModalBody
                onClick={(e) => e.stopPropagation()}
                as={motion.div}
                transition={{ duration: 0.5, delay: 0.5 }}
                variants={{
                    show: { opacity: 1, x: '0' },
                    hidden: { opacity: 0, x: '100%' }
                }}
                initial="hidden"
                animate={modalBody}
            >
                <>
                    <CloseModal onClick={closeModal}>
                        <h1>X</h1>
                    </CloseModal>
                    {children}
                </>
            </ModalBody>

        </ModalContainer>
    )
}

export default Modal;