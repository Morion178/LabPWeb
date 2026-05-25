import { useState, useEffect } from 'react';

export default function GetStats() {
    // State pentru a stoca statisticile primite de la backend
    const [stats, setStats] = useState({ total: 0, done: 0, pending: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch('http://localhost:3000/api/stats');
                if (!response.ok) {
                    throw new Error('Eroare la preluarea statisticilor');
                }
                const data = await response.json();
                setStats(data); 
                } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) return <p style={{ color: '#fff' }}>Se încarcă statisticile...</p>;
    if (error) return <p style={{ color: 'red' }}>Eroare: {error}</p>;

    return (
        <div style={{
            color: '#222',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '600px',
            margin: '20px auto'
        }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '10px' }}>
                Statistici Proiecte
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '16px' }}>
                <p style={{ margin: 0 }}>
                    <strong>Total Proiecte:</strong> <span style={{ color: '#007bff', fontWeight: 'bold' }}>{stats.total}</span>
                </p>
                <p style={{ margin: 0 }}>
                    <strong>Proiecte Finalizate:</strong> <span style={{ color: '#28a745', fontWeight: 'bold' }}>{stats.done}</span>
                </p>
                <p style={{ margin: 0 }}>
                    <strong>Proiecte În Lucru (Pending):</strong> <span style={{ color: '#ffc107', fontWeight: 'bold' }}>{stats.pending}</span>
                </p>
            </div>
        </div>
    );
}