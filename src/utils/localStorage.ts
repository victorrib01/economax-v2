export interface LocalStorageItem {
  name: string;
  token: string;
}

const prefix = import.meta.env.VITE_API_URL;

// Função para obter os itens do localStorage
export function getLocalStorage(): LocalStorageItem {
  const itemsString = localStorage.getItem(prefix);
  return JSON.parse(itemsString || "[]");
}

// Função para salvar os itens no localStorage
export function setLocalStorage(items: LocalStorageItem): void {
  const itemsString = JSON.stringify(items);
  return localStorage.setItem(prefix, itemsString);
}

// Função para excluir um item
export function deleteLocalStorage(): void {
  return localStorage.removeItem(prefix);
}
