const openTableButtons = document.querySelectorAll('.open-table-button');
const formContainer = document.getElementById('form-container');

openTableButtons.forEach(button => {
    button.addEventListener('click', () => {
        formContainer.style.display = 'block';
    });
});
