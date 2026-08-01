import joblib

# Load trained model
model = joblib.load("disease_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")


def predict_disease(symptoms):
    """
    symptoms -> list of symptom values (0/1)
    """
    prediction = model.predict([symptoms])
    disease = label_encoder.inverse_transform(prediction)

    return disease[0]