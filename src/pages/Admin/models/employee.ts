import {User} from "../../../models/user";

export interface Employee extends User {
    ci: string,
    surnames: string,
    dateOfBirth?: string,
    direction?: string,
    mobilePhone?: string,
    isVaccinated?: boolean,
    typeOfVaccine?: "Sputnik" | "AstraZeneca" | "Pfizer" | "Jhonson&Jhonson",
    vaccinationDate?: string,
    numberOfDoses?: string
}

export interface RegisterEmployee {
    id?: string
    ci: string,
    surnames: string,
    names: string,
    email: string
}

export interface UpdateEmployee extends RegisterEmployee {
    id: string,
    dateOfBirth?: string,
    direction?: string,
    mobilePhone?: string,
    isVaccinated?: boolean,
    typeOfVaccine?: "Sputnik" | "AstraZeneca" | "Pfizer" | "Jhonson&Jhonson",
    vaccinationDate?: string,
    numberOfDoses?: string
}