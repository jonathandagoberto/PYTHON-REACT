from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuración de la base de datos MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/concesionario'

db = SQLAlchemy(app)

# Definir el modelo de datos para los vehículos
class Vehiculo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    modelo = db.Column(db.String(50), nullable=False)
    fabricante = db.Column(db.String(50), nullable=False)
    pais = db.Column(db.String(50), nullable=False)

# Ruta para obtener todos los vehículos (GET)
@app.route('/vehiculos', methods=['GET'])
def obtener_vehiculos():
    vehiculos = Vehiculo.query.all()
    vehiculos_json = [{'id': v.id, 'nombre': v.nombre, 'modelo': v.modelo, 'fabricante': v.fabricante, 'pais': v.pais} for v in vehiculos]
    return jsonify(vehiculos_json)

# Ruta para crear un nuevo vehículo (POST)
@app.route('/vehiculos', methods=['POST'])
def crear_vehiculo():
    data = request.get_json()
    nuevo_vehiculo = Vehiculo(nombre=data['nombre'], modelo=data['modelo'], fabricante=data['fabricante'], pais=data['pais'])
    db.session.add(nuevo_vehiculo)
    db.session.commit()
    return jsonify({'message': 'Vehículo creado con éxito'})

# Ruta para obtener un vehículo por ID (GET)
@app.route('/vehiculos/<int:vehiculo_id>', methods=['GET'])
def obtener_vehiculo(vehiculo_id):
    vehiculo = Vehiculo.query.get(vehiculo_id)
    if vehiculo is not None:
        vehiculo_json = {'id': vehiculo.id, 'nombre': vehiculo.nombre, 'modelo': vehiculo.modelo, 'fabricante': vehiculo.fabricante, 'pais': vehiculo.pais}
        return jsonify(vehiculo_json)
    return 'Vehículo no encontrado', 404

# Ruta para actualizar un vehículo por ID (PUT)
@app.route('/vehiculos/<int:vehiculo_id>', methods=['PUT'])
def actualizar_vehiculo(vehiculo_id):
    vehiculo = Vehiculo.query.get(vehiculo_id)
    if vehiculo is not None:
        data = request.get_json()
        vehiculo.nombre = data['nombre']
        vehiculo.modelo = data['modelo']
        vehiculo.fabricante = data['fabricante']
        vehiculo.pais = data['pais']
        db.session.commit()
        return jsonify({'message': 'Vehículo actualizado con éxito'})
    return 'Vehículo no encontrado', 404

# Ruta para eliminar un vehículo por ID (DELETE)
@app.route('/vehiculos/<int:vehiculo_id>', methods=['DELETE'])
def eliminar_vehiculo(vehiculo_id):
    vehiculo = Vehiculo.query.get(vehiculo_id)
    if vehiculo is not None:
        db.session.delete(vehiculo)
        db.session.commit()
        return jsonify({'message': 'Vehículo eliminado con éxito'})
    return 'Vehículo no encontrado', 404

if __name__ == '__main__':
    app.run(debug=True)
