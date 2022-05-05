import {validationAditionalInformation} from "./Schema/validationAditionalInformation";
import {Button, Stack} from "@chakra-ui/react";
import {InputForm, SelectForm, SwitchForm} from "../../components";
import {Formik} from "formik";

const currentDate = new Date().toISOString().slice(0, 10)

interface Props {
    employee: any,
    handleSubmit: (data: any) => void,
    isLoading: boolean
}
export const FormEmployeeExtend = ({employee: currentEmployee, handleSubmit, isLoading}: Props) => {
    return (
        <Formik initialValues={{
            dateOfBirth: currentDate,
            direction: '',
            mobilePhone: '',
            isVaccinated: false,
            typeOfVaccine: 'Sputnik',
            vaccinationDate: '',
            numberOfDoses: '',
            ...currentEmployee
        }}
                validationSchema={validationAditionalInformation}
                onSubmit={handleSubmit}>
            {
                (formik) => (
                    <Stack spacing={3}>
                        <InputForm type="date" variant='outline' label="Fecha de Nacimiento"
                                   name="dateOfBirth"/>
                        <InputForm type="text" variant='outline' placeholder='Direccion...'
                                   label="Dirección de domicilio" name="direction"/>
                        <InputForm variant='outline' placeholder='Telefono...'
                                   label="Teléfono móvil" name="mobilePhone"/>
                        <SwitchForm variant='outline' label="Estado de vacunación" name="isVaccinated"/>
                        {
                            formik.values.isVaccinated && (
                                <>
                                    <SelectForm variant='outline' label="Tipo de Vacuna" name="typeOfVaccine">
                                        <option value=''>Seleccione</option>
                                        <option value='Sputnik'>Sputnik</option>
                                        <option value='AstraZeneca'>AstraZeneca</option>
                                        <option value='Pfizer'>Pfizer</option>
                                        <option value='Jhonson&Jhonson'>Jhonson&Jhonson</option>
                                    </SelectForm>
                                    <InputForm type="date" variant='outline' placeholder='Fecha de vacunacion...'
                                               label="Fecha de vacunación" name="vaccinationDate"/>
                                    <InputForm type="number" variant='outline' placeholder='Numero de dosis'
                                               label="Numero de dosis" name="numberOfDoses"/>

                                </>
                            )
                        }
                        <Button isLoading={isLoading} variant='ghost' onClick={formik.submitForm}>Guardar</Button>

                    </Stack>
                )
            }


        </Formik>
    )
}

export default FormEmployeeExtend