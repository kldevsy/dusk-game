// js/storage.js
const KEY = 'dusk_progress';
export function saveProgress(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
export function loadProgress() {
  const d = localStorage.getItem(KEY);
  return d ? JSON.parse(d) : null;
}
