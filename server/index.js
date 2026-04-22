const express = require('express');
const app = express();
const PORT = 3000;
// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});
// Date (temporar in memorie, vom folosi MongoDB mai tarziu)
const projects = [
 { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },
 { id: 2, title: "Calculator Buget", tech: "JS", done: true },
 { id: 3, title: "Dashboard React", tech: "React", done: false },
 { id: 4, title: "API Meteo", tech: "React, API", done: false },
];
// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
 res.json(projects);
});
    
// GET /api/projects - returneaza toate proiectele
app.get('/api/projects/:id', function(req, res) {
 const project = projects.find(p => p.id === parseInt(req.params.id));
 if (project) {
   res.json(project);
 } else {
   res.status(404).json({ message: 'Proiectul nu a fost gasit' });
 }
});
// GET /api/stats - returneaza statistici despre proiecte
app.get('/api/stats', function(req, res) {
 const total = projects.length;
 const done = projects.filter(p => p.done).length;
 const pending = total - done;
 res.json({ total, done, pending });
});
// Porneste serverul
app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});
