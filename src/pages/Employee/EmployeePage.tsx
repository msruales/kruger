import {Center, Container, Heading, Progress, Spinner} from "@chakra-ui/react";
import {useGetEmployeeQuery, useUpdateMutation} from "../../service/employeeApi";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../redux/slices/authSlice";
import FormEmployeeExtend from "./FormEmployeeExtend";
import {useEffect} from "react";
import {useToast} from '@chakra-ui/react'

export const EmployeePage = () => {

    const currentUser = useSelector(selectCurrentUser)
    const [update, {isLoading: isLoadingUpdate, isSuccess, isError, error}] = useUpdateMutation()
    const {data: currentEmployee, isLoading} = useGetEmployeeQuery(currentUser!.id)
    const toast = useToast()
    const handleSubmit = (values: any) => {

        update({...values})
    }

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'Guardado',
                status: 'success',
                duration: 1000,
                isClosable: true,
            })
        }
        if (isError && error) {
            toast({
                title:  (error as any).data,
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
        }
    }, [isSuccess, isError])


    if (isLoading) {
        return (<Progress/>)
    }

    return (
        <Container>
            <Heading p={4}>Empleado</Heading>
            <Center bg='transparent' h='auto'>
                <FormEmployeeExtend employee={currentEmployee} isLoading={isLoadingUpdate} handleSubmit={handleSubmit}/>
            </Center>
        </Container>
    )
}
export default EmployeePage