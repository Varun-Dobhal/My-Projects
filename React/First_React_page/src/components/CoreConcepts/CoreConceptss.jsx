import { data } from "../../data";
import CoreConcept from "./CoreConcepts";

export default function CoreConceptss() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {data.map((items) => (
          <CoreConcept key={items.title} {...items} />
        ))}
      </ul>
    </section>
  );
}
