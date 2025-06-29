import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Titulo, ContenedorHeader } from '../elementos/Header'; 
import Boton from '../elementos/Boton';
import { TitutuloSecciones, FormularioRegistroSecciones, Input2, ContenedorBoton, FormularioRegistro } from '../elementos/ElementosDeFormulario'
import imagen1 from '../imagenes/motasPantera4.png';

const ImagenMotas = styled.img`
    position: absolute;
    top: 12%;
    left: 76%;
    width: 24%;
    height: 80%;
    z-index: -1;
    @media (max-width: 768px) {
        margin-left: 0;
        width: 24%;
        height: 80%;
        left: 76%;
    }
`;

const PerfilAlumno = () => {
    const navigate = useNavigate();
    const [alumno, setAlumno] = useState(null);
    const alumnoId = 2153034522;

    useEffect(() => {
        fetch(`http://localhost:4000/alumno/${alumnoId}`)
            .then(response => response.json())
            .then(data => setAlumno(data))
            .catch(error => console.error('Error al obtener alumno:', error));
    }, [alumnoId]);

    return (
        <>
            <Helmet>
                <title>Perfil Alumno</title>
            </Helmet>

            <Header>
                <ContenedorHeader>
                    <Titulo>Perfil del Alumno</Titulo>
                </ContenedorHeader>
            </Header>

            <ImagenMotas src={imagen1} alt="MotasUam" />

            <FormularioRegistro>
                <FormularioRegistroSecciones>
                    <TitutuloSecciones>Datos del Alumno</TitutuloSecciones>
                    
                    {alumno ? (
                        <>
                            Nombre completo:
                            <Input2 value={`${alumno.nombre} ${alumno.apellidopaterno} ${alumno.apellidomaterno}`} disabled />

                            Matrícula:
                            <Input2 value={alumno.matricula} disabled />

                            Correo institucional:
                            <Input2 value={alumno.correoinstitucional} disabled />

                            Unidad:
                            <Input2 value={alumno.unidad} disabled />

                            División:
                            <Input2 value={alumno.división} disabled />

                            Licenciatura:
                            <Input2 value={alumno.licenciatura} disabled />

                            Estado:
                            <Input2 value={alumno.estado} disabled />

                            Sanción:
                            <Input2 value={alumno.sancion} disabled />

                            Observaciones:
                            <Input2 value={alumno.observaciones || 'Ninguna'} disabled />
                        </>
                    ) : (
                        <p>Cargando datos...</p>
                    )}
                </FormularioRegistroSecciones>

                <ContenedorBoton>
                    <Boton as="button" primario type="button" onClick={() => navigate("/inicio-alumno")}>
                        Regresar al Menú
                    </Boton>
                </ContenedorBoton>
            </FormularioRegistro>
        </>
    );
};

export default PerfilAlumno;