export const getTheme = async () => {
  const response = await fetch("http://localhost:3001/theme-value");
  const data = response.json();
  return data;
};

export const editTheme = async (value) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ themeValue: value }),
  };

  const response = await fetch(
    "http://localhost:3001/edit-theme-value",
    requestOptions
  );
  const data = response.json();
  return data;
};
