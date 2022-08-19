export const parseListFromStorage = () => {
  const storage = localStorage.getItem("notes");
  if (storage) {
    return JSON.parse(storage);
  }
  return [];
};

export const saveListToStorage = (newData: any) => {
  const stringfy = JSON.stringify(newData);
  localStorage.setItem("notes", stringfy);
};
