import {useField} from 'formik';
import {Input, FormLabel, FormErrorMessage, FormControl, Select} from "@chakra-ui/react";

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'date' | 'number';
    placeholder?: string;

    [x: string]: any;
}

export const SelectForm = ({label, ...props}: Props) => {
    const [field, meta] = useField(props)

    return (
        <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Select variant='outline' {...field} {...props} />
            {
                Boolean(meta.error && meta.touched) && (
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                )
            }
        </FormControl>
    )
}
