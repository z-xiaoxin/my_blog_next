export const setLocalStorage = (key: string, value: unknown) => {
  let saveValue = "";
  try {
    saveValue = JSON.stringify(value);
  } catch (error) {
    saveValue = (value ?? "") as string;
  }
  localStorage.setItem(key, saveValue);
};

export const getLocalStorage = <T>(key: string) => {
  const result = localStorage.getItem(key);
  try {
    return JSON.parse(result ?? "") as T;
  } catch (error) {}
  return localStorage.getItem(key) as T;
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
