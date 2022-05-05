import {
    Flex,
    Box,
    Stack,
    Button,
    Heading,
    useColorModeValue, useToast,
} from '@chakra-ui/react';
import {useLoginMutation} from "../service/authApi";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../../redux/slices/authSlice";
import {Formik} from "formik";
import {validationLogin} from "./schema/Schema";
import {InputForm} from "../../../components";
import {useEffect} from "react";


export const Login = () => {

    const [login, {isLoading, isError, error}] = useLoginMutation();
    const dispatch = useDispatch();
    const toast = useToast()

    const handleClick = async (values: any) => {
        const {accessToken, user} = await login(values).unwrap()
        dispatch(setCredentials({token: accessToken, user}))
    }

    useEffect(() => {
        if (isError && error) {
            toast({
                title:  (error as any).data,
                status: 'error',
                duration: 1000,
                isClosable: true,
            })
        }
    }, [isError])

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>LOGIN</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={5}>
                        <Formik initialValues={{
                            email: '',
                            password: '',

                        }} validationSchema={validationLogin}
                                onSubmit={handleClick}>
                            {
                                (formik) => (
                                    <>
                                        <InputForm label="Email" name="email" autoFocus/>
                                        <InputForm label="Contraseña" name="password" type="password"/>
                                        <Stack spacing={10}>
                                            <Button
                                                isLoading={isLoading}
                                                onClick={formik.submitForm}
                                                bg={'blue.400'}
                                                color={'white'}
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}>
                                                Sign in
                                            </Button>
                                        </Stack>

                                    </>
                                )
                            }
                        </Formik>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Login