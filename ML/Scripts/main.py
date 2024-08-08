import spacy
import json
import shutil
import os

# Example text (replace with your actual text)
text = '''Patient: Doctor, I’ve been experiencing sharp pain in my shoulder and upper arm. 
Doctor: When did the pain start, and have you had any recent injuries or activities that might have caused it? 
Patient: The pain started about a week ago, and I haven’t had any recent injuries. I do a lot of typing at work. 
Doctor: This could be due to a rotator cuff issue or a repetitive strain injury. I recommend an MRI of the shoulder and a physical therapy evaluation. 
Patient: I’ll get those arranged. Should I avoid any activities in the meantime? 
Doctor: Yes, try to limit activities that strain your shoulder and apply ice to reduce inflammation. Follow up after the tests to discuss treatment options. 
Patient: Thank you.'''

# Load your trained model (replace with your actual model path)
nlp_ner = spacy.load(r"E:\Github_Repos\CodeSentinels\ML\Models\Spacy_Models\model-best")

# Process the text
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

# Structure the data
doc_data = {
    "text": doc.text,
    "entities": label_entities
}

# Save the data to a JSON file
json_output_path = r'E:\Github_Repos\CodeSentinels\ML\Outputs\op.json'
with open(json_output_path, 'w') as json_file:
    json.dump(doc_data, json_file, indent=4)

print(f"Data saved to {json_output_path}")
#os.remove(json_output_path)