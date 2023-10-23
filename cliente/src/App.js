import React, { useState, useEffect } from 'react';

function App() {
  const [vehiculos, setVehiculos] = useState([]);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({ nombre: '', modelo: '', fabricante: '', pais: '' });
  const [vehiculoEditado, setVehiculoEditado] = useState(null);

  const cargarVehiculos = () => {
    fetch('http://localhost:5000/vehiculos')
      .then((response) => response.json())
      .then((data) => setVehiculos(data));
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const agregarVehiculo = () => {
    fetch('http://localhost:5000/vehiculos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoVehiculo),
    })
      .then((response) => response.json())
      .then(() => {
        cargarVehiculos();
        setNuevoVehiculo({ nombre: '', modelo: '', fabricante: '', pais: '' });
      });
  };

  const eliminarVehiculo = (id) => {
    fetch(`http://localhost:5000/vehiculos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        cargarVehiculos();
      });
  };

  const editarVehiculo = (vehiculo) => {
    setVehiculoEditado(vehiculo);
  };

  const actualizarVehiculo = () => {
    fetch(`http://localhost:5000/vehiculos/${vehiculoEditado.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehiculoEditado),
    })
      .then(() => {
        cargarVehiculos();
        setVehiculoEditado(null);
      });
  };

  return (
    <div style={{ backgroundImage: `url('/conce.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', maxWidth: '800px', width: '100%' }}>
        <h1>Concesionario</h1>
        <h2>Agregar Nuevo Vehículo</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoVehiculo.nombre}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={nuevoVehiculo.modelo}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, modelo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Fabricante"
          value={nuevoVehiculo.fabricante}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, fabricante: e.target.value })}
        />
        <input
          type="text"
          placeholder="País"
          value={nuevoVehiculo.pais}
          onChange={(e) => setNuevoVehiculo({ ...nuevoVehiculo, pais: e.target.value })}
        />
        <button onClick={agregarVehiculo}>Agregar</button>

        {vehiculoEditado ? (
          <div>
            <h2>Editar Vehículo</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={vehiculoEditado.nombre}
              onChange={(e) => setVehiculoEditado({ ...vehiculoEditado, nombre: e.target.value })}
            />
            <input
              type="text"
              placeholder="Modelo"
              value={vehiculoEditado.modelo}
              onChange={(e) => setVehiculoEditado({ ...vehiculoEditado, modelo: e.target.value })}
            />
            <input
              type="text"
              placeholder="Fabricante"
              value={vehiculoEditado.fabricante}
              onChange={(e) => setVehiculoEditado({ ...vehiculoEditado, fabricante: e.target.value })}
            />
            <input
              type="text"
              placeholder="País"
              value={vehiculoEditado.pais}
              onChange={(e) => setVehiculoEditado({ ...vehiculoEditado, pais: e.target.value })}
            />
            <button onClick={actualizarVehiculo}>Actualizar</button>
            <button onClick={() => setVehiculoEditado(null)}>Cancelar</button>
          </div>
        ) : null}

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>Fabricante</th>
              <th>País</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id}>
                <td style={{ textAlign: 'center' }}>{vehiculo.nombre}</td>
                <td style={{ textAlign: 'center' }}>{vehiculo.modelo}</td>
                <td style={{ textAlign: 'center' }}>{vehiculo.fabricante}</td>
                <td style={{ textAlign: 'center' }}>{vehiculo.pais}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => editarVehiculo(vehiculo)}>Editar</button>
                  <button onClick={() => eliminarVehiculo(vehiculo.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
