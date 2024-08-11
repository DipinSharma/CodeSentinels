import spacy
import json
import os

# Load your trained model (replace with your actual model path)
nlp_ner = spacy.load(r"E:\Github_Repos\CodeSentinels\ML\Models\model-best")

# Path to the input JSON file
input_json_path = r'E:\Github_Repos\CodeSentinels\ML\Inputs\input_json.json'

# Load the JSON file and extract the conversation text, userId, and doctorId
with open(input_json_path, 'r') as json_file:
    json_data = json.load(json_file)
    text = json_data["data"]["conversation"]
    user_id = json_data["userId"]
    doctor_id = json_data["doctorId"]

# Process the text using the trained NLP model
doc = nlp_ner(text)

# Initialize a dictionary to hold the unique entities for each label
label_entities = {}

# Process the entities
for ent in doc.ents:
    if ent.label_ not in label_entities:
        label_entities[ent.label_] = set()
    label_entities[ent.label_].add(ent.text)

# Convert sets to lists for JSON serialization
label_entities = {label: list(entities) for label, entities in label_entities.items()}

# Structure the data with userId, doctorId, and entities
doc_data = {
    "userId": user_id,
    "doctorId": doctor_id,
    "text": doc.text,
    "entities": label_entities
}

# Path to the output JSON file
json_output_path = r'E:\Github_Repos\CodeSentinels\ML\Outputs\op.json'

# Save the data to a JSON file
with open(json_output_path, 'w') as json_file:
    json.dump(doc_data, json_file, indent=4)

print(f"Data saved to {json_output_path}")
# os.remove(json_output_path)
