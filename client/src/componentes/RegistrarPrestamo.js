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

const ModalFondo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ModalContenido = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
`;

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

const RegistrarPrestamo = () => {
  const navigate = useNavigate();
  const idEmpleado = localStorage.getItem("idUsuario");

  const [alumnos, setAlumnos] = useState([]);
  const [busquedaAlumno, setBusquedaAlumno] = useState("");
  const [materiales, setMateriales] = useState([]);
  const [busquedaMaterial, setBusquedaMaterial] = useState("");
  const [carrito, setCarrito] = useState({});
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);

  const [datosPrestamo, setDatosPrestamo] = useState({
    fechaPrestamo: "",
    fechaDevolucion: "",
    uea: "",
    grupo: "",
    observaciones: "",
    tipoPrestamo: "",
  });

  const [idAlumno, setIdAlumno] = useState("");
  const [idPrestamo, setIdPrestamo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resMateriales = await fetch("http://localhost:4000/materiales");
      const dataMateriales = await resMateriales.json();
      setMateriales(dataMateriales);

      const resAlumnos = await fetch("http://localhost:4000/alumnos");
      const dataAlumnos = await resAlumnos.json();
      setAlumnos(dataAlumnos);

      const resContador = await fetch(
        `http://localhost:4000/prestamo/contador/${idEmpleado}`
      );
      const { contador } = await resContador.json();
      const consecutivo = String(contador + 1).padStart(6, "0");
      setIdPrestamo(`LABPRES-${idEmpleado}-${consecutivo}`);

      const today = new Date().toISOString().split("T")[0];
      setDatosPrestamo((prev) => ({
        ...prev,
        fechaPrestamo: today,
      }));
    };
    fetchData();
  }, [idEmpleado]);

  useEffect(() => {
    if (datosPrestamo.tipoPrestamo === "0") {
      setDatosPrestamo((prev) => ({
        ...prev,
        fechaDevolucion: prev.fechaPrestamo,
      }));
    }
  }, [datosPrestamo.tipoPrestamo, datosPrestamo.fechaPrestamo]);

  const cambiarCantidad = (id, cantidad) => {
    const material = materiales.find((m) => m.id === id);
    if (isNaN(cantidad) || cantidad < 0 || !Number.isInteger(cantidad)) return;
    if (cantidad > material.cantidad) cantidad = material.cantidad;

    setCarrito({ ...carrito, [id]: cantidad });
  };

  const validarCampos = () => {
    if (
      !idAlumno ||
      !datosPrestamo.fechaPrestamo ||
      !datosPrestamo.fechaDevolucion ||
      !datosPrestamo.tipoPrestamo ||
      Object.keys(carrito).length === 0
    ) {
      alert("Todos los campos son obligatorios.");
      return false;
    }

    if (
      new Date(datosPrestamo.fechaDevolucion) <
      new Date(datosPrestamo.fechaPrestamo)
    ) {
      alert("La fecha de devolución no puede ser anterior a la de préstamo.");
      return false;
    }

    for (const [id, cantidad] of Object.entries(carrito)) {
      const material = materiales.find((m) => m.id === id);
      if (
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > material.cantidad
      ) {
        alert(
          `La cantidad para el material "${
            material?.nombrematerial || id
          }" debe ser al menos 1 y no mayor que la disponible (${
            material?.cantidad || 0
          }).`
        );
        return false;
      }
    }

    return true;
  };

  const generarVistaPrevia = () => {
    if (validarCampos()) setMostrarVistaPrevia(true);
  };

  const confirmarPrestamo = async () => {
    const materialesPrestamo = Object.entries(carrito).map(
      ([idMaterial, cantidad]) => ({ idMaterial, cantidad })
    );

    try {
      const res = await fetch("http://localhost:4000/prestamo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: idPrestamo,
          idAlumno,
          idEmpleado,
          estadoPrestamo: 0,
          ...datosPrestamo,
          materiales: materialesPrestamo,
        }),
      });

      if (res.ok) {
        setMostrarVistaPrevia(false);
        const alumno = alumnos.find((a) => a.id === idAlumno);
        const materialesTexto = materialesPrestamo
          .map(({ idMaterial, cantidad }) => {
            const mat = materiales.find((m) => m.id === idMaterial);
            const nombre = mat?.nombrematerial || "Desconocido";
            return `• ${nombre} (ID: ${idMaterial}): ${cantidad} ${
              cantidad === 1 ? "unidad" : "unidades"
            }`;
          })
          .join("\n");

        alert(
          `Préstamo registrado exitosamente\n\n` +
            `Matrícula: ${alumno?.matricula}\n` +
            `Fecha de inicio: ${datosPrestamo.fechaPrestamo}\n` +
            `Fecha de devolución: ${datosPrestamo.fechaDevolucion}\n\n` +
            `Materiales prestados:\n${materialesTexto}`
        );

        setIdAlumno("");
        setDatosPrestamo((prev) => ({
          ...prev,
          fechaPrestamo: new Date().toISOString().split("T")[0],
          fechaDevolucion: "",
          uea: "",
          grupo: "",
          observaciones: "",
          tipoPrestamo: "",
        }));
        setCarrito({});
        navigate("/prestamos");
      } else {
        const error = await res.json();
        alert("Error al registrar préstamo: " + error.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error de red al registrar el préstamo.");
    }
  };

  const alumnosFiltrados = alumnos
    .filter((a) => {
      const filtro = busquedaAlumno.toLowerCase();
      return (
        a.matricula.toLowerCase().includes(filtro) ||
        a.nombre.toLowerCase().includes(filtro) ||
        a.apellidopaterno.toLowerCase().includes(filtro) ||
        a.apellidomaterno.toLowerCase().includes(filtro)
      );
    })
    .slice(0, 3);

  // Filtramos materiales para que solo aparezcan con cantidad > 0 y que coincidan con la búsqueda
  const materialesFiltrados = materiales
    .filter(
      (m) =>
        m.cantidad > 0 &&
        (m.id.toLowerCase().includes(busquedaMaterial.toLowerCase()) ||
          m.nombrematerial.toLowerCase().includes(busquedaMaterial.toLowerCase()))
    );

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
          Buscar Matrícula
          <InputBusqueda
            type="text"
            value={busquedaAlumno}
            onChange={(e) => {
              setBusquedaAlumno(e.target.value);
              setIdAlumno("");
            }}
            placeholder="Buscar por matrícula, nombre o apellido"
          />
          {busquedaAlumno && !idAlumno && (
            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "5px",
                maxHeight: "150px",
                overflowY: "auto",
                marginBottom: "1rem",
              }}
            >
              {alumnosFiltrados.map((a) => (
                <div
                  key={a.id}
                  onClick={() => {
                    setIdAlumno(a.id);
                    setBusquedaAlumno(
                      `${a.matricula} - ${a.nombre} ${a.apellidopaterno}`
                    );
                  }}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {a.matricula} - {a.nombre} {a.apellidopaterno} {a.apellidomaterno}
                </div>
              ))}
            </div>
          )}
          {idAlumno && (
            <div style={{ marginBottom: "1rem" }}>
              <strong>Alumno seleccionado:</strong>{" "}
              {alumnos.find((a) => a.id === idAlumno)?.nombre}{" "}
              {alumnos.find((a) => a.id === idAlumno)?.apellidopaterno}
              <button
                onClick={() => {
                  setIdAlumno("");
                  setBusquedaAlumno("");
                }}
                style={{
                  marginLeft: "10px",
                  padding: "2px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Cambiar
              </button>
            </div>
          )}
          Fecha inicio
          <Input2
            type="date"
            name="fechaPrestamo"
            value={datosPrestamo.fechaPrestamo}
            disabled
          />
          Fecha devolución
          <Input2
            type="date"
            name="fechaDevolucion"
            value={datosPrestamo.fechaDevolucion}
            onChange={(e) =>
              setDatosPrestamo({
                ...datosPrestamo,
                fechaDevolucion: e.target.value,
              })
            }
            disabled={datosPrestamo.tipoPrestamo === "0"}
          />
          No. Económico
          <Input2 type="text" value={idEmpleado} disabled />
          ID Préstamo
          <Input2 type="text" value={idPrestamo} disabled />
          UEA
          <Input2
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="uea"
            value={datosPrestamo.uea}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setDatosPrestamo({ ...datosPrestamo, uea: value });
              }
            }}
          />
          Grupo
          <Input2
            type="text"
            name="grupo"
            value={datosPrestamo.grupo}
            onChange={(e) =>
              setDatosPrestamo({ ...datosPrestamo, grupo: e.target.value })
            }
          />
          Observaciones
          <Input2
            type="text"
            name="observaciones"
            value={datosPrestamo.observaciones}
            onChange={(e) =>
              setDatosPrestamo({
                ...datosPrestamo,
                observaciones: e.target.value,
              })
            }
          />
          Tipo de Préstamo
          <Select
            name="tipoPrestamo"
            value={datosPrestamo.tipoPrestamo}
            onChange={(e) =>
              setDatosPrestamo({
                ...datosPrestamo,
                tipoPrestamo: e.target.value,
              })
            }
          >
            <option value="">Seleccione</option>
            <option value="0">Interno</option>
            <option value="1">Externo</option>
          </Select>
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton
            as="button"
            primario
            onClick={(e) => {
              e.preventDefault();
              generarVistaPrevia();
            }}
          >
            Generar Préstamo
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>

      <ContenedorBusqueda>
        <InputBusqueda
          type="text"
          placeholder="Buscar material por ID o nombre"
          value={busquedaMaterial}
          onChange={(e) => setBusquedaMaterial(e.target.value)}
        />
      </ContenedorBusqueda>

      <Tabla>
        <EncabezadoTabla>
          <FilaTabla>
            <CeldaEncabezado>ID</CeldaEncabezado>
            <CeldaEncabezado>Nombre</CeldaEncabezado>
            <CeldaEncabezado>Disponible</CeldaEncabezado>
            <CeldaEncabezado>Cantidad</CeldaEncabezado>
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
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={carrito[m.id] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      cambiarCantidad(m.id, parseInt(value || "0"));
                    }
                  }}
                  disabled={m.cantidad === 0}
                  style={{
                    width: "80px",
                    textAlign: "center",
                    backgroundColor: m.cantidad === 0 ? "#f0f0f0" : "white",
                  }}
                />
              </Celda>
            </FilaTabla>
          ))}
        </CuerpoTabla>
      </Tabla>

      {mostrarVistaPrevia && (
        <ModalFondo>
          <ModalContenido>
            <h3>Confirmar Préstamo</h3>
            <p>
              <strong>Matrícula:</strong>{" "}
              {alumnos.find((a) => a.id === idAlumno)?.matricula}
            </p>
            <p>
              <strong>Fecha inicio:</strong> {datosPrestamo.fechaPrestamo}
            </p>
            <p>
              <strong>Fecha devolución:</strong> {datosPrestamo.fechaDevolucion}
            </p>
            <p>
              <strong>Materiales:</strong>
              <ul>
                {Object.entries(carrito).map(([idMat, cantidad]) => {
                  const mat = materiales.find((m) => m.id === idMat);
                  return (
                    <li key={idMat}>
                      {mat?.nombrematerial || "Desconocido"} (ID: {idMat}) –{" "}
                      {cantidad}
                    </li>
                  );
                })}
              </ul>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <Boton as="button" onClick={() => setMostrarVistaPrevia(false)}>
                Cancelar
              </Boton>
              <Boton
                as="button"
                primario
                onClick={(e) => {
                  e.preventDefault();
                  confirmarPrestamo();
                }}
              >
                Confirmar
              </Boton>
            </div>
          </ModalContenido>
        </ModalFondo>
      )}
    </>
  );
};

export default RegistrarPrestamo;