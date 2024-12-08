
const apiURL = "http://localhost:3000/usuarios";


const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault(); 

  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    
    const response = await fetch(apiURL);
    const usuarios = await response.json();

    
    const usuarioValido = usuarios.find(
      (usuario) => usuario.username === username && usuario.password === password
    );

    if (usuarioValido) {
      
      alert("Inicio de sesión exitoso");
      window.location.href = "/dashboard.html"; 
    } else {
      
      alert("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error);
    alert("Hubo un problema con el servidor. Intenta más tarde.");
  }
});
