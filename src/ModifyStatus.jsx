export default function ModifyStatus({ project }) {

    async function handleModify() {

        try {
            const negatedDone = !project.done;
            await fetch(`http://localhost:3000/api/projects/${project._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: project.title,
                    tech: project.tech,
                    done: negatedDone
                })
            });
        } catch (err) {
            console.error('Eroare:', err);
        }
        window.location.reload();
    }

    return (
        <div>
            <button onClick={handleModify} style={{ backgroundColor: 'green', color: 'white', borderRadius: '6px' }}>Modifica status</button>
        </div>
    )
}