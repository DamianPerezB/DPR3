import styled from 'styled-components';

const Header = styled.div`
    width: 100%;
    padding: 2.5rem; /* 40px */
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 60rem){ /* 950px */
        justify-content: start;
    }
`;
 
const Titulo = styled.h1`
    font-weight: normal;

    font-size: 2.5rem; /* 40px */
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 2rem; /* 32px */
    }
`;
const Subtitulo = styled.h1`
    font-weight: normal;

    font-size: 1.5rem; /* 40px */
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 1rem; /* 32px */
    }
`;
 
const ContenedorHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
 
    @media(max-width: 60rem){ /* 950px */
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
 
        & > div {
            display: flex;
            margin-bottom: 1.25rem; /* 20px */
            justify-content: end;
        }
    }
`;
 
const ContenedorBotones = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Parrafo = styled.p`
    font-weight: normal;

    font-size: .95rem; /* 40px */
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 2rem; /* 32px */
    }
`;

const Footer = styled.footer`
margin-top: 3%;
width:100%;
height: 100%;
background: rgb(0,0,0);
`;

const A = styled.a`
margin:11.6%; 
width:10%;
height: 100%; 
`;

const IMG = styled.img` 
width:10%;
height: 100%; 
`;


export {Header, Titulo, ContenedorHeader, ContenedorBotones, Parrafo, Subtitulo, Footer, A, IMG};