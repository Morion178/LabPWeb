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

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        border: '2px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box'
    };
    
    const labelStyle = {
        display: 'block',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '5px',
        fontSize: '14px'
    };
    
    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#28a745',
        color: 'white',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginTop: '15px'
    };

    return (
        <div style={{
            padding: '30px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Adauga un proiect</h2>
            
            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Titlu:</label>
                <input 
                    type="text"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Titlu proiect"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#28a745'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label style={labelStyle}>Tehnologie:</label>
                <input 
                    type="text"
                    value={tech} 
                    onChange={(e) => setTech(e.target.value)} 
                    placeholder="Tehnologie folosita"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#28a745'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
            </div>

            <div style={{ 
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <input 
                    type="checkbox" 
                    id="doneCheckbox"
                    checked={done} 
                    onChange={(e) => setDone(e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="doneCheckbox" style={{ ...labelStyle, margin: 0, cursor: 'pointer' }}>Finalizat</label>
            </div>

            <button 
                onClick={handleSubmit}
                style={buttonStyle}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#218838';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#28a745';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                }}
            >
                Adauga
            </button>
        </div>
    )
}