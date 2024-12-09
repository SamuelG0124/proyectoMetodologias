const API_URL = "http://localhost:3000/beneficios"; // URL del JSON Server

// Elementos DOM
const benefitsTableBody = document.querySelector("#benefitsTable tbody");
const addBenefitForm = document.getElementById("addBenefitForm");
const benefitNameInput = document.getElementById("benefitName");
const benefitDescriptionInput = document.getElementById("benefitDescription");
const saveBenefitButton = document.getElementById("saveBenefitButton");

let isEditing = false;
let editBenefitId = null;

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
      <button class="btn btn-warning" onclick="startEditingBenefit('${beneficio.id}')">Editar</button>
      <button class="btn btn-danger" onclick="deleteBenefit('${beneficio.id}')">Eliminar</button>
    </td>
  `;

  benefitsTableBody.appendChild(row);
}

// Crear o actualizar un beneficio
saveBenefitButton.addEventListener("click", async () => {
  const nuevoBeneficio = {
    nombre: benefitNameInput.value,
    descripcion: benefitDescriptionInput.value,
  };

  try {
    if (isEditing) {
      // Editar beneficio
      const response = await fetch(`${API_URL}/${editBenefitId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoBeneficio),
      });

      if (response.ok) {
        loadBenefits();
        resetForm();
        bootstrap.Modal.getInstance(document.getElementById("addBenefitModal")).hide(); // Cerrar modal
        Swal.fire({
          title: '¡Beneficio actualizado!',
          text: 'El beneficio ha sido actualizado con éxito.',
          icon: 'success',
          timer: 1000, // Dura 1 segundo
          timerProgressBar: true,
        });
      } else {
        console.error("Error al editar el beneficio:", response.status);
      }
    } else {
      // Crear beneficio
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoBeneficio),
      });

      if (response.ok) {
        const beneficioCreado = await response.json();
        addBenefitToTable(beneficioCreado);
        resetForm();
        bootstrap.Modal.getInstance(document.getElementById("addBenefitModal")).hide(); // Cerrar modal
        Swal.fire({
          title: '¡Beneficio creado!',
          text: 'El beneficio ha sido creado con éxito.',
          icon: 'success',
          timer: 1000, // Dura 1 segundo
          timerProgressBar: true,
        });
      }
    }
  } catch (error) {
    console.error("Error guardando beneficio:", error);
  }
});

// Eliminar un beneficio
async function deleteBenefit(id) {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: '¡Sí, eliminar!',
    cancelButtonText: 'Cancelar',
    timer: 5000, // Dura 1 segundo
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (response.ok) {
        Swal.fire({
          title: 'Eliminado!',
          text: 'El beneficio ha sido eliminado.',
          icon: 'success',
          timer: 5000, // Dura 1 segundo
          timerProgressBar: true,
        });
        loadBenefits(); // Volver a cargar los beneficios
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'No se pudo eliminar el beneficio.',
          icon: 'error',
          timer: 1000, // Dura 1 segundo
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Hubo un problema al eliminar el beneficio.',
        icon: 'error',
        timer: 1000, // Dura 1 segundo
      });
      console.error("Error eliminando beneficio:", error);
    }
  }
}

// Editar un beneficio
async function startEditingBenefit(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const beneficio = await response.json();

    // Configurar el formulario para edición
    benefitNameInput.value = beneficio.nombre;
    benefitDescriptionInput.value = beneficio.descripcion;

    isEditing = true;
    editBenefitId = id;

    saveBenefitButton.textContent = "Actualizar";
    bootstrap.Modal.getOrCreateInstance(document.getElementById("addBenefitModal")).show(); // Mostrar modal

    // Alerta de confirmación para indicar que el beneficio se está editando
    Swal.fire({
      title: '¡Editando Beneficio!',
      text: `Estás editando el beneficio: ${beneficio.nombre}`,
      icon: 'info',
      confirmButtonText: '¡Entendido!',
      timer: 1000, // Dura 1 segundo
    });
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Hubo un problema al cargar el beneficio para editar.',
      icon: 'error',
      timer: 1000, // Dura 1 segundo
    });
    console.error("Error cargando beneficio para edición:", error);
  }
}

// Restablecer formulario
function resetForm() {
  benefitNameInput.value = "";
  benefitDescriptionInput.value = "";
  isEditing = false;
  saveBenefitButton.textContent = "Crear";
}
// terminado