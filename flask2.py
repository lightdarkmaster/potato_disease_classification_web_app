from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from PIL import Image

app = Flask(__name__)

# Load your TFLite model
interpreter = tf.lite.Interpreter(model_path="your_model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Function to preprocess image
def preprocess_image(image_path):
    image = Image.open(image_path).resize((224, 224))
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image.astype(np.float32)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image file from request
        file = request.files['file']
        
        # Save image to temporary file
        image_path = 'temp_image.jpg'
        file.save(image_path)
        
        # Preprocess image
        input_data = preprocess_image(image_path)
        
        # Perform inference
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])
        
        # Get predicted class
        predicted_class = np.argmax(output_data[0])
        
        # Return predicted class as JSON response
        return jsonify({'predicted_class': predicted_class})
    
    except Exception as e:
        # Return error message if an exception occurs
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

