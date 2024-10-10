document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    const contactData = {
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    // שליחת הנתונים לשרת
    fetch('/submitContact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById("contactForm").reset();
        })
        .catch(error => {
            console.error('Error submitting contact:', error);
        });
});
