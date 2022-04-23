import "./App.css";
import React, { useEffect, useState } from "react";
import { getTheme, editTheme } from "./Utils/themeUtil";

function App() {
  const [theme, setTheme] = useState(undefined);

  const handleEdit = (evt) => {
    evt.preventDefault();
    editTheme(!theme).then((data) => {
      setTheme(data);
    });
  };

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
              <input
                type="checkbox"
                checked={theme}
                onChange={(e) => {
                  handleEdit(e);
                }}
              />
            </header>
          );
        } else {
          return (
            <header className="App-header">
              <p>
                You are <b>NOT</b> using the new theme feature.
              </p>
              <input
                className="form-control"
                type="checkbox"
                checked={theme}
                onChange={(e) => {
                  handleEdit(e);
                }}
              />
            </header>
          );
        }
      })()}
    </div>
  );
}

export default App;
