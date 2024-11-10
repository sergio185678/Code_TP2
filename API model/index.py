from tensorflow.keras.models import load_model
from flask import Flask, jsonify, request
import numpy as np

app = Flask(__name__)

model1 = load_model('modelos/model1/saved_model1.h5')
model2 = load_model('modelos/model2/saved_model2.h5')

similarities = np.load('modelos/model_autoencoder/similarities.npy')

array_food=["Lomo Saltado","Ceviche","Pollo a la Brasa","Ají de Gallina","Arroz con Pollo","Arroz Chaufa","Tacu Tacu","Escabeche de Pescado","Pachamanca a la olla","Cau Cau con Arroz","Cuy Chactado","Juane de Pollo","Carapulcra","Picante de Cuy","Arroz a la Chiclayana","Chupe de Camarones","Tiradito de Pescado","Paella Mixta","Pasta a la Bolognesa","Tallarines Verdes con Bistec","Lasaña de Carne","Spaghetti a la Huancaína con Lomo","Estofado de Ternera con Ajo","Lomo a lo Pobre","Cazuela de Mariscos","Sudado de Pescado","Sudado de Pollo","Tallarines Rojos","Tallarines Rojos con Carne","Estofado de Pollo","Estofado de Carne","Seco de Pollo","Seco de Res con Frijoles","Sopa a la Minuta","Chupe de Pescado","Arroz con Mariscos","Arroz Tapado","Menestrón","Cerdo al Grill con Puré de Papas","Tallarin Saltado de Carne","Tallarín Saltado de Pollo","Charquicán","Aguadito de Pollo","Pollo con Arroz a la Jardinera","Mondonguito a la Italiana","Pollo al Maní con Camote","Pollo con Guiso de Arroz","Pescado con Puré de Papa","Seco de Carne","Salpicón de Pollo"]

def evaluar_recomendaciones(plato_index, top_n=50):
    similar_plates = similarities[plato_index].argsort()[::-1][1:top_n+1]
    
    resultados = []
    for idx in similar_plates:
        resultados.append({
            'id': int(idx)+1,
            'peruvian_dish':array_food[int(idx)],
            'similitud': float(similarities[plato_index][idx])
        })
    
    return resultados

@app.route('/predict_model1', methods=['POST'])
def predict1():
    try:
        # Leer datos de la solicitud POST
        data = request.get_json(force=True)
        
        # Verificar que se ha recibido una lista de flotantes
        if not all(isinstance(i, (float, int)) for i in data):
            return jsonify({'error': 'Invalid input format. Expected a list of floats.'}), 400
        
        # Convertir la lista a un array de Numpy
        X_new_df = np.array([data])  # Convertir a una matriz de una sola fila
        
        # Asegúrate de que los datos están en la forma correcta
        X_new_df = np.round(X_new_df, decimals=2)

        # Realizar la predicción
        predictions = model1.predict(X_new_df)
        predictions_list = predictions.tolist()  # Convertir las predicciones a una lista

        return jsonify({'prediction': predictions_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/predict_model2', methods=['POST'])
def predict2():
    try:
        # Leer datos de la solicitud POST
        data = request.get_json(force=True)
        
        # Verificar que se ha recibido una lista de flotantes
        if not all(isinstance(i, (float, int)) for i in data):
            return jsonify({'error': 'Invalid input format. Expected a list of floats.'}), 400
        
        # Convertir la lista a un array de Numpy
        X_new_df = np.array([data])  # Convertir a una matriz de una sola fila
        
        # Asegúrate de que los datos están en la forma correcta
        X_new_df = np.round(X_new_df, decimals=2)

        # Realizar la predicción
        predictions = model2.predict(X_new_df)
        predictions_list = predictions.tolist()  # Convertir las predicciones a una lista

        return jsonify({'prediction': predictions_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/predict_model_autoencoder/<int:food_id>', methods=['GET'])
def predict3(food_id):
    try:
        # Verificar que el food_id sea válido
        # editar con el tiempo
        if food_id < 1 or food_id > 50:
            return jsonify({'error': 'ID de comida no válido'}), 400
        
        # Obtener recomendaciones
        recomendaciones = evaluar_recomendaciones(food_id - 1)
        return jsonify(recomendaciones)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)