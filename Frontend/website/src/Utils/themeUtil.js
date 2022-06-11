export const getTheme = async () => {
  const response = await fetch("http://localhost:3001/theme");
  const data = response.json();
  return data;
};

export const editTheme = async (value) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      themeValue: value["themeValue"],
      themeRegions: value["themeRegions"],
    }),
  };

  const response = await fetch(
    "http://localhost:3001/edit-theme",
    requestOptions
  );
  const data = response.json();
  return data;
};
