export const setLoc = (key: string, value: string) =>
  window.localStorage.setItem(key, value);

export const getLoc = (key: string) => window.localStorage.getItem(key);

export const removeLoc = (key: string) => window.localStorage.removeItem(key);

export const clearLoc = () => window.localStorage.clear();
