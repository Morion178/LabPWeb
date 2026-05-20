import { useState, useEffect } from 'react';
import Card from './Card';
function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
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
    if (loading) {
        return <p>Se incarca...</p>;
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <div>
            <h3>Cauta proiecte:</h3>
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <h3>Proiecte</h3>
            {/* TODO: Afisati proiectele cu map() si componenta Card din Lab 4 */}
            {projects.filter(function (p) {
                return p.title.toLowerCase().includes(search.toLowerCase());
            }).map(function (item) {
                return (
                    <Card key={item._id} id={item._id} title={item.title} description={item.tech} />
                );
            })}
        </div>
    );
}


export default ProjectList;