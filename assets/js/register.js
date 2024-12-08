document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Recoger los datos del formulario
    const usuario = {
        username: document.getElementById("username").value,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        correo: document.getElementById("correo").value,
        cedula: document.getElementById("cedula").value,
        password: document.getElementById("password").value,
    };

    // Guardar en JSON Server
    try {
        const respuesta = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        });

        if (respuesta.ok) {
            alert("Usuario registrado con éxito");
            document.getElementById("registerForm").reset();
        } else {
            throw new Error("Error al guardar el usuario");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
