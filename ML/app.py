from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load your trained SpaCy model (replace with the actual path to your model)
nlp_ner = spacy.load(r"E:\Github_Repos\CodeSentinels\ML\Models\model-best")

@app.route('/', methods=['POST'])
def predict():
    try:
        # Extract JSON data from the request
        json_data = request.get_json()

        if not json_data:
            return jsonify({"error": "No JSON data provided"}), 400  # Return HTTP 400 status for bad request

        # Extract the conversation text, userId, and doctorId from the JSON data
        conversation = json_data.get('data', {}).get('conversation')
        user_id = json_data.get('userId')
        doctor_id = json_data.get('doctorId')

        if not conversation:
            return jsonify({"error": "Conversation text missing in the JSON data"}), 400

        # Perform prediction using the loaded model
        doc = nlp_ner(conversation)

        # Extract entities from the processed text
        label_entities = {}
        for ent in doc.ents:
            if ent.label_ not in label_entities:
                label_entities[ent.label_] = set()
            label_entities[ent.label_].add(ent.text)

        # Convert sets to lists for JSON serialization
        label_entities = {label: list(entities) for label, entities in label_entities.items()}

        # Structure the prediction result
        prediction_result = {
            "userId": user_id,
            "doctorId": doctor_id,
            "conversation": conversation,
            "entities": label_entities
        }

        # Return the prediction result as a JSON response
        return jsonify(prediction_result)

    except Exception as e:
        print(f"Exception occurred: {str(e)}")
        return jsonify({"error": f"An error occurred while processing the request: {str(e)}"}), 500  # Return HTTP 500 status for internal server error


if __name__ == '__main__':
    app.run(debug=True)
