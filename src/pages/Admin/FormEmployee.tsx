import {Formik} from "formik";
import {validationEmployee} from "./Schema/validateEmployee";
import {Button, ModalBody, ModalFooter} from "@chakra-ui/react";
import {InputForm} from "../../components";
import {RegisterEmployee} from "./models/employee";

interface Props {
    handleSubmit: (employee: RegisterEmployee) => void
    data?: RegisterEmployee
    onClose: () => void
}

export const FormEmployee = ({handleSubmit, data, onClose}: Props) => {
    return (
        <Formik initialValues={{
            ci: '',
            names: '',
            surnames: '',
            email: '',
            ...data

        }}
                validationSchema={validationEmployee} onSubmit={handleSubmit}>
            {
                ({submitForm}) => (
                    <>
                        <ModalBody>
                            <InputForm
                                type="number"
                                name="ci"
                                label="CI"
                                placeholder="Cedula.."/>
                            <InputForm
                                name="names"
                                label="Nombres"
                                placeholder="Nombres..."/>
                            <InputForm
                                name="surnames"
                                label="Apellidos"
                                placeholder="Apellidos..."/>
                            <InputForm
                                type="email"
                                name="email"
                                label="Correo"
                                placeholder="Correo Electronico..."/>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Cerrar
                            </Button>
                            <Button type="submit" variant='ghost'
                                    onClick={submitForm}>Guardar</Button>
                        </ModalFooter>
                    </>
                )
            }

        </Formik>
    )
}

export default FormEmployee