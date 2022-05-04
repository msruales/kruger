import {
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
    Td,
    Button,
    Box,
    Heading,
    ModalBody,
    ModalFooter,
    InputGroup,
    InputLeftElement,
    Input,
    HStack,
    Stack, useDisclosure, Select
} from "@chakra-ui/react";
import {MdAdd, MdBuild, MdDelete} from "react-icons/all";
import ModalForm from "../../shared/Modal";
import {Formik, FormikValues} from "formik";
import {InputForm} from "../../components/";
import {validationEmployee} from "./Schema/validateEmployee";
import {SearchIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {useGetEmployeesQuery, useRegisterMutation} from "../../service/employeeApi";
import {Employee, RegisterEmployee} from "./models/employee";

export const AdminPage = () => {

    const {data, isLoading, isUninitialized} = useGetEmployeesQuery('')
    const [register] = useRegisterMutation()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [filter, setFilter] = useState({
        isVaccinated: false,
    })

    const handleSubmit = (values: RegisterEmployee) => {
        register({...values})
        onClose()

    }

    return (
        <Box p={4}>
            <Button rightIcon={<MdAdd/>} onClick={onOpen} colorScheme='green' float="right">Agregar </Button>

            <Heading p={4}>Administrador</Heading>

            <Stack spacing={4}>
                <HStack>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300'/>}
                        />
                        <Input type='tel' placeholder='Phone number'/>
                    </InputGroup>
                    <InputGroup>
                        <Select name="isVaccinated">
                            <option value='true'>VACUNADO</option>
                            <option value='false'>NO VACUNADO</option>
                        </Select>
                    </InputGroup>
                    {
                        filter.isVaccinated && (
                            <InputGroup>
                                <Select>
                                    <option value='Sputnik'>Sputnik</option>
                                    <option value='AstraZeneca'>AstraZeneca</option>
                                    <option value='Pfizer'>Pfizer</option>
                                    <option value='Jhonson&Jhonson'>Jhonson&Jhonson</option>
                                </Select>
                            </InputGroup>
                        )
                    }

                </HStack>

                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Empleados Registrados</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Cedula</Th>
                                <Th>Nombre</Th>
                                <Th>Correo</Th>
                                <Th>Estado de vacunación</Th>
                                <Th>Opciones</Th>
                            </Tr>
                        </Thead>
                        <Tbody>

                            {
                                data && data.map((employee: Employee) => (
                                    <Tr key={employee.id}>
                                        <Td>{employee.ci}</Td>
                                        <Td>{employee.names + '' + employee.surnames}</Td>
                                        <Td>{employee.email}</Td>
                                        <Td>asd</Td>
                                        <Td>
                                            <Stack direction='row' spacing={4}>
                                                <Button colorScheme='blue' variant='solid'>
                                                    <MdBuild/>
                                                </Button>
                                                <Button colorScheme='red' variant='outline'>
                                                    <MdDelete/>
                                                </Button>
                                            </Stack>
                                        </Td>
                                    </Tr>
                                ))
                            }

                        </Tbody>
                    </Table>
                    {
                        isOpen && (
                            <ModalForm title="Registrar Empleado" isOpen={isOpen} onClose={onClose}>
                                <Formik initialValues={{ci: '', names: '', surnames: '', email: ''}}
                                        validationSchema={validationEmployee} onSubmit={handleSubmit}>
                                    {
                                        ({submitForm}) => (
                                            <>
                                                <ModalBody>
                                                    <InputForm
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

                            </ModalForm>
                        )
                    }
                </TableContainer>
            </Stack>
        </Box>
    )
}

export default AdminPage