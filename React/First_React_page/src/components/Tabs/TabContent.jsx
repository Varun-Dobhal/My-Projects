import { EXAMPLES } from "../../data";

export default function TabContent({ selectedTopic }) {
  if (!selectedTopic) {
    return <p>Please select a topic.</p>;
  }

  const { title, description, code } = EXAMPLES[selectedTopic];

  return (
    <div id="tab-content">
      <h3>{title}</h3>
      <p>{description}</p>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
