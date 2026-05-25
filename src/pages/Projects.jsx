import ProjectList from '../ProjectList';
import AddProject from '../PostProject';
function Projects() {
    const containerStyle = {
        display: 'flex',
        gap: '30px',
        width: '100%',
        margin: '0',
        padding: '30px 0',
        minHeight: '100vh',
        boxSizing: 'border-box'
    };
    
    const sidebarStyle = {
        flex: '0 0 400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '0 30px',
        overflowY: 'auto'
    };
    
    const mainContentStyle = {
        flex: '1',
        minWidth: '0',
        padding: '0 30px',
        overflowY: 'auto'
    };
    
    return (
        <div style={containerStyle}>
            <div style={sidebarStyle}>
                <AddProject />
            </div>
            <div style={mainContentStyle}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>Proiectele mele</h2>
                <ProjectList />
            </div>
        </div>
    );
}
export default Projects;