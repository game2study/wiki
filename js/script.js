// Navbar generation code
const navGenElement = document.querySelector('g2sw-navgen');

const navOptions = [
    {"displayName":"Home", "url":"#home"},
    {"displayName":"About", "url":"#about"},
    {"displayName":"Services", "url":"#services"},
    {"displayName":"Contact", "url":"#contact"}
];

const navbar = document.createElement('nav');
navbar.style.display = 'flex';
navbar.style.justifyContent = 'space-around';
navbar.style.backgroundColor = '#333';
navbar.style.padding = '10px';

navOptions.forEach(option => {
    const navItem = document.createElement('a');
    navItem.textContent = option.displayName;
    navItem.href = option.url;
    navItem.style.color = 'white';
    navItem.style.textDecoration = 'none';
    navItem.style.padding = '10px 20px';
    navItem.style.borderRadius = '5px';
    navItem.style.transition = 'background-color 0.3s';

    navItem.addEventListener('mouseover', () => {
        navItem.style.backgroundColor = '#575757';
    });
    navItem.addEventListener('mouseout', () => {
        navItem.style.backgroundColor = '';
    });

    navbar.appendChild(navItem);
});

navGenElement.appendChild(navbar);

// Markdown content loading code
const contentElement = document.getElementById('content');

function loadContent() {
    const hash = window.location.hash.substring(1);
    const page = hash ? hash : 'home';
    const url = `wiki/${page}.md`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            contentElement.innerHTML = marked(text);
        })
        .catch(error => {
            console.error('Error fetching the Markdown file:', error);
            contentElement.innerHTML = 'Page not found.';
        });
}

window.addEventListener('hashchange', loadContent);
window.addEventListener('load', loadContent);
