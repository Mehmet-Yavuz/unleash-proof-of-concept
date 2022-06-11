import "./App.css";
import React, { useEffect, useState } from "react";
import { getTheme, editTheme } from "./Utils/themeUtil";

function App() {
  const [theme, setTheme] = useState(undefined);
  const [regions, setRegions] = useState([]);

  const handleEdit = (evt) => {
    evt.preventDefault();
    const data = { themeValue: !theme, themeRegions: regions };
    editTheme(data).then((data) => {
      setTheme(data);
    });
  };

  const handleRegion = (value) => {
    if (regions.includes(value)) {
      regions.pop(value);
    } else {
      regions.push(value);
    }
  };

  useEffect(() => {
    getTheme().then((value) => {
      if (value.themeRegions.includes(value.userRegion)) {
        setTheme(value.themeValue);
        for (const region of value.themeRegions) {
          document.getElementById(region).checked = true;
        }
        setRegions(value.themeRegions);
      } else {
        setTheme(!value.themeValue);
        document.getElementById(value.userRegion).checked = true;
        setRegions([value.userRegion]);
      }
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
              <form onSubmit={handleEdit}>
                <fieldset>
                  <legend>Region</legend>
                  <input
                    type="checkbox"
                    id="Region A"
                    name="region"
                    value="Region A"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Region A<br />
                  <input
                    type="checkbox"
                    id="Region B"
                    name="region"
                    value="Region B"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Region B<br />
                  <input
                    type="checkbox"
                    id="Region C"
                    name="region"
                    value="Region C"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Region C<br />
                  <br />
                  <input type="submit" value="Submit for these regions" />
                </fieldset>
              </form>
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
              <form onSubmit={handleEdit}>
                <fieldset>
                  <legend>Region</legend>
                  <input
                    type="checkbox"
                    id="Region A"
                    name="region"
                    value="Region A"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Region A<br />
                  <input
                    type="checkbox"
                    id="Region B"
                    name="region"
                    value="Region B"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Region B<br />
                  <input
                    type="checkbox"
                    id="Region C"
                    name="region"
                    value="Region C"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Region C<br />
                  <br />
                  <input type="submit" value="Submit for these regions" />
                </fieldset>
              </form>
            </header>
          );
        }
      })()}
    </div>
  );
}

export default App;
