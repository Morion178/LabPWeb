import { useState, useEffect } from 'react';
import Card from './Card';
function ProjectList() 
{
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(function () {
        fetch('/data/projects.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setProjects(data.projects);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <p>Se incarca...</p>;
    }
    return (
        <div>
            <h3>Proiecte</h3>
            {/* TODO: Afisati proiectele cu map() si componenta Card din Lab 4 */}
            {projects.map(function (item) {
                return <Card key={item.id} title={item.title} description={item.tech} />;
            })}
        </div>
    );
}
export default ProjectList;