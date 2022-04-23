import "./App.css";
import React, { useEffect, useState } from "react";
import { getTheme } from "./Utils/themeUtil";

function App() {
  const [theme, setTheme] = useState(undefined);

  useEffect(() => {
    getTheme().then((value) => {
      setTheme(value);
    });
  }, []);

  return (
    <div className="App">
      {(() => {
        if (theme) {
          return (
            <header className="App-header-new">
              <p>
                You <b>ARE</b> using the new theme feature.
              </p>
            </header>
          );
        } else {
          return (
            <header className="App-header">
              <p>
                You are <b>NOT</b> using the new theme feature.
              </p>
            </header>
          );
        }
      })()}
    </div>
  );
}

export default App;
