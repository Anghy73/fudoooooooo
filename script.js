document.addEventListener("DOMContentLoaded", function () {
    const users = {
        henecito: "henecito",
    };

    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (users[username] === password) {
            message.textContent = "Inicio de sesión exitoso!";
            message.style.color = "white";
            message.classList.remove("hidden");
            window.location.href = "principal.html";
        } else {
            message.textContent = "Credenciales incorrectas. Inténtalo de nuevo.";
            message.style.color = "black";
            message.classList.remove("hidden");
        }
    });

    const forgotPasswordLink = document.getElementById("forgot-password");
    forgotPasswordLink.addEventListener("click", function (e) {
        e.preventDefault();
        alert("¡Has solicitado restablecer tu contraseña!");
    });
});
