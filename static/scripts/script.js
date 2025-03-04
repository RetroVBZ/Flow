console.log("hello world");
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener for light/dark mode toggle
    document.getElementById('toggle-scheme').addEventListener('click', function (event) {
        console.log("Toggle scheme clicked"); // Debugging line
        event.preventDefault(); // Prevent the default anchor behavior

        // Toggle the dark mode class on body
        const body = document.body;
        body.classList.toggle('darkmode');
        console.log("Body darkmode:", body.classList.contains('darkmode'));

        // Toggle the dark mode class on the dashboard
        const dashboard = document.querySelector('.dashboard');
        dashboard.classList.toggle('darkmode');
        console.log("Dashboard darkmode:", dashboard.classList.contains('darkmode'));

        // Optionally toggle dark mode for all links if needed
        const links = document.querySelectorAll('.dashboard a');
        links.forEach(link => {
            link.classList.toggle('darkmode'); // If you have defined styles for dark-mode links
            console.log("Link darkmode:", link.classList.contains('darkmode'));
        });

        // Add a class to all elements inside the dashboard
        const dashboardElements = dashboard.querySelectorAll('*');
        dashboardElements.forEach(el => el.classList.toggle('darkmode'));
    });

    // Get all the card elements
    const cards = document.querySelectorAll('.table .card');

    // Add event listeners to each card for editing
    cards.forEach((card) => {
        card.addEventListener('click', editCard);
        card.setAttribute('draggable', true);
        card.addEventListener('dragstart', dragStart);
    });

    // Function to handle card editing
    function editCard(event) {
        const cardElement = event.target.closest('.card');

        // Show the edit overlay
        const editOverlay = document.querySelector('.edit-overlay');
        editOverlay.style.display = 'flex';

        // Populate the edit form
        const titleInput = editOverlay.querySelector('.edit-title');
        const descriptionInput = editOverlay.querySelector('.edit-description');
        titleInput.value = cardElement.querySelector('h3').textContent;
        descriptionInput.value = cardElement.querySelector('p').textContent;

        // Add event listeners to the save and cancel buttons
        const saveButton = editOverlay.querySelector('.save-button');
        const cancelButton = editOverlay.querySelector('.cancel-button');

        saveButton.addEventListener('click', () => {
            saveCardChanges(cardElement, titleInput.value, descriptionInput.value);
            editOverlay.style.display = 'none';
        }, { once: true });

        cancelButton.addEventListener('click', () => {
            editOverlay.style.display = 'none';
        });
    }

    // Function to save changes made to a card
    function saveCardChanges(cardElement, newTitle, newDescription) {
        cardElement.querySelector('h3').textContent = newTitle;
        cardElement.querySelector('p').textContent = newDescription;
    }

    // Add event listener to the "Create New Task" button
    const newButton = document.querySelector('.create-new');
    newButton.addEventListener('click', showCreateForm);

    // Function to display the create form
    function showCreateForm() {
        const createOverlay = document.querySelector('.create-overlay');
        createOverlay.style.display = 'flex';
    }

    // Add event listeners to the save buttons in the create form
    const saveUpcoming = document.querySelector('.save-upcoming');
    const saveLate = document.querySelector('.save-late');
    const saveOnGoing = document.querySelector('.save-ongoing');
    const saveFinished = document.querySelector('.save-finished');

    saveUpcoming.addEventListener('click', () => saveNewCard('tasks_header'), { once: true });
    saveLate.addEventListener('click', () => saveNewCard('pending_header'), { once: true });
    saveOnGoing.addEventListener('click', () => saveNewCard('on-going_header'), { once: true });
    saveFinished.addEventListener('click', () => saveNewCard('finished_header'), { once: true });

    // Function to save the new card in the specified section
    function saveNewCard(sectionClass) {
        const createOverlay = document.querySelector('.create-overlay');
        const newTitle = createOverlay.querySelector('.new-title').value;
        const newDescription = createOverlay.querySelector('.new-description').value;

        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.setAttribute('draggable', true);
        newCard.innerHTML = `<h3>${newTitle}</h3><p>${newDescription}</p>`;
        newCard.addEventListener('click', editCard);
        newCard.addEventListener('dragstart', dragStart);

        document.querySelector(`.${sectionClass} .background`).appendChild(newCard);

        // Hide the create form
        createOverlay.style.display = 'none';

        // Clear the input fields
        createOverlay.querySelector('.new-title').value = '';
        createOverlay.querySelector('.new-description').value = '';
    }

    // Drag and Drop functionality
    const backgrounds = document.querySelectorAll('.background');
    backgrounds.forEach((background) => {
        background.addEventListener('dragover', dragOver);
        background.addEventListener('drop', drop);
    });

    let draggedItem = null;

    function dragStart(event) {
        draggedItem = event.target;
        setTimeout(() => {
            draggedItem.style.display = 'none';
        }, 0);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        draggedItem.style.display = 'block';
        this.appendChild(draggedItem);
        draggedItem = null;
    }
});
