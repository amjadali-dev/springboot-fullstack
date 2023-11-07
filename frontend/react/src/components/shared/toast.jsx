function Toast(title,description,status,duration,isClosable) {
    const toast = useToast()
    return (
      <Button
        onClick={() =>
          toast({
            title: {title},
            description:{description},
            status: {status},
            duration: {duration},
            isClosable: {isClosable},
          })
        }
      >
        Show Toast
      </Button>
    )
  }

  export default Toast