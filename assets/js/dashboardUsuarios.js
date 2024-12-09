document.addEventListener("DOMContentLoaded", function () {
    const usuariosContainer = document.getElementById("usuariosContainer");

    const cargarUsuarios = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/usuarios");
            if (!respuesta.ok) throw new Error("Error al obtener los usuarios");
            const usuarios = await respuesta.json();

            usuariosContainer.innerHTML = ""; 

            usuarios.forEach(usuario => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("col-md-4");

                tarjeta.innerHTML = `
                    <div class="card shadow-sm">
                        <div class="card-body">
                            <h5 class="card-title">${usuario.username}</h5>
                            <p class="card-text"><strong>Nombre:</strong> ${usuario.nombre}</p>
                            <p class="card-text"><strong>Apellidos:</strong> ${usuario.apellidos}</p>
                            <p class="card-text"><strong>Correo:</strong> ${usuario.correo}</p>
                            <p class="card-text"><strong>Cédula:</strong> ${usuario.cedula}</p>
                            <p class="card-text"><strong>Contraseña:</strong> ${usuario.password}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-danger btn-sm eliminar-usuario" data-id="${usuario.id}">Eliminar</button>
                                <button class="btn btn-primary btn-sm editar-usuario" data-id="${usuario.id}">Editar</button>
                            </div>
                        </div>
                    </div>
                `;
                usuariosContainer.appendChild(tarjeta);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    usuariosContainer.addEventListener("click", async (evento) => {
        if (evento.target.classList.contains("eliminar-usuario")) {
            const idUsuario = evento.target.dataset.id;

            try {
                const respuesta = await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
                    method: "DELETE",
                });
                if (respuesta.ok) {
                    alert("Usuario eliminado con éxito");
                    cargarUsuarios();
                } else {
                    throw new Error("Error al eliminar el usuario");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    });

    cargarUsuarios();
});
