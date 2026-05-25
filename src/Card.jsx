import DeleteProject from "./DeleteProject";
import ModifyStatus from "./ModifyStatus";
import ModifyProject from "./ModifyProject";
function Card(props) {
    const currentProject = {
        _id: props.id,
        title: props.title,
        tech: props.description, // observ că în codul tău folosești description pentru tech
        done: props.done
    };
    
    const cardStyle = {
        padding: '15px',
        margin: '15px 0',
        borderRadius: '8px',
        border: '2px solid',
        backgroundColor: props.done ? '#e8f5e9' : '#fff3e0',
        borderColor: props.done ? '#4caf50' : '#ff9800',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    };
    
    const buttonsContainerStyle = {
        display: 'flex',
        gap: '10px',
        marginTop: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    };
    
    const statusColor = props.done ? '#28a745' : '#ff6f00';
    const statusText = props.done ? '✓ Finalizat' : '○ Nefinalizat';
    
    return (
        <div style={cardStyle} 
             onMouseEnter={(e) => {
                 e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
                 e.currentTarget.style.transform = 'translateY(-2px)';
             }}
             onMouseLeave={(e) => {
                 e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                 e.currentTarget.style.transform = 'translateY(0)';
             }}>
            <h3 style={{ marginTop: 0, color: props.done ? '#2e7d32' : '#e65100' }}>{props.title}</h3>
            <p style={{ color: '#555', fontStyle: 'italic' }}>{props.description}</p>
            <p style={{ color: statusColor, fontWeight: 'bold', fontSize: '14px' }}>Status: {statusText}</p>
            <div style={buttonsContainerStyle}>
                <DeleteProject id={props.id} />
                <ModifyStatus project={currentProject} />
                <ModifyProject 
                    project={currentProject} 
                    editingId={props.editingId} 
                    setEditingId={props.setEditingId} 
                />
            </div>
        </div>
    );
}
export default Card;
