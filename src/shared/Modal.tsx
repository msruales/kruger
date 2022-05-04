import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button
} from "@chakra-ui/react";
import {ReactNode} from "react";

interface Props {
    title: string,
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

export const ModalForm = ({title, isOpen, onClose, children}: Props) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton/>
                    {/*<ModalBody>*/}
                        {children}
                    {/*</ModalBody>*/}
                    {/*<ModalFooter>*/}
                    {/*    <Button colorScheme='blue' mr={3} onClick={onClose}>*/}
                    {/*        Close*/}
                    {/*    </Button>*/}
                    {/*    <Button variant='ghost'>Secondary Action</Button>*/}
                    {/*</ModalFooter>*/}
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalForm