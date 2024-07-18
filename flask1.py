from flask import Flask, request, jsonify
import your_model_module  # Import your model module here

app = Flask(__name__)

# Load your model
model = your_model_module.load_model()  # Adjust this based on how you load your model

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        # Perform prediction using your model
        prediction = model.predict(data)
        
        # Return prediction as JSON response
        return jsonify({'prediction': prediction})
    
    except Exception as e:
        # Return error message if an exception occurs
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
