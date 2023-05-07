// const checkboxThemeSwitcher = document.getElementById('checkbox-theme-switcher');

// checkboxThemeSwitcher.addEventListener('change', changeStatus);

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

const checkbox = document.querySelector('input[name="theme-toggle"]');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

checkbox.addEventListener('change', function() {
  if(this.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline-block';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'inline-block';
    moonIcon.style.display = 'none';
  }
});

// const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
// function switchTheme(e) {
//   if (e.target.checked) {
//     document.documentElement.setAttribute('data-theme', 'dark');
//     localStorage.setItem('theme', 'dark'); // сохраняем тему в localStorage
//   }
//   else {
//     document.documentElement.setAttribute('data-theme', 'light');
//     localStorage.setItem('theme', 'light');
//   }
// }
// //переключатель темы
// toggleSwitch.addEventListener('change', switchTheme, false);
// //тема localStorage
// const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
// if (currentTheme) {
//   document.documentElement.setAttribute('data-theme', currentTheme);
//   if (currentTheme === 'dark') {
//     toggleSwitch.checked = true;
//   }
// }