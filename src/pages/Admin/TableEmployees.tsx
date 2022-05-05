import {Button, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {Employee, RegisterEmployee} from "./models/employee";
import {MdBuild, MdDelete} from "react-icons/all";

interface Props {
    data: Employee[],
    editEmployee: (data: RegisterEmployee) => void
    handleDelete: (data: string) => void
}
const TableEmployees = ({data, editEmployee, handleDelete}: Props) => {
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Empleados Registrados</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Cedula</Th>
                        <Th>Nombre</Th>
                        <Th>Correo</Th>
                        <Th>Estado de vacunación</Th>
                        <Th>Tipo de Vacuna</Th>
                        <Th>Fecha de Vacunacion</Th>
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
                                <Td>{employee.isVaccinated ? 'Vacunado' : 'No vacunado'}</Td>
                                <Td>{employee.typeOfVaccine ? employee.typeOfVaccine : 'Sin registro' }</Td>
                                <Td>{employee.vaccinationDate ? employee.vaccinationDate : 'Sin registro' }</Td>
                                <Td>
                                    <Stack direction='row' spacing={4}>
                                        <Button colorScheme='blue' variant='solid'
                                                onClick={() => editEmployee(employee)}>
                                            <MdBuild/>
                                        </Button>
                                        <Button colorScheme='red' variant='outline'
                                                onClick={() => handleDelete(employee.id)}>
                                            <MdDelete/>
                                        </Button>
                                    </Stack>
                                </Td>
                            </Tr>
                        ))
                    }

                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableEmployees