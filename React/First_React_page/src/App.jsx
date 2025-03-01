import CoreConceptss from "./components/CoreConcepts/CoreConceptss";
import Header from "./components/Header/Header";
import Examples from "./components/Examples";

function App() {
  return (
    <div>
      <Header />
      <main>
        <CoreConceptss />
        <Examples />
      </main>
    </div>
  );
}

export default App;
