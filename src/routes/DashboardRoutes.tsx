import {Route, Routes} from "react-router-dom";
import AdminPage from "../pages/Admin/AdminPage";
import EmployeePage from "../pages/Employee/EmployeePage";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
} from '@chakra-ui/react';
import {setLogout} from "../redux/slices/authSlice";
import {useDispatch} from "react-redux";

export const DashboardRoutes = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {

        dispatch(setLogout())
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Krugel</Box>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={handleLogout}>
                                    Salir
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>
            </Box>

            <Box p={4}>
                <Routes>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/employee" element={<EmployeePage/>}/>
                </Routes>
            </Box>

        </>


    )
}

export default DashboardRoutes