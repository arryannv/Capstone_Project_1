import os
import re
import pandas as pd
import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib

# Show where files are being saved.
print("Current working directory:", os.getcwd())

# Download the necessary NLTK stopwords
nltk.download('stopwords')

# Step 1: Load emails from directory.
def load_emails_from_directory(directory):
    emails = []
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='latin-1') as file:
            emails.append(file.read())
    return emails

# Path to your dataset
dataset_path = r'C:\Users\avats\Downloads\archive (6)\enron1'

# Load ham and spam emails
ham_emails = load_emails_from_directory(os.path.join(dataset_path, 'ham'))
spam_emails = load_emails_from_directory(os.path.join(dataset_path, 'spam'))

# Step 2: Prepare DataFrame
emails_df = pd.DataFrame({
    'message': ham_emails + spam_emails,
    'label': [0]*len(ham_emails) + [1]*len(spam_emails)  # 0: ham, 1: spam
})

# Step 3: Clean the text
def clean_text(text):
    text = re.sub(r'\n', ' ', text)
    text = re.sub(r'\r', ' ', text)
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    text = text.lower()
    stop_words = set(stopwords.words('english'))
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text

emails_df['cleaned_message'] = emails_df['message'].apply(clean_text)

# Step 4: TF-IDF Vectorization
tfidf = TfidfVectorizer(max_features=3000)
X = tfidf.fit_transform(emails_df['cleaned_message']).toarray()
y = emails_df['label'].values

# Step 5: Split data.
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 6: Train model.
nb_model = MultinomialNB()
nb_model.fit(X_train, y_train)

# Step 7: Predict
y_pred = nb_model.predict(X_test)

# Step 8: Evaluate
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))

# Step 9: Save model and vectorizer in same directory as script
script_dir = os.path.dirname(os.path.abspath(__file__))
joblib.dump(nb_model, os.path.join(script_dir, 'spam_detection_model.pkl'))
joblib.dump(tfidf, os.path.join(script_dir, 'tfidf_vectorizer.pkl'))

print("Model and vectorizer saved!")
