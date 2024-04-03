import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"

interface IProps {
    isOpen: boolean
    isClose(): void
}

export const ModalSearchUser = ({ isOpen, isClose }: IProps) => {

    return (
        <>
            <Modal closeOnEsc size={'md'} isCentered isOpen={isOpen} onClose={isClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Informe o CPF do cliente</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack gap={5}>
                            <Text>Digite o CPF do cliente que deseja buscar</Text>
                            <Input placeholder="CPF do cliente" />
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Buscar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}