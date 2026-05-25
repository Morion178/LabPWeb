import { useState } from 'react';

export default function ModifyProject({ project, editingId, setEditingId }) {
    const [editTitle, setEditTitle] = useState(project.title);
    const [editTech, setEditTech] = useState(project.tech);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/projects/${project._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editTitle,
                    tech: editTech,
                    done: project.done
                })
            });

            if (response.ok) {
                setEditingId(null);
                window.location.reload();
            } else {
                console.error("Eroare la salvarea proiectului");
            }
        } catch (err) {
            console.error("Eroare rețea:", err);
        }
    };

    const handleStartEdit = () => {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditTech(project.tech);
    };

    if (editingId === project._id) {
        return (
            <div style={{ 
                marginTop: '15px', 
                padding: '10px', 
                borderTop: '1px dashed #ccc', 
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '500', color: '#555', minWidth: '100px', textAlign: 'left' }}>
                            Titlu nou:
                        </label>
                        <input 
                            type="text" 
                            value={editTitle} 
                            onChange={(e) => setEditTitle(e.target.value)}
                            style={{ 
                                flex: 1, 
                                maxLineWidth: '200px', 
                                padding: '4px 8px',   
                                fontSize: '13px',
                                borderRadius: '4px', 
                                border: '1px solid #ccc', 
                                color: '#000',
                                height: '24px'      
                            }}
                            required
                        />
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '500', color: '#555', minWidth: '100px', textAlign: 'left' }}>
                            Tehnologie nouă:
                        </label>
                        <input 
                            type="text" 
                            value={editTech} 
                            onChange={(e) => setEditTech(e.target.value)}
                            style={{ 
                                flex: 1, 
                                maxLineWidth: '200px',
                                padding: '4px 8px', 
                                fontSize: '13px',
                                borderRadius: '4px', 
                                border: '1px solid #ccc', 
                                 color: '#000',
                                height: '24px'
                            }}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
                        <button 
                            type="submit"
                            style={{ 
                                backgroundColor: 'green', 
                                color: 'white', 
                                borderRadius: '6px'
                            }}
                        >
                            Salvează
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setEditingId(null)}
                            style={{ 
                                backgroundColor: 'red', 
                                color: 'white', 
                                borderRadius: '6px'
                            }}
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
            style={{ 
                backgroundColor: 'blue', 
                color: 'white', 
                borderRadius: '6px'
            }}
        >
            Editează
        </button>
    );
}