import {
    Button,
    Box,
    Heading,
    Stack, useDisclosure,
} from "@chakra-ui/react";
import {MdAdd} from "react-icons/all";
import ModalForm from "../../shared/Modal";
import {useState} from "react";
import {
    useDeleteMutation,
    useGetEmployeesQuery,
    useRegisterMutation,
    useUpdateMutation
} from "../../service/employeeApi";
import {RegisterEmployee} from "./models/employee";
import FormEmployee from "./FormEmployee";
import TableEmployees from "./TableEmployees";
import useFilter from "../../hooks/useFilter";
import FilterTable from "./FilterTable";

export const AdminPage = () => {

    const {data} = useGetEmployeesQuery('')

    const [deleteEmployee] = useDeleteMutation()
    const [updateApi] = useUpdateMutation()
    const [register] = useRegisterMutation()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [employeeUpdate, setEmployeeUpdate] = useState<RegisterEmployee>()
    const {employees, handleChangeFilter, filter} = useFilter(data)

    const registerEmployee = (values: RegisterEmployee) => {
        register({...values})
        onClose()

    }
    const editEmployee = (employee: RegisterEmployee) => {
        setEmployeeUpdate(employee)
        onOpen()
    }

    const handleDelete = (id: string) => {
        deleteEmployee(id)
    }

    const createEmployee = () => {
        setEmployeeUpdate(undefined)
        onOpen()
    }

    const updateEmployee = (values: RegisterEmployee) => {
        const id = employeeUpdate!.id || ''
        updateApi({id, ...values})
        onClose()
    }

    return (
        <Box p={4}>
            <Button rightIcon={<MdAdd/>} onClick={createEmployee} colorScheme='green' float="right">Agregar </Button>
            <Heading p={4}>Administrador</Heading>
            <Stack spacing={4}>

                <FilterTable filter={filter} handleChangeFilter={handleChangeFilter}/>
                {employees && (
                    <TableEmployees data={employees} editEmployee={editEmployee} handleDelete={handleDelete}/>

                )}
                {
                    isOpen && (
                        <ModalForm title="Registrar Empleado" isOpen={isOpen} onClose={onClose}>
                            <FormEmployee handleSubmit={employeeUpdate ? updateEmployee : registerEmployee}
                                          onClose={onClose} data={employeeUpdate || undefined}/>
                        </ModalForm>
                    )
                }
            </Stack>
        </Box>
    )
}

export default AdminPage