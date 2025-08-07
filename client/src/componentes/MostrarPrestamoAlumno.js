import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import {
  TitutuloSecciones,
  FormularioRegistroSecciones,
  Input2,
  FormularioRegistro,
} from "../elementos/ElementosDeFormulario";
import Boton from "../elementos/Boton";
import BotonAtras from "../elementos/BotonAtras";

const TablaMateriales = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.6rem 0.8rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  th {
    background-color: #f5f5f5;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const MostrarPrestamo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prestamo, setPrestamo] = useState(null);
  const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    const idUsuario = localStorage.getItem("idUsuario");
    const tipoUsuario = localStorage.getItem("tipoUsuario");

    if (!idUsuario || tipoUsuario !== "alumno") {
      navigate("/");
      return;
    }

    const fetchPrestamo = async () => {
      try {
        const res = await fetch(`http://localhost:4000/prestamo/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el préstamo.");
        const data = await res.json();
        setPrestamo(data);
        setMateriales(data.materiales || []);
      } catch (err) {
        console.error(err);
        alert("Error al obtener el préstamo.");
      }
    };

    fetchPrestamo();
  }, [id, navigate]);

  const traducirTipo = (tipo) => {
    return tipo === 0 ? "Interno" : tipo === 1 ? "Externo" : "Desconocido";
  };

  return (
    <>
      <Helmet>
        <title>Finalizar Préstamo</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Finalizar Préstamo</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/historico-alumno" />

      {prestamo ? (
        <FormularioRegistro>
          <FormularioRegistroSecciones>
            <TitutuloSecciones>Datos del Préstamo</TitutuloSecciones>
            <Input2 value={`ID: ${prestamo.id}`} disabled />
            <Input2 value={`Matrícula: ${prestamo.matriculaAlumno}`} disabled />
            <Input2 value={`Empleado: ${prestamo.numeroEconomico}`} disabled />
            <Input2
              value={`Fecha préstamo: ${new Date(
                prestamo.fechaPrestamo
              ).toLocaleDateString("es-MX")}`}
              disabled
            />
            <Input2
              value={`Fecha devolución: ${new Date(
                prestamo.fechaDevolucion
              ).toLocaleDateString("es-MX")}`}
              disabled
            />
            <Input2
              value={`Tipo: ${traducirTipo(prestamo.tipoPrestamo)}`}
              disabled
            />
            <Input2 value={`UEA: ${prestamo.uea}`} disabled />
            <Input2 value={`Grupo: ${prestamo.grupo}`} disabled />
            <Input2
              value={`Observaciones: ${prestamo.observaciones}`}
              disabled
            />
          </FormularioRegistroSecciones>

          <FormularioRegistroSecciones>
            <TitutuloSecciones>Materiales Prestados</TitutuloSecciones>
            <TablaMateriales>
              <thead>
                <tr>
                  <th>ID Material</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((mat, index) => (
                  <tr key={index}>
                    <td>{mat.idmaterial}</td>
                    <td>{mat.nombrematerial}</td>
                    <td>{mat.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </TablaMateriales>
          </FormularioRegistroSecciones>
        </FormularioRegistro>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Cargando préstamo...
        </p>
      )}
    </>
  );
};

export default MostrarPrestamo;
