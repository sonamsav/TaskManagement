const updateLocalStorage = (key: string, data: unknown): void => {
    window.localStorage.setItem(key, JSON.stringify(data));
  };
  
  const getLocalStorageData = <T>(key: string): T | null => {
    const data = window.localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  };
  
  export { updateLocalStorage, getLocalStorageData };
  