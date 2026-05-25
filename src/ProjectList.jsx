import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState(null);
    
    useEffect(function () {
        fetch('http://localhost:3000/api/projects')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setProjects(data);
                setLoading(false);
            })
            .catch(function (err) {
                setError('Eroare la incarcarea datelor: ' + err.message);
                setLoading(false);
            });
    }, []);
    
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
    
    const searchContainerStyle = {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px'
    };
    
    const projectsContainerStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '15px'
    };
    
    if (loading) {
        return <p style={{ textAlign: 'center', color: '#666' }}>Se incarca...</p>;
    }
    
    if (error) {
        return <p style={{ color: '#d32f2f', backgroundColor: '#ffebee', padding: '15px', borderRadius: '4px' }}>{error}</p>
    }
    
    const filteredProjects = projects.filter(function (p) {
        return p.title.toLowerCase().includes(search.toLowerCase());
    });
    
    return (
        <div>
            <div style={searchContainerStyle}>
                <label style={labelStyle}>Cauta proiecte:</label>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cauta dupa titlu..."
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
            </div>
            
            <div style={projectsContainerStyle}>
                {filteredProjects.length > 0 ? (
                    filteredProjects.map(function (item) {
                        return (
                            <Card key={item._id} id={item._id} title={item.title} description={item.tech} done={item.done} editingId={editingId} setEditingId={setEditingId} />
                        );
                    })
                ) : (
                    <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>Nu s-au gasit proiecte</p>
                )}
            </div>
        </div>
    );
}

export default ProjectList;
