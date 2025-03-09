
import "./App.css";
import { Button } from "./components/ui/button";
import Hero from "./components/ui/custom/Hero";
import { useThemeStore } from "./components/useThemeStore";

function App() {
  const {theme}= useThemeStore();

  return (
    <div  data-theme={theme} className="App">
      {/* Hero */}
      <Hero />
    </div>
  );
}

export default App;
