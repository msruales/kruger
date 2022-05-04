import * as Yup from "yup";

export const validationAditionalInformation = Yup.object({
    dateOfBirth: Yup.date().required('Requerido'),
    direction: Yup.string().required('Requerido'),
    mobilePhone: Yup.number().typeError('Debe ser un numero').test('len', 'Minimo 10 caracteres', (val) => val ? val!.toString().length === 10 : false).required('Requerido'),
    isVaccinated: Yup.boolean().required('Requerido'),
    typeOfVaccine: Yup.string().when('isVaccinated', {
        is: true,
        then: (schema) => schema.required('Requerido'),
    }),
    vaccinationDate: Yup.date().when('isVaccinated', {
        is: true,
        then: (schema) => schema.required('Requerido'),
    }),
    numberOfDoses: Yup.number().when('isVaccinated', {
        is: true,
        then: (schema) => schema.required('Requerido'),
    }),
})