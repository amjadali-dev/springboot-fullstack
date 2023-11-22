import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertIcon, Box, Button, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className='error' status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};


// And now we can use these
const LoginForm = () => {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}

                validationSchema={Yup.object({
                    username: Yup.string()
                        .email('Must be valid email address')
                        .required('Username is required'),
                    password: Yup.string()
                        .max(20, "Password cannot be more than 20 characters")
                        .required('Required'),
                })}

                onSubmit={(values, { setSubmitting }) => {
                    login(values).then((response) => {
                        setSubmitting(true)
                        navigate("/dashboard")
                        console.log("login response " + JSON.stringify(response.data))
                    }).catch((err) => {
                        console.log(err)
                    }).finally(() => {
                        setSubmitting(false)
                    })
                }}
            >
                {({ isSubmitting, isValid }) => {
                    return <>
                        <Form>
                            <Stack spacing={"10px"}>
                                <MyTextInput
                                    label="Username"
                                    name="username"
                                    type="text"
                                    placeholder="User@gmail.com"
                                />

                                <MyTextInput
                                    label="Password"
                                    name="password"
                                    type="text"
                                    placeholder="Type your password"
                                />
                                <Button isDisabled={!isValid || isSubmitting} type="submit">Submit</Button>
                            </Stack>
                        </Form>
                    </>
                }
                }

            </Formik>
        </>
    );
};

export default LoginForm