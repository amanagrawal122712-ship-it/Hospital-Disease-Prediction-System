from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("disease_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Load dataset
training_data = pd.read_csv("../dataset/Training.csv")
training_data = training_data.loc[:, ~training_data.columns.str.contains("^Unnamed")]

# Feature names (Symptoms)
feature_names = training_data.drop(columns=["prognosis"]).columns.tolist()


# ===============================
# Home Route
# ===============================
@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "Disease Prediction API is Running 🚀"
    })


# ===============================
# Get All Symptoms
# ===============================
@app.route("/symptoms", methods=["GET"])
def get_symptoms():
    return jsonify({
        "success": True,
        "symptoms": feature_names
    })


# ===============================
# Predict Disease
# ===============================
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    symptoms = data.get("symptoms", [])

    input_data = [0] * len(feature_names)

    for symptom in symptoms:
        if symptom in feature_names:
            index = feature_names.index(symptom)
            input_data[index] = 1

    input_df = pd.DataFrame([input_data], columns=feature_names)

    prediction = model.predict(input_df)

    disease = label_encoder.inverse_transform(prediction)[0]

    return jsonify({
        "success": True,
        "prediction": disease
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)