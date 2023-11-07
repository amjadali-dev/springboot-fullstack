import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { updateCustomer } from '../services/client';
import { Alert, AlertIcon, Button, FormLabel, Input, Select, Stack } from '@chakra-ui/react';

const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
        <>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className='error' status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert className='error' status={"error"} mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </div>
    );
};

// And now we can use these
const UpdateCustomerForm = ({ initialValues, fetchCustomers }) => {
    return (
        <>
            <Formik
                initialValues={{
                    name: initialValues.name,
                    age: initialValues.age,
                    email: initialValues.email,
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    age: Yup.number()
                        .min(16, "Must be atleast 16 years of age")
                        .max(100, "Must be lass than 100 years")
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)

                    updateCustomer(values, initialValues.id)
                        .then(result => {
                            console.log(result.data)
                            fetchCustomers()
                        })
                        .catch(error => console.log(error))
                        .finally(() => setSubmitting(false))
                }}
            >
                {({ isSubmitting, isValid, dirty }) => {
                    return <>
                        <Form>
                            <Stack spacing={"10px"}>
                                <MyTextInput
                                    label="Name"
                                    name="name"
                                    type="text"
                                    placeholder="Jane"
                                />

                                <MyTextInput
                                    label="Age"
                                    name="age"
                                    type="Number"
                                    placeholder="0"
                                />

                                <MyTextInput
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="jane@formik.com"
                                />

                                <Button isDisabled={!isValid || isSubmitting || !dirty} type="submit">Submit</Button>
                            </Stack>
                        </Form>
                    </>

                }}

            </Formik >
        </>
    );
};

export default UpdateCustomerForm