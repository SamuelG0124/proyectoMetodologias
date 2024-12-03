const API_URL = "http://localhost:3000/beneficios"; // URL del JSON Server

// Elementos DOM
const benefitsTableBody = document.querySelector("#benefitsTable tbody");
const addBenefitForm = document.getElementById("addBenefitForm");
const benefitNameInput = document.getElementById("benefitName");
const benefitDescriptionInput = document.getElementById("benefitDescription");
const saveBenefitButton = document.getElementById("saveBenefitButton");

// Leer los beneficios al cargar la página
document.addEventListener("DOMContentLoaded", loadBenefits);

// Función para cargar los beneficios
async function loadBenefits() {
  try {
    const response = await fetch(API_URL);
    const beneficios = await response.json();

    benefitsTableBody.innerHTML = ""; // Limpiar tabla
    beneficios.forEach((beneficio) => {
      addBenefitToTable(beneficio);
    });
  } catch (error) {
    console.error("Error cargando beneficios:", error);
  }
}

// Agregar un beneficio a la tabla
function addBenefitToTable(beneficio) {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${beneficio.id}</td>
    <td>${beneficio.nombre}</td>
    <td>${beneficio.descripcion}</td>
    <td>
      <button class="btn btn-warning" onclick="editBenefit('${beneficio.id}')">Editar</button>
      <button class="btn btn-danger" onclick="deleteBenefit('${beneficio.id}')">Eliminar</button>
    </td>
  `;

  benefitsTableBody.appendChild(row);
}

// Crear un nuevo beneficio
saveBenefitButton.addEventListener("click", async () => {
  try {
    // Obtener el próximo ID
    const nextId = await getNextId();

    // Crear el nuevo objeto beneficio
    const nuevoBeneficio = {
      id: nextId,
      nombre: benefitNameInput.value,
      descripcion: benefitDescriptionInput.value,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoBeneficio),
    });

    if (response.ok) {
      const beneficioCreado = await response.json();
      addBenefitToTable(beneficioCreado);
      addBenefitForm.reset();
      bootstrap.Modal.getInstance(document.getElementById("addBenefitModal")).hide(); // Cerrar modal
    }
  } catch (error) {
    console.error("Error creando beneficio:", error);
  }
});

// Función para obtener el próximo ID disponible
async function getNextId() {
  try {
    const response = await fetch(API_URL);
    const beneficios = await response.json();

    if (beneficios.length === 0) {
      return 1; // Si no hay beneficios, empieza en 1
    }

    // Calcular el ID más alto
    const maxId = Math.max(...beneficios.map((b) => parseInt(b.id, 10)));
    return maxId + 1; // Incrementar el ID
  } catch (error) {
    console.error("Error obteniendo el próximo ID:", error);
    return 1; // Valor por defecto
  }
}

// Eliminar un beneficio
// Eliminar un beneficio
async function deleteBenefit(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este beneficio?')) {
    try {
      // Hacer una solicitud DELETE al servidor
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (response.ok) {
        // Eliminar la fila correspondiente en la tabla
        const row = document.querySelector(`button[onclick="deleteBenefit('${id}')"]`).closest("tr");
        row.remove();
        console.log(`Beneficio con ID ${id} eliminado correctamente.`);
      } else {
        console.error(`Error al eliminar beneficio con ID ${id}.`);
      }
    } catch (error) {
      console.error("Error eliminando beneficio:", error);
    }
  }
}


// Editar un beneficio
async function editBenefit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const beneficio = await response.json();

    // Rellenar el formulario con los datos existentes
    benefitNameInput.value = beneficio.nombre;
    benefitDescriptionInput.value = beneficio.descripcion;

    saveBenefitButton.textContent = "Actualizar";
    saveBenefitButton.onclick = async () => {
      const beneficioActualizado = {
        id: id,
        nombre: benefitNameInput.value,
        descripcion: benefitDescriptionInput.value,
      };

      try {
        const updateResponse = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(beneficioActualizado),
        });

        if (updateResponse.ok) {
          loadBenefits();
          addBenefitForm.reset();
          saveBenefitButton.textContent = "Guardar";
          bootstrap.Modal.getInstance(document.getElementById("addBenefitModal")).hide();
        }
      } catch (error) {
        console.error("Error actualizando beneficio:", error);
      }
    };
  } catch (error) {
    console.error("Error cargando beneficio para edición:", error);
  }
}
