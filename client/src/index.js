import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Contenedor from './elementos/Contenedor';
import {Helmet} from 'react-helmet';
import { BrowserRouter, Route,  Routes  } from 'react-router-dom';
import IniciarSesion from './componentes/InicioSesion'
import RegistroUsuarios from './componentes/RegistroUsuarios'
import RegistrarAlumno from './componentes/RegistrarAlumno';
import RegistrarEmpleado from './componentes/RegistrarEmpleado';
import ContraseñaOlvidada from './componentes/ContraseñaOlvidada';
import RecuperaContraseña from './componentes/RecuperaContraseña';
import HomeAlumno from './componentes/HomeAlumno';
import HomeCoordinador from './componentes/HomeCoordinador';
import MaterialesDisponibles from './componentes/MaterialesDisponibles';
import Historico from './componentes/Historico';
import Reportes from './componentes/Reportes';
import Avisos from './componentes/Avisos'
import Titulos from './elementos/Titulos';
import Permisos from './componentes/Permisos'
import Perfil from './componentes/Perfil'
import Usuarios from './componentes/GestionUsuarios'
import {Footer, A, IMG} from './elementos/Header'
import imguam from './imagenes/variacion5Cua.png'
import Juno from './imagenes/Juno.png'
import Cuajimalpa from './imagenes/Cuajimalpa.png'
import DCNI from './imagenes/DCNI.png'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>

      <Helmet>
        <title>Plataforma UAM Cuajimalpa</title>
      </Helmet>
      <Titulos/>
      <BrowserRouter>
      <Contenedor>
        
        <Routes>
        <Route path='/login' element={<IniciarSesion/>} />
        <Route path='/' element={<App />} />

        <Route path='/registro-usuarios' element={<RegistroUsuarios/>} />
        <Route path='/registro-alumno' element={<RegistrarAlumno/>} />
        <Route path='/registro-empleado' element={<RegistrarEmpleado/>} />
        <Route path='/contraseña-olvidada' element={<ContraseñaOlvidada/>} />
        <Route path='/contraseña-recupera' element={<RecuperaContraseña/>} />
        <Route path='/inicio-alumno' element={<HomeAlumno/>} />
        <Route path='/inicio-empleado' element={<HomeCoordinador/>} />
        <Route path='/materiales' element={<MaterialesDisponibles/>} />
        <Route path='/historico' element={<Historico/>} />
        <Route path='/reportes' element={<Reportes/>} />
        <Route path='/avisos' element={<Avisos/>} />
        <Route path='/permisos' element={<Permisos/>} />
        <Route path='/perfil' element={<Perfil/>} />
        <Route path='/usuarios' element={<Usuarios/>} />
        
        
        
        </Routes>
        

       
        </Contenedor>

      </BrowserRouter>
      <Footer>
      <A href="https://www.cua.uam.mx/" target="_blank" rel="noopener noreferrer">
        <IMG src={Cuajimalpa} alt="UAMC" />
      </A>

      <A href="https://juno.uam.mx:8443/sae/cua/aewbf001.omuestraframes?mod=1" target="_blank" rel="noopener noreferrer">
        <IMG src={Juno} alt="ModuloEscolar" />
      </A>

      <A href="https://dcni.cua.uam.mx" target="_blank" rel="noopener noreferrer" >
        <IMG src={DCNI} alt="DCNI" />
      </A>
      </Footer>


      </>
      
  </React.StrictMode>
);
