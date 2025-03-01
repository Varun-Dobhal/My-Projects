import reactImg from "../../assets/react-core-concepts.png";
import "./Header.css";

const reactDescriptions = ["Fundamental", "Crucial", "Core"];
function genRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
  return (
    <header>
      <img src={reactImg} />
      <h1>Dobhal Varun</h1>
      <p>
        {reactDescriptions[genRandomInt(2)]} React concepts page for basic
        introduction.
      </p>
    </header>
  );
}
