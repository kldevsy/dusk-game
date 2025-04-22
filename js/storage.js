// salvar/carregar progresso
const KEY = 'dusk_game_progress';
export function saveProgress(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
export function loadProgress() {
  const d = localStorage.getItem(KEY);
  return d ? JSON.parse(d) : null;
}
