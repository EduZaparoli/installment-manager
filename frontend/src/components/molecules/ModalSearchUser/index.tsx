import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface IProps {
    isOpen: boolean
    isClose(): void,
    modalTitle: string,
    showInput?: boolean
}

export const ModalSearchUser = ({ isOpen, isClose, modalTitle, showInput = false }: IProps) => {
    const [documentNumber, setDocumentNumber] = useState('')
    const [email] = useState('edu@gmail.com')
    const router = useRouter()

    const handleUser = () => {
        if (documentNumber === '012.984.421-68') {
            router.push('/selectInstallmentsAdvance')
        }
    }

    return (
        <>
            <Modal closeOnEsc size={'md'} isCentered isOpen={isOpen} onClose={isClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {showInput &&
                            <Stack gap={5}>
                                <Text>Digite o CPF do cliente que deseja buscar</Text>
                                <Input value={documentNumber} onChange={(event) => setDocumentNumber(event.target.value)} placeholder="CPF do cliente" />
                            </Stack>
                        }
                        {!showInput &&
                            <Stack gap={'5px'}>
                                <Text>O boleto de pagamento vai ser enviado para o e-mail: </Text>
                                <Text fontWeight={'medium'}>{email}</Text>
                            </Stack>
                        }
                    </ModalBody>

                    <ModalFooter>
                        {showInput &&
                            <Button onClick={handleUser} colorScheme='blue' mr={3}>
                                Buscar
                            </Button>
                        }
                        {!showInput &&
                            <Button onClick={handleUser} colorScheme='blue' mr={3}>
                                Enviar
                            </Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}