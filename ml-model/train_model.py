import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# ============================
# Load Dataset
# ============================

data = pd.read_csv("../dataset/Training.csv")

# Remove unwanted columns like "Unnamed: 133"
data = data.loc[:, ~data.columns.str.contains("^Unnamed")]

print("====================================")
print("Dataset Loaded Successfully")
print("Dataset Shape :", data.shape)
print("====================================")

# ============================
# Features and Target
# ============================

if "prognosis" not in data.columns:
    raise Exception("❌ 'prognosis' column not found in Training.csv")

X = data.drop(columns=["prognosis"])
y = data["prognosis"]

print("\nFeature Shape :", X.shape)
print("Target Shape :", y.shape)

# ============================
# Encode Labels
# ============================

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

print("\nTotal Diseases :", len(label_encoder.classes_))
print("\nDisease List :")
print(label_encoder.classes_)

# ============================
# Train Test Split
# ============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)

print("\nTraining Shape :", X_train.shape)
print("Testing Shape :", X_test.shape)

# ============================
# Train Model
# ============================

print("\nTraining Random Forest Model...")

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_train, y_train)

print("✅ Model Training Completed")

# ============================
# Prediction
# ============================

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("\n====================================")
print(f"Model Accuracy : {accuracy*100:.2f}%")
print("====================================")

# ============================
# Save Model
# ============================

joblib.dump(model, "disease_model.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")

print("\n✅ disease_model.pkl Saved")
print("✅ label_encoder.pkl Saved")

print("\n🎉 Training Completed Successfully!")