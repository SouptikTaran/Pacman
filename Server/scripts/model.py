import pandas as pd
import matplotlib.pyplot as plt
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import pandas as pd
import torch
from transformers import BertTokenizer, BertForSequenceClassification, AdamW
from torch.utils.data import TensorDataset, DataLoader, random_split
df= pd.read_csv('/Users/thushara/Documents/DPBH/ecommerce_data.csv')

df.describe()

df.head()

#view data split bar chart
label_counts = df['Label'].value_counts()
plt.figure(figsize=(10, 6))
label_counts.plot(kind='bar', color='skyblue')
plt.title('Distribution of Emotion Labels')
plt.xlabel('Emotion Labels')
plt.ylabel('Count')
plt.xticks(rotation=45, ha='right')
plt.show()


# Load data
df = pd.read_csv("/Users/thushara/Documents/DPBH/ecommerce_data.csv")

# Tokenization
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
encoded_data = tokenizer(list(df['Sentence']), padding=True, truncation=True, return_tensors='pt')

# Create TensorDataset
dataset = TensorDataset(encoded_data['input_ids'], encoded_data['attention_mask'], torch.tensor(df['Label']))

# Split dataset into train and validation sets
train_size = int(0.8 * len(dataset))
val_size = len(dataset) - train_size
train_dataset, val_dataset = random_split(dataset, [train_size, val_size])

# DataLoader
train_loader = DataLoader(train_dataset, batch_size=8, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=8, shuffle=False)

# Load pre-trained BERT model
My_Bert = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

# Define optimizer
optimizer = AdamW(My_Bert.parameters(), lr=2e-5)

# Training loop
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
My_Bert.to(device)

num_epochs = 5
for epoch in range(num_epochs):
    My_Bert.train()
    for batch in train_loader:
        optimizer.zero_grad()
        input_ids, attention_mask, labels = batch
        input_ids = input_ids.to(device)
        attention_mask = attention_mask.to(device)
        labels = labels.to(device)
        outputs = My_Bert(input_ids, attention_mask=attention_mask, labels=labels)
        loss = outputs.loss
        loss.backward()
        optimizer.step()

    # Validation loop
    My_Bert.eval()
    val_losses = []
    val_accs = []
    with torch.no_grad():
        for batch in val_loader:
            input_ids, attention_mask, labels = batch
            input_ids = input_ids.to(device)
            attention_mask = attention_mask.to(device)
            labels = labels.to(device)
            outputs = My_Bert(input_ids, attention_mask=attention_mask, labels=labels)
            loss = outputs.loss
            val_losses.append(loss.item())
            predictions = torch.argmax(outputs.logits, dim=1)
            correct_predictions = torch.sum(predictions == labels)
            val_acc = correct_predictions.item() / len(labels)
            val_accs.append(val_acc)
    avg_val_loss = sum(val_losses) / len(val_losses)
    avg_val_acc = sum(val_accs) / len(val_accs)
    print(f"Epoch {epoch + 1}/{num_epochs}, Validation Loss: {avg_val_loss}, Validation Accuracy: {avg_val_acc}")

# Save the model
model_path = "/Users/thushara/Documents/DPBH/fine_tuned_bert_model.pt"
torch.save(My_Bert.state_dict(), model_path)


