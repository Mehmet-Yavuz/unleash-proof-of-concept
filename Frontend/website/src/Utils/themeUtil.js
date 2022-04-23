export const getTheme = async () => {
  const response = await fetch("http://localhost:3001/theme-value");
  const data = response.json();
  return data;
};
