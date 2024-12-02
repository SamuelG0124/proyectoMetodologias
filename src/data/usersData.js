// data/usersData.js

// Datos simulados de usuarios
const users = [
    {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "admin"
    },
    {
        id: 2,
        username: "empleado",
        password: "empleado123",
        role: "user"
    }
    
];

// Función para registrar un nuevo usuario
export function addUser(username, password, role = "user") {
    const newUser = {
        id: users.length + 1,
        username,
        password,
        role
    };
    users.push(newUser);
    console.log(`Usuario registrado: ${JSON.stringify(newUser)}`);
}

// Exportamos los datos de usuarios y la función de añadir usuario
export { users };

