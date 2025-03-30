from flask import Flask, request, jsonify, render_template
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import joblib
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

# Initialize Flask app
app = Flask(__name__)

# Load the dataset and train the model
def load_and_train_model():
    # Load the dataset
    df = pd.read_csv("spam.csv", encoding='ISO-8859-1')

    # Preprocess the data
    X = df['v2']  # Email text
    y = df['v1']  # Labels (spam or ham)

    # Vectorize the text data
    vectorizer = CountVectorizer()
    X_vec = vectorizer.fit_transform(X)

    # Train a Naive Bayes model
    model = MultinomialNB()
    model.fit(X_vec, y)

    # Save the model and vectorizer (optional)
    joblib.dump(model, 'spam_model.pkl')
    joblib.dump(vectorizer, 'vectorizer.pkl')

    return model, vectorizer

# Load the model and vectorizer
model, vectorizer = load_and_train_model()

# Route for the home page
@app.route('/')
def index():
    return render_template('part 1.HTML')

# Route for handling predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        email_text = data['email_text']

        # Vectorize the input email text
        email_vec = vectorizer.transform([email_text])

        # Make a prediction
        prediction = model.predict(email_vec)

        # Return the prediction as JSON
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
