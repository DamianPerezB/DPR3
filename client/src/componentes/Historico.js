import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BotonAtras from "../elementos/BotonAtras";

const Tabla = styled.table`
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const EncabezadoTabla = styled.thead`
  background-color: #5d9cec;
  color: white;
  text-align: center;
`;

const FilaTabla = styled.tr``;

const CeldaEncabezado = styled.th`
  padding: 12px 15px;
  text-align: center;
`;

const CuerpoTabla = styled.tbody``;

const Celda = styled.td`
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const CeldaEstado = styled.td`
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-weight: bold;
  color: ${(props) => props.color || "black"};
`;

const ContenedorBusqueda = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const InputBusqueda = styled.input`
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const SelectFiltro = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Boton = styled.button`
  padding: 8px 12px;
  background-color: ${(props) => (props.recibir ? "#d9534f" : "#5cb85c")};
  border: none;
  color: white;
  border-radius: 7px;
  cursor: pointer;
  margin: 0 3px;
  &:hover {
    background-color: ${(props) => (props.recibir ? "#c9302c" : "#4cae4c")};
  }
`;

const Historico = () => {
  const navigate = useNavigate();
  const [prestamos, setPrestamos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroColor, setFiltroColor] = useState("todos");
  const [prestamosFiltrados, setPrestamosFiltrados] = useState([]);

  const obtenerPrestamos = async () => {
    try {
      const response = await fetch("http://localhost:4000/prestamos");
      const data = await response.json();
      setPrestamos(data);
    } catch (error) {
      console.error("Error al obtener préstamos:", error);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("idUsuario");
    const tipo = localStorage.getItem("tipoUsuario");

    if (!id || tipo !== "empleado") {
      navigate("/");
      return;
    }
    obtenerPrestamos();
  }, []);

  useEffect(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const filtrados = prestamos.filter((p) => {
      const termino = busqueda.toLowerCase();
      const fechaDevolucion = p.fechadevolucion
        ? new Date(p.fechadevolucion)
        : null;

      let color = "black";
      if (p.estadoprestamo === 0 && fechaDevolucion && fechaDevolucion < hoy) {
        color = "red";
      } else if (p.estadoprestamo === 1) {
        color = "blue";
      } else if (
        p.estadoprestamo === 0 &&
        fechaDevolucion &&
        fechaDevolucion >= hoy
      ) {
        color = "green";
      }

      const coincideBusqueda =
        p.id.toLowerCase().includes(termino) ||
        p.alumno_matricula?.toLowerCase().includes(termino) ||
        p.empleado_nombre?.toLowerCase().includes(termino);

      const coincideColor =
        filtroColor === "todos" || filtroColor === color;

      return coincideBusqueda && coincideColor;
    });

    setPrestamosFiltrados(filtrados);
  }, [prestamos, busqueda, filtroColor]);

  const traducirTipoPrestamo = (tipo) => {
    return tipo === 0 ? "Interno" : tipo === 1 ? "Externo" : "Desconocido";
  };

  return (
    <>
      <Helmet>
        <title>Mostrar Préstamos</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Histórico</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/inicio-empleado" />

      <ContenedorBusqueda>
        <InputBusqueda
          type="text"
          placeholder="Buscar por ID, matrícula o empleado..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <SelectFiltro
          value={filtroColor}
          onChange={(e) => setFiltroColor(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="red">Vencidos</option>
          <option value="blue">Devueltos</option>
          <option value="green">Vigentes</option>
        </SelectFiltro>
      </ContenedorBusqueda>

      <Tabla>
        <EncabezadoTabla>
          <FilaTabla>
            <CeldaEncabezado>ID</CeldaEncabezado>
            <CeldaEncabezado>Matrícula</CeldaEncabezado>
            <CeldaEncabezado>Empleado</CeldaEncabezado>
            <CeldaEncabezado>Fecha Devolución</CeldaEncabezado>
            <CeldaEncabezado>Tipo de Préstamo</CeldaEncabezado>
            <CeldaEncabezado>Estado</CeldaEncabezado>
            <CeldaEncabezado>Opción</CeldaEncabezado>
          </FilaTabla>
        </EncabezadoTabla>

        <CuerpoTabla>
          {prestamosFiltrados.map((p) => {
            const fechaDevolucion = p.fechadevolucion
              ? new Date(p.fechadevolucion)
              : null;
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);

            let color = "black";
            if (p.estadoprestamo === 0 && fechaDevolucion && fechaDevolucion < hoy) {
              color = "red";
            } else if (p.estadoprestamo === 1) {
              color = "blue";
            } else if (p.estadoprestamo === 0 && fechaDevolucion && fechaDevolucion >= hoy) {
              color = "green";
            }

            return (
              <FilaTabla key={p.id}>
                <Celda>{p.id}</Celda>
                <Celda>{p.alumno_matricula}</Celda>
                <Celda>{p.empleado_nombre}</Celda>
                <CeldaEstado color={color}>
                  {fechaDevolucion
                    ? fechaDevolucion.toLocaleDateString("es-MX")
                    : "Sin fecha"}
                </CeldaEstado>
                <Celda>{traducirTipoPrestamo(p.tipoprestamo)}</Celda>
                <CeldaEstado color={color}>
                  {p.estadoprestamo === 0 ? "Prestado" : "Devuelto"}
                </CeldaEstado>
                <Celda>
                  <Boton onClick={() => navigate(`/mostrar-prestamo/${p.id}`)}>
                    Mostrar Más
                  </Boton>
                </Celda>
              </FilaTabla>
            );
          })}
        </CuerpoTabla>
      </Tabla>
    </>
  );
};

export default Historico;