import { useState } from 'react';

export default function ModifyProject({ project, editingId, setEditingId }) {
    // State-uri locale pentru valorile din formular, populate inițial cu datele proiectului
    const [editTitle, setEditTitle] = useState(project.title);
    const [editTech, setEditTech] = useState(project.tech);

    // Funcția care se ocupă de trimiterea datelor modificate la server (fetch PUT)
    const handleSave = async (e) => {
        e.preventDefault(); // Previne reîncărcarea nativă a paginii la submit-ul formularului

        try {
            const response = await fetch(`http://localhost:3000/api/projects/${project._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editTitle,
                    tech: editTech,
                    done: project.done // Păstrăm statusul curent neschimbat (true/false)
                })
            });

            if (response.ok) {
                setEditingId(null); // Resetăm ID-ul ca să ieșim din modul editare
                window.location.reload(); // Reîncărcăm pagina pentru a vedea datele noi
            } else {
                console.error("Eroare la salvarea proiectului");
            }
        } catch (err) {
            console.error("Eroare rețea:", err);
        }
    };

    // Funcția apelată când utilizatorul apasă pe butonul principal „Editează”
    const handleStartEdit = () => {
        setEditingId(project._id);
        setEditTitle(project.title); // Ne asigurăm că input-ul are textul curent
        setEditTech(project.tech);
    };

    // CONDICȚIE: Dacă acest proiect este cel aflat în editare, afișăm FORMULARUL
    if (editingId === project._id) {
        return (
            <div style={{ marginTop: '10px', width: '100%' }}>
                <form onSubmit={handleSave}>
                    <div style={{ marginBottom: '8px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Titlu nou:</label>
                        <input 
                            type="text" 
                            value={editTitle} 
                            onChange={(e) => setEditTitle(e.target.value)}
                            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', color: '#000' }}
                            required
                        />
                    </div>
                    
                    <div style={{ marginBottom: '12px' }}>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Tehnologie nouă:</label>
                        <input 
                            type="text" 
                            value={editTech} 
                            onChange={(e) => setEditTech(e.target.value)}
                            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', color: '#000' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                            type="submit"
                            style={{ backgroundColor: 'green', color: 'white', borderRadius: '6px' }}
                        >
                            Salvează
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setEditingId(null)} // Anulează editarea
                            style={{ backgroundColor: 'red', color: 'white', borderRadius: '6px' }}
                        >
                            Anulează
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <button 
            onClick={handleStartEdit}
            style={{ backgroundColor: 'blue', color: 'white', borderRadius: '6px' }}
        >
            Editează
        </button>
    );
}