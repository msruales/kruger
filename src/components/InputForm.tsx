import {useField} from 'formik';
import {Input, FormLabel, FormErrorMessage, FormControl} from "@chakra-ui/react";

interface Props {
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password' | 'date' | 'number';
    placeholder?: string;

    [x: string]: any;
}

export const InputForm = ({label, ...props}: Props) => {
    const [field, meta] = useField(props)

    return (
        <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input variant='outline' {...field} {...props} />
            {
                Boolean(meta.error && meta.touched) && (
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                )
            }
        </FormControl>
    )
}

// function errorMessageExample() {
//     const [input, setInput] = useState('')
//
//     const handleInputChange = (e) => setInput(e.target.value)
//
//     const isError = input === ''
//
//     return (
//         <FormControl isInvalid={isError}>
//             <FormLabel htmlFor='email'>Email</FormLabel>
//             <Input
//                 id='email'
//                 type='email'
//                 value={input}
//                 onChange={handleInputChange}
//             />
//             {!isError ? (
//                 <FormHelperText>
//                     Enter the email you'd like to receive the newsletter on.
//                 </FormHelperText>
//             ) : (
//                 <FormErrorMessage>Email is required.</FormErrorMessage>
//             )}
//         </FormControl>
//     )
// }
