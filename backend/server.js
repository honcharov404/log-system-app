import express, { json } from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(json());

let logs = [
  {
    id: uuidv4(),
    owner: 'Carol Danvers',
    text: 'Carol Danvers is the Captain Marvel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Bruce Banner',
    text: 'Bruc Banner is the Hulk',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Tony Stark',
    text: 'Tony Stark is the Iron Man',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Peter Parker',
    text: 'Peter Parker is the Spiderman',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Stephen Vincent Strange',
    text: 'Stephen Vincent Strange is the Doctor Strange',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Groot',
    text: 'Groot is the Groot',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Natasha Romanoff',
    text: 'Natasha Romanoff is the Black Widow',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Steave Rogers',
    text: 'Steave Rogers is the Captain America',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Thor Odinson',
    text: 'Thor Odinson is the Thor',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Scott Lang',
    text: 'Scott Lang is the Ant-Man',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    owner: 'Hope van Dyne',
    text: 'Hope van Dyne is the Wasp',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

app.get('/api/logs', (req, res) => {
  const sortedLogs = logs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(sortedLogs);
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