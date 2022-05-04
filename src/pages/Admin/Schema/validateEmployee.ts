import * as Yup from "yup";

export const validationEmployee = Yup.object({
    ci: Yup.number().typeError('Debe ser un numero').test('len', 'Minimo 10 caracteres', (val) => val!.toString().length === 10).required('Requerido'),
    names: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Requerido'),
    surnames: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").required('Requerido'),
    email: Yup.string().email('Email no valido').required('Requerido'),
})