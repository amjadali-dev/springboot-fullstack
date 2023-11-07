import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react"
import React from "react"
import UpdateCustomerForm from "./UpdateCustomerForm"
import { color } from "framer-motion"

function UpdateCustomerDrawer({ initialValues, fetchCustomers }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="blackAlpha"
        onClick={onOpen}
        color={'blackAlpha.900'}
        rounded={'full'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg'
        }}

      >
        Update
      </Button>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update Customer</DrawerHeader>

          <DrawerBody>
            <UpdateCustomerForm
              initialValues={initialValues}
              fetchCustomers={fetchCustomers}
            >

            </UpdateCustomerForm>
          </DrawerBody>

          <DrawerFooter>
            <Button
              mr={3}
              onClick={onClose}

              leftIcon={<LeftIcon />}
              colorScheme="teal"
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const LeftIcon = () => "x"

export default UpdateCustomerDrawer