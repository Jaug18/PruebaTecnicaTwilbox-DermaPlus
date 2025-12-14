import { useState, ChangeEvent, FormEvent } from 'react';

interface FormValues {
    name?: string;
    email?: string;
    phone?: string;
    treatment?: string;
    [key: string]: string | undefined;
}

interface FormErrors {
    [key: string]: string;
}

const useForm = (initialValues: FormValues) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validate = () => {
        const tempErrors: FormErrors = {};
        if (!values.name) tempErrors.name = 'Nombre es requerido';
        if (!values.email) tempErrors.email = 'Email es requerido';
        if (!values.phone) tempErrors.phone = 'Teléfono es requerido';
        if (!values.treatment) tempErrors.treatment = 'Tratamiento de interés es requerido';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            alert('Formulario enviado con éxito');
            setValues(initialValues);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;