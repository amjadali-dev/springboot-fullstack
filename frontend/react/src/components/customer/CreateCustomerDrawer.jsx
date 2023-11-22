import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react"
import CreateCustomerForm from "./CreateCustomerForm"

const CreateCustomerDrawer = ({fetchCustomers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button
                leftIcon={<LeftIcon />}
                onClick={onOpen}
                colorScheme="pink"
            >
                Create Customer
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Add new Customer</DrawerHeader>

                    <DrawerBody>
                        <CreateCustomerForm
                            fetchCustomers={fetchCustomers}
                        />
                    </DrawerBody>

                    <DrawerFooter>

                        <Button
                            leftIcon={<CloseIcon />}
                            onClick={onClose}
                            colorScheme="teal"
                        >
                            Close
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

const LeftIcon = () => "+"
const CloseIcon = () => "x"

export default CreateCustomerDrawer