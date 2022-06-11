import "./App.css";
import React, { useEffect, useState } from "react";
import { getTheme, editTheme } from "./Utils/themeUtil";

function App() {
  const [theme, setTheme] = useState(false);
  const [browsers, setBrowsers] = useState([]);
  const [realBrowsers, setRealBrowsers] = useState([]);

  const handleEdit = (evt) => {
    evt.preventDefault();
    let values;
    if (evt.target.type === "checkbox") {
      values = { themeValue: !theme, themeBrowsers: browsers };
    } else {
      for (const element of document.getElementsByClassName("option")) {
        if (!element.checked) {
          if (!realBrowsers.includes(element.value))
            realBrowsers.push(element.value);
        }
      }
      values = { themeValue: !theme, themeBrowsers: realBrowsers };
    }
    editTheme(values).then((data) => {
      setTheme(data);
    });
  };

  const handleRegion = (value) => {
    if (browsers.includes(value)) {
      browsers.pop(value);
    } else {
      browsers.push(value);
    }
  };

  useEffect(() => {
    getTheme().then((value) => {
      if (value.themeBrowsers.length > 0) {
        if (value.themeBrowsers.includes(value.userBrowser)) {
          setTheme(value.themeValue);
          for (const browser of value.themeBrowsers) {
            document.getElementById(browser).checked = true;
          }
          setBrowsers(value.themeBrowsers);
        } else {
          setTheme(!value.themeValue);
          let copyBrowsers = [];
          for (const element of document.getElementsByClassName("option")) {
            if (!value.themeBrowsers.includes(element.value)) {
              copyBrowsers.push(element.value);
              document.getElementById(element.value).checked = true;
            }
          }
          setRealBrowsers(value.themeBrowsers);
          setBrowsers(copyBrowsers);
        }
      } else {
        setTheme(value.themeValue);
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
                id="flag"
                name="flag"
                checked={theme}
                onChange={(e) => {
                  handleEdit(e);
                }}
              />
              <label htmlFor="flag">Flag</label>
              <p>
                <small>
                  Click on flag to <b>disable</b> new theme
                </small>
              </p>
              <br />
              <form onSubmit={handleEdit}>
                <fieldset>
                  <legend>Enabled Browsers</legend>
                  <input
                    className="option"
                    type="checkbox"
                    id="Chrome"
                    name="browser"
                    value="Chrome"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Chrome
                  <br />
                  <input
                    className="option"
                    type="checkbox"
                    id="Firefox"
                    name="browser"
                    value="Firefox"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Firefox
                  <br />
                  <input
                    className="option"
                    type="checkbox"
                    id="Microsoft Edge"
                    name="browser"
                    value="Microsoft Edge"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Microsoft Edge
                  <br />
                  <br />
                  <input type="submit" value="Submit for these browsers" />
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
                id="flag"
                name="flag"
                type="checkbox"
                checked={theme}
                onChange={(e) => {
                  handleEdit(e);
                }}
              />
              <label htmlFor="flag">Flag</label>
              <p>
                <small>
                  Click on flag to <b>enable</b> new theme
                </small>
              </p>
              <br />
              <form onSubmit={handleEdit}>
                <fieldset>
                  <legend>Disabled Browsers</legend>
                  <input
                    className="option"
                    type="checkbox"
                    id="Chrome"
                    name="browser"
                    value="Chrome"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Chrome
                  <br />
                  <input
                    className="option"
                    type="checkbox"
                    id="Firefox"
                    name="browser"
                    value="Firefox"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Firefox
                  <br />
                  <input
                    className="option"
                    type="checkbox"
                    id="Microsoft Edge"
                    name="browser"
                    value="Microsoft Edge"
                    onChange={(e) => {
                      handleRegion(e.target.value);
                    }}
                  />
                  Microsoft Edge
                  <br />
                  <br />
                  <input type="submit" value="Submit for these browsers" />
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
