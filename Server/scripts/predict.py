import torch
from transformers import BertTokenizer, BertForSequenceClassification, AdamW
from torch.utils.data import TensorDataset, DataLoader, random_split
model_path="/Users/thushara/Documents/DPBH/Final/fine_tuned_bert_model.pt"
# Load the model
loaded_model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
loaded_model.load_state_dict(torch.load(model_path))
loaded_model.eval()

# Tokenize new sentence(s)
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
sentences=["Exclusive offers!","No, I dont want to save the amount."]
#new_sentence = ""
for sentence in sentences:
    encoded_input = tokenizer(sentence, padding=True, truncation=True, return_tensors='pt')

# Inference
    with torch.no_grad():
        outputs = loaded_model(**encoded_input)
        predictions = torch.argmax(outputs.logits, dim=1)
        predicted_label = predictions.item()

# Map label to category (if needed)
    categories = {0: "non-confirm shaming", 1: "confirm shaming"}
    predicted_category = categories[predicted_label]
    print(f"{predicted_category}")
