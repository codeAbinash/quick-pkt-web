export type Theme = 'light' | 'dark' | 'auto';

export function getCurrentThemeLs(): Theme {
  let theme: Theme = (localStorage.getItem('theme') || 'auto') as Theme;
  return theme;
}

export function applyThemeLs(theme: Theme) {
  document.documentElement.classList.remove('dark');
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'auto') localStorage.removeItem('theme');
  else {
    document.documentElement.classList.remove('dark');
  }
  loadThemeLs();
}

export function loadThemeLs() {
  if (
    localStorage.getItem('theme') === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.style.setProperty('--bg', '#000');
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.style.setProperty('--bg', '#fff');
    document.documentElement.classList.remove('dark');
  }
}
