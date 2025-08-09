export const storeData = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getData = (key: string) => {
  return localStorage.getItem(key);
};

export const removeData = (key: string) => {
  return localStorage.removeItem(key);
};
