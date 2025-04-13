import styled from 'styled-components';
import theme from './../theme';

const ContenedorFiltros = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.87rem; /* 30px */
 
    @media(max-width: 60rem){ /* 950px */
        flex-direction: column;
 
        & > * {
            width: 100%;
            margin-bottom: 0.62rem; /* 10px */
        }
    }
`;
 
const Formulario = styled.form`
    padding: 0 2.5rem; /* 40px */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    input {
        width: 100%;
        text-align: center;
        padding: 2.5rem 0;
        font-family: 'Work Sans', sans-serif;
        &::placeholder {
            color: rgba(0,0,0,.2);
        }
    }
 
    @media(max-width: 60rem){ /* 950px */
        justify-content: start;
    }
`;
 
const Input = styled.input`
    font-size: 1.5rem; /* 40px */
   
    border: none;
    border-bottom: 2px solid ${theme.grisClaro};
    outline: none;
 
    @media(max-width: 60rem){ /* 950px */
        font-size: 2.2rem; /* 24px */
    }
`;
 
const InputGrande = styled(Input)`
    font-size: 4.37rem; /* 70px */
    font-weight: bold;
`;
 
const ContenedorBoton = styled.div`
    display: flex;
    justify-content: center;
    margin: 2.5rem 0;  /* 40px */
`;

const FormularioRegistro = styled.form`
  padding:5%;
  width:90%;
  margin-top: -5% ;
  
`;

const FormularioRegistroSecciones = styled.form`
  padding: 3%;
  width: 86%;
  border: 2px solid rgb(240, 130, 0); /* Corregido */
  border-radius: 10px;
  margin:2%
   z-index: 1; /* Asegura que esté por encima de la imagen */
    background-color: white; /* Asegura visibilidad clara */
    
`;
const Input2 = styled.input`
    padding: 1%;
    font-size: 16px;
    width: 100%; 
    margin:2%;
    @media(max-width: 60rem){ /* 950px */
        font-size: 1.2rem; /* 24px */
    }
`; 

const TituloTextbox = styled.p`
    
    font-size: 16px;

    @media(max-width: 60rem){ /* 950px */
        font-size: 1.2rem; /* 24px */
    }
`; 


const Input3 = styled.input`
    
    
    width: 10%; 
    margin: 1%;
    @media(max-width: 60rem){ /* 950px */
        font-size: 1.2rem; /* 24px */
    }
`; 
const Select = styled.select`
    padding: 1%;
    font-size: 16px;
    width: 100%;
    margin:2%;
    @media(max-width: 60rem){ /* 950px */
        font-size: 1.2rem; /* 24px */

    }
`; 

const TitutuloSecciones = styled.h3`
    text-align:center;
    font-size: 25px;
    font-weight: 700; /*BOLD*/
    letter-spacing: 2px; /* Espaciado entre letras */
    text-transform: uppercase; /* Mayúsculas */
    margin:1%;
    @media(max-width: 60rem){ /* 950px */
        font-size: 1.2rem; /* 24px */

    }
`; 


export {TituloTextbox,Input3,TitutuloSecciones,FormularioRegistroSecciones,Select, Input2,ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton,FormularioRegistro};