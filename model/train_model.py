import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

# Load dataset (use your own CSV if you have one)
df = pd.read_csv('https://raw.githubusercontent.com/harshitbansal05/spam_email_dataset/main/spam.csv', encoding='latin-1')
df = df[['v1', 'v2']]
df.columns = ['label', 'text']

df['label'] = df['label'].map({'ham': 0, 'spam': 1})

X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.2)

vectorizer = TfidfVectorizer()
X_train_vect = vectorizer.fit_transform(X_train)

model = MultinomialNB()
model.fit(X_train_vect, y_train)

# Save model and vectorizer
with open('spam_model.pkl', 'wb') as f:
    pickle.dump((model, vectorizer), f)

print("Model trained and saved.")
