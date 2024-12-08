import { users } from "../data/usersData.js"; // Asegúrate de que esta ruta sea correcta

// Cambia `register` a `handleRegister`
export function handleRegister(username, password) {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || users;

    // Verificar si ya existe un usuario con el mismo nombre
    const userExists = storedUsers.some(u => u.username === username);

    if (!userExists) {
        const newUser = {
            id: storedUsers.length + 1,
            username,
            password,
            role: "user"
        };
        storedUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(storedUsers));
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "login.html"; // Redirigir al login después de registrarse
    } else {
        alert("El nombre de usuario ya está registrado.");
    }
}

// Función de login
export function login(username, password) {
    console.log("Ejecutando login...");  // Para asegurarnos que se ejecuta

    // Obtener usuarios del localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || users;
    
    console.log("Usuarios almacenados:", storedUsers);  // Para depurar y ver si se están cargando correctamente
    const user = storedUsers.find(u => u.username === username && u.password === password);

    if (user) {
        console.log("Usuario encontrado:", user);  // Verificar si el usuario fue encontrado

        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("currentUser", JSON.stringify(user));

        // Verificar si es un administrador
        if (user.role === "admin") {
            console.log("Redirigiendo al dashboard...");  // Depuración de redirección
            window.location.href = "./dashboard.html";  // Redirige al dashboard si es admin
        } else {
            alert("Acceso restringido solo para administradores.");
        }
    } else {
        alert("Nombre de usuario o contraseña incorrectos.");
    }
}

// Función de logout
export function logout() {
    sessionStorage.clear();  // Elimina los datos de sesión
    window.location.href = "login.html";  // Redirige al login después de cerrar sesión
}
