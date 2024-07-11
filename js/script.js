// Get the g2sw-navgen element
const navGenElement = document.querySelector('g2sw-navgen');

// Define the navigation options
const navOptions = [
    {"displayName":"Home", "url":"https://example.com/home"},
    {"displayName":"About", "url":"https://example.com/about"},
    {"displayName":"Services", "url":"https://example.com/services"},
    {"displayName":"Contact", "url":"https://example.com/contact"}
];

// Create the navbar container
const navbar = document.createElement('nav');
navbar.style.display = 'flex';
navbar.style.justifyContent = 'space-around';
navbar.style.backgroundColor = '#333';
navbar.style.padding = '10px';

// Iterate through the navigation options and create links
navOptions.forEach(option => {
    const navItem = document.createElement('a');
    navItem.textContent = option.displayName;
    navItem.href = option.url;
    navItem.style.color = 'white';
    navItem.style.textDecoration = 'none';
    navItem.style.padding = '10px 20px';
    navItem.style.borderRadius = '5px';
    navItem.style.transition = 'background-color 0.3s';

    // Add hover effect
    navItem.addEventListener('mouseover', () => {
        navItem.style.backgroundColor = '#575757';
    });
    navItem.addEventListener('mouseout', () => {
        navItem.style.backgroundColor = '';
    });

    navbar.appendChild(navItem);
});

// Append the navbar to the g2sw-navgen element
navGenElement.appendChild(navbar);
