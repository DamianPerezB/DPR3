import React from 'react';
import styled from 'styled-components';
import BotonAtrasImg from '../imagenes/botonAtras.png';  
import { useNavigate } from 'react-router-dom';

const BotonAtrasStylo = styled.button`
    display: block;
    width: 10%; 
    height: 10%; 
    text-align: center;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.31rem; /* 5px */
    cursor: pointer;
    position: relative;
    z-index: 10;
    background: rgb(255,255,255);
    @media (max-width: 60rem) { /* 950px */
        width: 2.5rem; /* 40px */
        height: 2.5rem; /* 40px */
    }
`;

const BotonAtras = ({ ruta = '/' }) => {
    const navigate = useNavigate();

    return (
        <BotonAtrasStylo onClick={() => navigate(ruta)}>
            <img src={BotonAtrasImg} alt="Botón Atrás" width="80%" height="auto" /> 
        </BotonAtrasStylo>
    );
}

export default BotonAtras;