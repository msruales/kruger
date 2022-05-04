import {User} from "../../../models/user";

export interface Employee extends User{
    ci: string,
    surnames: string,
}

export interface RegisterEmployee {
    ci: string,
    surnames: string,
    names: string,
    email: string
}

export interface UpdateEmployee {
    id: string,
    dateOfBirth: string,
    direction: string,
    mobilePhone: string,
    isVaccinated: boolean,
    typeOfVaccine: "Sputnik" | "AstraZeneca" | "Pfizer" | "Jhonson&Jhonson",
    vaccinationDate: string,
    numberOfDoses: string
}