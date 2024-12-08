// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    const benefitsTable = document.getElementById("benefitsTable");
    const benefitForm = document.getElementById("benefitForm");

    // Datos de ejemplo (simulación de datos)
    const benefits = [
        { id: 1, name: "Seguro de Vida", description: "Cobertura completa para empleados" },
        { id: 2, name: "Vacaciones Extras", description: "Días adicionales de vacaciones pagadas" }
    ];

    // Función para renderizar los beneficios
    function renderBenefits() {
        benefitsTable.innerHTML = "";
        benefits.forEach((benefit, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${benefit.name}</td>
                    <td>${benefit.description}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteBenefit(${index})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>
            `;
            benefitsTable.innerHTML += row;
        });
    }

    // Función para añadir un nuevo beneficio
    benefitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("benefitName").value;
        const description = document.getElementById("benefitDesc").value;
        benefits.push({ id: benefits.length + 1, name, description });
        renderBenefits();
        benefitForm.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById("addBenefitModal"));
        modal.hide();
    });

    // Función para eliminar un beneficio
    window.deleteBenefit = (index) => {
        benefits.splice(index, 1);
        renderBenefits();
    };

    renderBenefits();
});

// js/scripts.js
import { getBenefits, addBenefit, deleteBenefit } from "../controllers/benefitController.js";
import { logout } from "../controllers/authController.js";

document.addEventListener("DOMContentLoaded", () => {
    const benefitsTable = document.getElementById("benefitsTable");
    const benefitForm = document.getElementById("benefitForm");

    // Renderizar beneficios en la tabla
    function renderBenefits() {
        benefitsTable.innerHTML = "";
        const benefits = getBenefits();
        benefits.forEach((benefit, index) => {
            const row = `
                <tr>
                    <td>${benefit.id}</td>
                    <td>${benefit.name}</td>
                    <td>${benefit.description}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="handleDelete(${index})">
                            <i class="bi bi-trash-fill"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `;
            benefitsTable.innerHTML += row;
        });
    }

    // Manejar el formulario de añadir beneficio
    benefitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("benefitName").value;
        const description = document.getElementById("benefitDesc").value;
        addBenefit(name, description);
        renderBenefits();
        benefitForm.reset();
    });

    // Manejar eliminación de beneficio
    window.handleDelete = (index) => {
        deleteBenefit(index);
        renderBenefits();
    };

    // Manejar logout
    document.getElementById("logoutButton").addEventListener("click", () => {
        logout();
    });

    renderBenefits();
});
