import DeleteProject from "./DeleteProject";
function Card(props) {
    return (
        <div>
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <DeleteProject id={props.id} />
        </div>
    );
}
export default Card;
