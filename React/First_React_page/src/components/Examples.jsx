import { useState } from "react";
import TabButton from "./Tabs/TabButton";
import Section from "./Section";
import Tabs from "./Tabs/tabs";
import TabContent from "./Tabs/TabContent";

export default function Examples() {
  const [selectedTopic, setSelecetedTopic] = useState("");

  function handleSelect(selectedButton) {
    setSelecetedTopic(selectedButton);
  }

  return (
    <Section title="Examples" id="examples">
      <Tabs
        buttons={
          <>
            <TabButton
              isSelected={selectedTopic === "components"}
              onSelect={() => handleSelect("components")}
              lable="Components"
            />
            <TabButton
              isSelected={selectedTopic === "jsxf"}
              onSelect={() => handleSelect("jsx")}
              lable="JSX"
            />
            <TabButton
              isSelected={selectedTopic === "props"}
              onSelect={() => handleSelect("props")}
              lable="Props"
            />
            <TabButton
              isSelected={selectedTopic === "state"}
              onSelect={() => handleSelect("state")}
              lable="State"
            />
          </>
        }
      ></Tabs>
      <TabContent selectedTopic={selectedTopic} />
    </Section>
  );
}
