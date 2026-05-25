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
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Status: {props.done ? 'Finalizat' : 'Nefinalizat'}</p>
            <DeleteProject id={props.id} />
            <ModifyStatus project={currentProject} />
            <ModifyProject 
                project={currentProject} 
                editingId={props.editingId} 
                setEditingId={props.setEditingId} 
            />
            </div>
    );
}
export default Card;
