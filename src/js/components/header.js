// const themeSwitcher = document.getElementById('theme-switcher');

// themeSwitcher.addEventListener('change', changeStatus);

// if (localStorage.getItem('darkMode') === null) {
//     localStorage.setItem('darkMode', "false");
// }

// checkStatus();

// function checkStatus() {
//     if (localStorage.getItem('darkMode') === "true") {
//         checkboxThemeSwitcher.checked = true;
//         document.body.classList.add('dark-theme');
//         document.body.style.transition = '0ms';
//     } else {
//         checkboxThemeSwitcher.checked = false;
//         document.body.classList.remove('dark-theme');
//     }
// }

// function changeStatus(){
//     if (localStorage.getItem('darkMode') === "true") {
//         localStorage.setItem('darkMode', "false");
//         document.body.classList.remove('dark-theme');
//         document.body.style.transition = '300ms';
//     } else {
//         localStorage.setItem('darkMode', "true");
//         document.body.classList.add('dark-theme');
//         document.body.style.transition = '300ms';
//     }
// }


// const toggleSwitch = document.querySelector('#theme-toggle');
// const currentTheme = localStorage.getItem('theme');


// if (currentTheme) {
//   document.documentElement.setAttribute('data-theme', currentTheme);
//   if (currentTheme === 'dark') {
//     toggleSwitch.checked = true;
//   }
// }

// const defaultTheme = localStorage.getItem('theme');
// if (!defaultTheme) {
//   document.documentElement.setAttribute('data-theme', 'dark');
//   localStorage.setItem('theme', 'dark');
//   toggleSwitch.checked = true;
// }

// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     localStorage.setItem('theme', 'dark');
//   } else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
//   }
// }

// toggleSwitch.addEventListener('change', switchTheme, false);

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
toggleSwitch.addEventListener('change', switchTheme, false);

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
  else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}
