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

const contentElement = document.getElementById('content');
const editorElement = document.getElementById('editor');
const markdownEditor = document.getElementById('markdown-editor');
const saveButton = document.getElementById('save-button');
const sidebarElement = document.getElementById('sidebar');
const wikiFiles = ['home', 'about', 'services', 'contact']; 

wikiFiles.forEach(file => {
    const link = document.createElement('a');
    link.href = `#${file}`;
    link.textContent = file.charAt(0).toUpperCase() + file.slice(1);
    sidebarElement.appendChild(link);
    sidebarElement.appendChild(document.createElement('br'));
});

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
            editorElement.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching the Markdown file:', error);
            contentElement.innerHTML = 'Page not found.';
        });
}

window.addEventListener('hashchange', loadContent);
window.addEventListener('load', loadContent);

function enableEditing() {
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
            markdownEditor.value = text;
            editorElement.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching the Markdown file:', error);
            markdownEditor.value = 'Page not found.';
        });
}

saveButton.addEventListener('click', () => {
    const hash = window.location.hash.substring(1);
    const page = hash ? hash : 'home';
    const fileContent = markdownEditor.value;
    const filePath = `wiki/${page}.md`;

    fetch('https://api.github.com/repos/your-username/your-repo/dispatches', {
        method: 'POST',
        headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_type: 'update_wiki',
            client_payload: {
                path: filePath,
                content: btoa(fileContent)
            }
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(`File ${page}.md saved successfully.`);
        loadContent();
    })
    .catch(error => {
        console.error('Error dispatching the GitHub Action:', error);
        alert('Failed to save the file.');
    });
});

const editButton = document.createElement('button');
editButton.textContent = 'Edit';
editButton.style.color = 'white';
editButton.style.backgroundColor = '#333';
editButton.style.border = 'none';
editButton.style.padding = '10px 20px';
editButton.style.cursor = 'pointer';
editButton.addEventListener('click', enableEditing);
navbar.appendChild(editButton);
