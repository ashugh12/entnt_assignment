// Utility functions for localStorage with cross-tab synchronization
export function setItem(key, value) {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
  
  // Trigger storage event for cross-tab communication
  window.dispatchEvent(new StorageEvent('storage', {
    key: key,
    newValue: stringValue,
    oldValue: localStorage.getItem(key),
    storageArea: localStorage
  }));
}

export function getItem(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function removeItem(key) {
  const oldValue = localStorage.getItem(key);
  localStorage.removeItem(key);
  
  // Trigger storage event for cross-tab communication
  window.dispatchEvent(new StorageEvent('storage', {
    key: key,
    newValue: null,
    oldValue: oldValue,
    storageArea: localStorage
  }));
} 