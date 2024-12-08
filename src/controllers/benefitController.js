// controllers/benefitController.js
import benefits from "../data/benefitsData.js";

export function getBenefits() {
    return benefits;
}

export function addBenefit(name, description) {
    const newBenefit = { id: benefits.length + 1, name, description };
    benefits.push(newBenefit);
}

export function deleteBenefit(index) {
    benefits.splice(index, 1);
}
