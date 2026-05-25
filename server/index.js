const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const cors = require('cors');
app.use(cors());
const PORT = 3000;

// Conectare la MongoDB
mongoose.connect('mongodb://localhost:27017/dashboard')
    .then(function () {
        console.log('Conectat la MongoDB!');
    })
    .catch(function (err) {
        console.error('Eroare conectare MongoDB:', err);
    });


// Prima ruta: raspunde la GET /
app.get('/', function (req, res) {
    res.json({ message: 'Serverul functioneaza!' });
});
app.use(express.json());
// // Date (temporar in memorie, vom folosi MongoDB mai tarziu)
// const projects = [
//  { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
//  { id: 2, title: "Calculator Buget", tech: "JS", done: true },
//  { id: 3, title: "Dashboard React", tech: "React", done: false },
//  { id: 4, title: "API Meteo", tech: "React, API", done: false },
// ];
// GET /api/projects - returneaza toate proiectele
// app.get('/api/projects', function(req, res) {
//  res.json(projects);
// });
app.get('/api/projects', async function (req, res) {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});
// GET /api/stats - returneaza statistici despre proiecte
app.get('/api/stats', async function(req, res) {
    console.log('GET /api/stats called');
    try {
        const total = await Project.countDocuments();
        const done = await Project.countDocuments({ done: true });
        const pending = total - done;
        console.log('Stats:', { total, done, pending });
        res.json({ total, done, pending });
    } catch (err) {
        console.error('Error in /api/stats:', err);
        res.status(500).json({ error: 'Eroare ' + err });
    }
});
// GET /api/projects - returneaza toate proiectele
// app.get('/api/projects/:id', function(req, res) {
//  const project = projects.find(p => p.id === parseInt(req.params.id));
//  if (project) {
//    res.json(project);
//  } else {
//    res.status(404).json({ message: 'Proiectul nu a fost gasit' });
//  }
// });
app.get('/api/projects/:_id', async function (req, res) {
    try {
        const project = await Project.findById(req.params._id);
        if (!project) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});
// POST /api/projects - adauga un proiect nou
// app.post('/api/projects', function(req, res) {
//  const newProject = {
//  id: projects.length + 1,
//  title: req.body.title,
//  tech: req.body.tech,
//  done: req.body.done || false,
//  };
//  projects.push(newProject);
//  res.status(201).json(newProject);
// });
app.post('/api/projects', async function (req, res) {
    try {
        const newProject = new Project({
            title: req.body.title,
            tech: req.body.tech,
            done: req.body.done || false,
        });
        const saved = await newProject.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// DELETE /api/projects/:id - sterge un proiect
// app.delete('/api/projects/:id', function(req, res) {
//     const index = projects.findIndex(p => p.id === parseInt(req.params.id));
//     if(index === -1) res.status(404).json({ error: 'Not found' })
//     else {
//         projects.splice(index, 1);
//         res.json({ message: 'Proiectul a fost sters' });
//     }
// })
app.delete('/api/projects/:id', async function (req, res) {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json({ message: 'Proiectul a fost sters' });
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});
// PUT /api/projects/:id - actualizeaza un proiect
app.put('/api/projects/:id', async function (req, res) {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title, tech: req.body.tech, done: req.body.done },
            { returnDocument: 'after' }
        );
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});

// Porneste serverul
app.listen(PORT, function () {
    console.log('Server pornit pe http://localhost:' + PORT);
});


