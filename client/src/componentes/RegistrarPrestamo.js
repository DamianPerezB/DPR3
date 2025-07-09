import React, { useState, useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import BotonAtras from "../elementos/BotonAtras";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  TitutuloSecciones,
  FormularioRegistro,
  FormularioRegistroSecciones,
  Input2,
  Select,
  ContenedorBoton,
} from "../elementos/ElementosDeFormulario";

// Estilos con styled-components
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

const CeldaEncabezado = styled.th`
  padding: 12px 15px;
`;

const FilaTabla = styled.tr``;

const CuerpoTabla = styled.tbody``;

const Celda = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const ContenedorBusqueda = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  justify-content: flex-end;
`;

const InputBusqueda = styled.input`
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const BotonAñadir = styled.button`
  padding: 6px 10px;
  background-color: #28a745;
  border: none;
  color: white;
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const RegistrarPrestamo = () => {
  const navigate = useNavigate();
  const [datosPrestamo, setDatosPrestamo] = useState({
    id: "",
    idAlumno: "",
    idEmpleado: "",
    fechaPrestamo: "",
    fechaDevolucion: "",
    uea: "",
    grupo: "",
    observaciones: "",
    tipoPrestamo: "",
  });

  const [materiales, setMateriales] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [carrito, setCarrito] = useState({}); // { idMaterial: cantidad }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosPrestamo({ ...datosPrestamo, [name]: value });
  };

  const obtenerMateriales = async () => {
    try {
      const res = await fetch("http://localhost:4000/materiales");
      const data = await res.json();
      setMateriales(data);
    } catch (error) {
      console.error("Error al obtener materiales:", error);
    }
  };

  useEffect(() => {
    obtenerMateriales();
  }, []);

  const añadirAlCarrito = (id, maxCantidad) => {
    if (!carrito[id] || carrito[id] < maxCantidad) {
      setCarrito({ ...carrito, [id]: (carrito[id] || 0) + 1 });
    }
  };

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad >= 0) {
      setCarrito({ ...carrito, [id]: cantidad });
    }
  };

  const validarDatos = async () => {
    const { id, idAlumno, idEmpleado, fechaPrestamo, fechaDevolucion } =
      datosPrestamo;

    if (!id || !idAlumno || !idEmpleado || !fechaPrestamo || !fechaDevolucion) {
      alert("Todos los campos son obligatorios.");
      return false;
    }

    if (new Date(fechaDevolucion) < new Date(fechaPrestamo)) {
      alert("La fecha de devolución no puede ser menor a la de inicio.");
      return false;
    }

    const resMatricula = await fetch(
      `http://localhost:4000/alumno/${idAlumno}`
    );
    if (resMatricula.status !== 200) {
      alert("La matrícula no existe.");
      return false;
    }

    const resEmpleado = await fetch(
      `http://localhost:4000/empleado/${idEmpleado}`
    );
    if (resEmpleado.status !== 200) {
      alert("El empleado no existe.");
      return false;
    }

    const resPrestamo = await fetch(`http://localhost:4000/prestamo/${id}`);
    if (resPrestamo.status === 200) {
      alert("El ID de préstamo ya existe.");
      return false;
    }

    for (let idMat in carrito) {
      const mat = materiales.find((m) => m.id === idMat);
      if (carrito[idMat] > mat.cantidad) {
        alert(`La cantidad del material ${idMat} excede el inventario.`);
        return false;
      }
    }

    return true;
  };

  const generarPrestamo = async () => {
    const esValido = await validarDatos();
    if (!esValido) return;

    if (Object.keys(carrito).length === 0) {
      alert("Debes añadir al menos un material al préstamo.");
      return;
    }

    const materialesPrestamo = Object.entries(carrito).map(
      ([idMaterial, cantidad]) => ({
        idMaterial,
        cantidad,
      })
    );

    try {
      const res = await fetch("http://localhost:4000/prestamo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...datosPrestamo,
          estadoPrestamo: 0,
          materiales: materialesPrestamo,
        }),
      });

      if (res.ok) {
        alert("Préstamo registrado exitosamente.");
        navigate("/inicio-empleado");
      } else {
        const errorData = await res.json();
        console.error("Error del backend:", errorData);
        alert("Error al registrar el préstamo.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("No se pudo registrar el préstamo.");
    }
  };

  const materialesFiltrados = materiales.filter((m) => {
    const termino = busqueda.toLowerCase();
    return (
      m.id.toLowerCase().includes(termino) ||
      m.nombrematerial.toLowerCase().includes(termino)
    );
  });

  return (
    <>
      <Helmet>
        <title>Registrar Préstamo</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>Registro de Préstamo</Titulo>
        </ContenedorHeader>
      </Header>
      <BotonAtras ruta="/prestamos" />
      <FormularioRegistro>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Préstamo</TitutuloSecciones>
          Matrícula
          <Input2
            type="text"
            name="idAlumno"
            value={datosPrestamo.idAlumno}
            onChange={handleInputChange}
          />
          Fecha inicio
          <Input2
            type="date"
            name="fechaPrestamo"
            value={datosPrestamo.fechaPrestamo}
            onChange={handleInputChange}
          />
          Fecha devolución
          <Input2
            type="date"
            name="fechaDevolucion"
            value={datosPrestamo.fechaDevolucion}
            onChange={handleInputChange}
          />
          ID préstamo
          <Input2
            type="text"
            name="id"
            value={datosPrestamo.id}
            onChange={handleInputChange}
          />
          ID empleado
          <Input2
            type="text"
            name="idEmpleado"
            value={datosPrestamo.idEmpleado}
            onChange={handleInputChange}
          />
          UEA
          <Input2
            type="text"
            name="uea"
            value={datosPrestamo.uea}
            onChange={handleInputChange}
          />
          Grupo
          <Input2
            type="text"
            name="grupo"
            value={datosPrestamo.grupo}
            onChange={handleInputChange}
          />
          Observación
          <Input2
            type="text"
            name="observaciones"
            value={datosPrestamo.observaciones}
            onChange={handleInputChange}
          />
          Tipo préstamo
          <Select
            name="tipoPrestamo"
            value={datosPrestamo.tipoPrestamo}
            onChange={handleInputChange}
          >
            <option value="">Seleccione</option>
            <option value="0">Interno</option>
            <option value="1">Externo</option>
          </Select>
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton as="button" primario onClick={generarPrestamo}>
            Generar Préstamo
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>

      <ContenedorBusqueda>
        <InputBusqueda
          type="text"
          placeholder="Buscar por ID o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </ContenedorBusqueda>

      <Tabla>
        <EncabezadoTabla>
          <FilaTabla>
            <CeldaEncabezado>ID</CeldaEncabezado>
            <CeldaEncabezado>Nombre</CeldaEncabezado>
            <CeldaEncabezado>Disponible</CeldaEncabezado>
            <CeldaEncabezado>Cantidad</CeldaEncabezado>
            <CeldaEncabezado>Acciones</CeldaEncabezado>
          </FilaTabla>
        </EncabezadoTabla>
        <CuerpoTabla>
          {materialesFiltrados.map((m) => (
            <FilaTabla key={m.id}>
              <Celda>{m.id}</Celda>
              <Celda>{m.nombrematerial}</Celda>
              <Celda>{m.cantidad}</Celda>
              <Celda>
                <input
                  type="number"
                  value={carrito[m.id] || 0}
                  min="0"
                  max={m.cantidad}
                  onChange={(e) =>
                    cambiarCantidad(m.id, parseInt(e.target.value))
                  }
                />
              </Celda>
              <Celda>
                <BotonAñadir onClick={() => añadirAlCarrito(m.id, m.cantidad)}>
                  Añadir
                </BotonAñadir>
              </Celda>
            </FilaTabla>
          ))}
        </CuerpoTabla>
      </Tabla>
    </>
  );
};

export default RegistrarPrestamo;
