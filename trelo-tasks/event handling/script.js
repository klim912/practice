document.addEventListener("DOMContentLoaded", () => {
  function showPassword() {
    let inputPassword = document.getElementById("password_area");
    if (inputPassword.type === "password") {
      inputPassword.type = "text";
    } else {
      inputPassword.type = "password";
    }
  }

  const inputName = document.getElementById("name");
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password_area");
  const toolTextName = document.getElementById("tool-text-name");
  const toolTextEmail = document.getElementById("tool-text-email");
  const toolTextPassword = document.getElementById("tool-text-password");

  inputName.addEventListener("focus", () => {
    toolTextName.style.display = "block";
  });

  inputName.addEventListener("blur", () => {
    toolTextName.style.display = "none";
  });

  inputEmail.addEventListener("focus", () => {
    toolTextEmail.style.display = "block";
    toolTextEmail.style.top = "42px";
    toolTextEmail.style.left = "400px";
  });

  inputEmail.addEventListener("blur", () => {
    toolTextEmail.style.display = "none";
  });

  inputPassword.addEventListener("focus", () => {
    toolTextPassword.style.display = "block";
    toolTextPassword.style.top = "100px";
    toolTextPassword.style.left = "230px";
  });

  inputPassword.addEventListener("blur", () => {
    toolTextPassword.style.display = "none";
  });

  document.querySelector("form").addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password_area").value;

    if (!name || !email || !password) {
      e.preventDefault;
      alert(
        "Форма не була відправлена. Перевірте введені дані та спробуйте знову"
      );
    } else {
      alert("Форма успішно відправлена!");
    }
  });

 
});
