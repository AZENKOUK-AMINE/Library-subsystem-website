document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const userId = document.getElementById('username').value.trim(); // User enters ID here
        const password = document.getElementById('password').value.trim();

        // Fetch users from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find the user with matching ID and password
        const user = users.find(u => u.id === userId && u.password === password);

        if (user) {
            // Store user information in local storage without trailing space
            localStorage.setItem('loggedInUser ', JSON.stringify({ 
                username: user.name, // Get the name associated with the ID
                userId: user.id, // Store user ID
                type: user.type,
                gender: user.gender,
                passport: user.passportId,
                major: user.class,

            }));

            // Redirect based on user type
            if (user.type === 'admin') {
                window.location.href = 'Adminmain.html'; 
            } else if (user.type === 'student' || user.type === 'teacher') {
                window.location.href = 'main3.html'; 
            }
        } else {
            alert('Invalid ID or password');
        }
    });
});