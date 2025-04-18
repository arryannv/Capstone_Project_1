from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load the model
with open('../model/spam_model.pkl', 'rb') as f:
    model, vectorizer = pickle.load(f)

@app.route('/')
def home():
    return "Spam Detector API Running"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    email = data.get("email", "")
    if not email:
        return jsonify({"error": "No email text provided"}), 400

    vector = vectorizer.transform([email])
    prediction = model.predict(vector)[0]
    confidence = model.predict_proba(vector)[0][prediction]

    return jsonify({
        "email": email,
        "label": "spam" if prediction else "ham",
        "confidence": round(confidence, 2)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
