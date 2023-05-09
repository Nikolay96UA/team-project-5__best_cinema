const lightStyles = document.querySelectorAll(
  'link[rel=stylesheet][media*=prefers-color-scheme][media*=light]'
);

const darkStyles = document.querySelectorAll(
  'link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]'
);
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherRadios = document.querySelectorAll('.switcher-radio');

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme === null) {
    setScheme('dark');
  }

  [...switcherRadios].forEach(radio => {
    radio.addEventListener('change', event => {
      setScheme(event.target.value);
    });
  });
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  }
}

function setScheme(scheme) {
  switchMedia(scheme);
  saveScheme(scheme);
}

function switchMedia(scheme) {
  let lightMedia = scheme === 'light' ? 'all' : 'not all';
  let darkMedia = scheme === 'dark' ? 'all' : 'not all';

  [...lightStyles].forEach(link => {
    link.media = lightMedia;
  });

  [...darkStyles].forEach(link => {
    link.media = darkMedia;
  });
}

function getSystemScheme() {
  const darkScheme = darkSchemeMedia.matches;

  return darkScheme ? 'dark' : 'light';
}

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
  localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
  localStorage.removeItem('color-scheme');
}

setupSwitcher();
setupScheme();
