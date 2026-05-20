export default function DeleteProject({ id }) {

    async function handleDelete() {
        
        try {
            await fetch(`http://localhost:3000/api/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
        } catch (err) {
            console.error('Eroare:', err);
        }
        window.location.reload();
    }

    return (
        <div>
            <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' , borderRadius: '6px' }}>Sterge</button>
        </div>
    )
}