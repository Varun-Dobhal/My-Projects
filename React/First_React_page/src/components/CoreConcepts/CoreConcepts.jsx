import "./CoreConcepts.css";
// Props:-
export default function CoreConcept(props) {
  return (
    <li>
      <img src={props.img} />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </li>
  );
}
