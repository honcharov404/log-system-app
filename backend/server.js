const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

let logs = [
  {
    id: uuidv4(),
    owner: 'Alice',
    text: 'System booted.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

app.get('/api/logs', (req, res) => {
  res.json(logs);
});

app.post('/api/logs', (req, res) => {
  const newLog = {
    id: uuidv4(),
    owner: req.body.owner,
    text: req.body.text,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  logs.push(newLog);
  res.status(201).json(newLog);
});

app.put('/api/logs/:id', (req, res) => {
  const index = logs.findIndex(l => l.id === req.params.id);
  if (index === -1) return res.status(404).send();
  logs[index] = {
    ...logs[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  res.json(logs[index]);
});

app.delete('/api/logs/:id', (req, res) => {
  logs = logs.filter(l => l.id !== req.params.id);
  res.status(204).send();
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));