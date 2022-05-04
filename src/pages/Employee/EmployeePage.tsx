import {Center, Stack, Container, Button, Heading} from "@chakra-ui/react";
import {Formik, FormikValues} from "formik";
import {SelectForm, SwitchForm, InputForm} from "../../components";
import {validationAditionalInformation} from "./Schema/validationAditionalInformation";
import {useUpdateMutation} from "../../service/employeeApi";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/slices/authSlice";


const currentDate = new Date().toISOString().slice(0, 10)

export const EmployeePage = () => {

    const [update] = useUpdateMutation()

    const currentUser = useSelector( selectCurrentUser )

    const handleSubmit = (values: FormikValues) => {
        // update({...values})
    }

    return (
        <Container>
            <Heading p={4}>Empleado</Heading>
            <Center bg='transparent' h='auto'>
                <Formik initialValues={{
                    dateOfBirth: currentDate,
                    direction: '',
                    mobilePhone: '',
                    isVaccinated: false,
                    typeOfVaccine: '',
                    vaccinationDate: '',
                    numberOfDoses: ''
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
                                <Button variant='ghost' onClick={formik.submitForm}>Guardar</Button>

                            </Stack>
                        )
                    }


                </Formik>

            </Center>


        </Container>
    )
}
export default EmployeePage