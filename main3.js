let http = new XMLHttpRequest();

document.addEventListener('DOMContentLoaded', () => {
    const userInfo = JSON.parse(localStorage.getItem('loggedInUser '));

    console.log(userInfo);

    if (userInfo) {
        const welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = `${userInfo.username}`; 
    } else {
        console.log('No user is logged in.'); 
    }

    fetchBooks(); 
    const userProfileData = JSON.parse(localStorage.getItem(`userProfileData_${userInfo.userId}`));
            const imageElement = document.getElementById("imagee");
           

           
            if (userProfileData && userProfileData.imageUrl) {
                imageElement.src = userProfileData.imageUrl; 
            } else {
                imageElement.src = 'path/to/default-image.jpg';
            }
});

function fetchBooks() {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    displayBooks(books);
}


function displayBooks(books) {
    let output = ""; 
    for (let i = 0; i < books.length; i++) {
        const item = books[i];
        const encodedTitle = encodeURIComponent(item.title);
        output += `
        <a href="book_details.html?title=${encodedTitle}" class="boook" data-id="${i}">
            <div class="boooks">
                <img src="${item.image}" alt="${item.title}">
            </div>
        </a>`;
    }
    document.querySelector(".boooks").innerHTML = output;

   
    const bookElements = document.querySelectorAll(".boook");
    bookElements.forEach(book => {
        book.addEventListener("click", function() {
            const bookId = this.getAttribute("data-id");
            console.log("Book ID:", bookId); 
            window.location.href = `book_details.html?id=${bookId}`;
        });
    });

 
    const searchInput = document.querySelector('.search');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm)
        );
        displayBooks(filteredBooks); 
    });
}