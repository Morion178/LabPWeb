import { useState} from 'react';

export default function PostProject() {
    const [setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [done, setDone] = useState(false);

    async function handleSubmit() {
        if (!title || !tech) {
            alert('Completeaza titlul si tehnologia');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, tech, done }),
            });

            if (!response.ok) {
                throw new Error('Failed to save project');
            }

            const newProject = await response.json();
            setProjects((prev) => [...prev, newProject]);
            setTitle('');
            setTech('');
            setDone(false);
        } catch (err) {
            console.error('Eroare:', err);
        }
        window.location.reload();
    }

    return (
        <div>
            <br></br>
            <h2> Adauga un proiect:</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titlu" />
            <br></br>
            <input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="Tehnologie" />
            <br></br>
            <input type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} /> Finalizat 
            <br></br>
            <button onClick={handleSubmit}>Adauga</button>
            <br></br>
            <br></br>
        </div>
    )
}