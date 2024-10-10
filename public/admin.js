// Function to load contacts from the server
function loadContacts() {
    fetch('/getContacts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById('contactsTable').getElementsByTagName('tbody')[0];

            // Clear existing rows in the table
            tableBody.innerHTML = '';

            // Populate the table with contacts
            data.forEach(contact => {
                const row = tableBody.insertRow();

                const nameCell = row.insertCell(0);
                const emailCell = row.insertCell(1);
                const phoneCell = row.insertCell(2);
                const messageCell = row.insertCell(3);

                nameCell.textContent = contact.name || 'N/A'; // Provide default value if empty
                emailCell.textContent = contact.email || 'N/A'; // Provide default value if empty
                phoneCell.textContent = contact.phone || 'N/A'; // Provide default value if empty
                messageCell.textContent = contact.message || 'N/A'; // Provide default value if empty
            });
        })
        .catch(error => {
            console.error('Error loading contacts:', error);
            alert('Failed to load contacts. Please try again later.'); // User-friendly alert
        });
}

// Call the function to load contacts on page load
window.addEventListener('load', loadContacts);
