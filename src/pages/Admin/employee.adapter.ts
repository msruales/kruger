import {Employee} from "./models/employee";

export const employeeAdapter = ( user: any): Employee => ({
    id: user.id,
    ci: user.ci,
    surnames: user.surnames,
    names: user.names,
    email: user.email,
    rol: user.rol,
    isVaccinated: user.isVaccinated,
    typeOfVaccine: user.typeOfVaccine,
    vaccinationDate: user.vaccinationDate
})