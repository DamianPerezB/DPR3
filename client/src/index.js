import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Contenedor from "./elementos/Contenedor";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import IniciarSesion from "./componentes/InicioSesion";
import RegistroUsuarios from "./componentes/RegistroUsuarios";
import MostrarUsuarios from "./componentes/MostrarUsuarios";
import EliminarUsuarios from "./componentes/EliminarUsuarios";

import RegistrarAlumno from "./componentes/RegistrarAlumno";
import MostrarAlumno from "./componentes/MostrarAlumnos";
import EliminarAlumno from "./componentes/EliminarAlumno";
import EditarAlumno from "./componentes/EditarAlumno";

import RegistrarEmpleado from "./componentes/RegistrarEmpleado";
import MostrarEmpleado from "./componentes/MostrarEmpleado";
import EliminarEmpleado from "./componentes/EliminarEmpleado";
import EditarEmpleado from "./componentes/EditarEmpleado";

import HomeAlumno from "./componentes/HomeAlumno";
import HomeCoordinador from "./componentes/HomeCoordinador";

import MaterialesDisponibles from "./componentes/MaterialesDisponibles";
import RegistrarMaterial from "./componentes/RegistrarMaterial";
import MostrarMateriales from "./componentes/MostrarMateriales";
import EliminarMaterial from "./componentes/EliminarMaterial";
import EditarMaterial from "./componentes/EditarMaterial";

import Prestamos from "./componentes/Prestamos";
import RegistrarPrestamo from "./componentes/RegistrarPrestamo";
import MostrarPrestamo from "./componentes/MostrarPrestamo";
import MostrarPrestamosActivos from "./componentes/MostrarPrestamosActivos";
import MostrarPrestamoAlumno from "./componentes/MostrarPrestamoAlumno";
import FinalizarPrestamo from "./componentes/FinalizarPrestamo";

import Historico from "./componentes/Historico";
import HistoricoAlumno from "./componentes/HistoricoAlumno";
import Reportes from "./componentes/Reportes";
import RegistrarReporte from "./componentes/RegistrarReporte";

import Titulos from "./elementos/Titulos";
import Permisos from "./componentes/Permisos";
import EditarPermiso from "./componentes/EditarPermiso";

import MostrarMaterialesA from "./componentes/MostrarMaterialesA";
import MostrarMaterialA from "./componentes/MostrarMaterialA";

import MostrarAlumnosPass from "./componentes/MostrarAlumnosPass";
import EditarPass from "./componentes/EditarPass";

import Perfil from "./componentes/Perfil";
import PerfilAlumno from "./componentes/PerfilAlumno";
import Usuarios from "./componentes/GestionUsuarios";

import { Footer, A, IMG } from "./elementos/Header";
import Juno from "./imagenes/Juno.png";
import Cuajimalpa from "./imagenes/Cuajimalpa.png";
import DCNI from "./imagenes/DCNI.png";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Plataforma UAM Cuajimalpa</title>
      </Helmet>
      <Titulos />
      <BrowserRouter>
        <Contenedor>
          <Routes>
            <Route path="/login" element={<IniciarSesion />} />
            <Route path="/" element={<IniciarSesion />} />

            <Route path="/registro-usuarios" element={<RegistroUsuarios />} />
            <Route path="/mostrar-usuarios" element={<MostrarUsuarios />} />
            <Route path="/eliminar-usuarios" element={<EliminarUsuarios />} />
            <Route path="/registro-alumno" element={<RegistrarAlumno />} />
            <Route path="/mostrar-alumnos" element={<MostrarAlumno />} />
            <Route path="/eliminar-alumno" element={<EliminarAlumno />} />
            <Route path="/editar-alumno/:id" element={<EditarAlumno />} />
            <Route path="/registro-empleado" element={<RegistrarEmpleado />} />
            <Route path="/mostrar-empleados" element={<MostrarEmpleado />} />
            <Route path="/eliminar-empleado" element={<EliminarEmpleado />} />
            <Route path="/editar-empleado/:id" element={<EditarEmpleado />} />
            <Route path="/inicio-alumno" element={<HomeAlumno />} />
            <Route path="/inicio-empleado" element={<HomeCoordinador />} />
            <Route path="/materiales" element={<MaterialesDisponibles />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/historico-alumno" element={<HistoricoAlumno />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/permisos" element={<Permisos />} />
            <Route path="/editar-permiso/:id" element={<EditarPermiso />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/perfil-alumno" element={<PerfilAlumno />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/prestamos" element={<Prestamos />} />
            <Route path="/registro-prestamo" element={<RegistrarPrestamo />} />
            <Route
              path="/mostrar-prestamos-activos"
              element={<MostrarPrestamosActivos />}
            />
            <Route
              path="/mostrar-prestamo-alumno/:id"
              element={<MostrarPrestamoAlumno />}
            />
            <Route path="/mostrar-prestamo/:id" element={<MostrarPrestamo />} />
            <Route
              path="/finalizar-prestamo/:id"
              element={<FinalizarPrestamo />}
            />
            <Route path="/registro-material" element={<RegistrarMaterial />} />
            <Route path="/mostrar-materiales" element={<MostrarMateriales />} />
            <Route path="/eliminar-material" element={<EliminarMaterial />} />
            <Route path="/editar-material/:id" element={<EditarMaterial />} />
            <Route path="/registro-reporte" element={<RegistrarReporte />} />
            <Route
              path="/mostrar-materiales-a"
              element={<MostrarMaterialesA />}
            />
            <Route
              path="/mostrar-material-a/:id"
              element={<MostrarMaterialA />}
            />
            <Route
              path="/mostrar-alumnos-pass"
              element={<MostrarAlumnosPass />}
            />
            <Route path="/editar-pass/:id" element={<EditarPass />} />
            <Route path="/" element={<App />} />
          </Routes>
        </Contenedor>
      </BrowserRouter>
      <Footer>
        <A
          href="https://www.cua.uam.mx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IMG src={Cuajimalpa} alt="UAMC" />
        </A>

        <A
          href="https://juno.uam.mx:8443/sae/cua/aewbf001.omuestraframes?mod=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IMG src={Juno} alt="ModuloEscolar" />
        </A>

        <A
          href="https://dcni.cua.uam.mx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IMG src={DCNI} alt="DCNI" />
        </A>
      </Footer>
    </>
  </React.StrictMode>
);
