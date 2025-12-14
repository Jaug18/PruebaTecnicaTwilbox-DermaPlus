import { useState } from 'react';

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!values.name) tempErrors.name = 'Nombre es requerido';
        if (!values.email) tempErrors.email = 'Email es requerido';
        if (!values.phone) tempErrors.phone = 'Teléfono es requerido';
        if (!values.treatment) tempErrors.treatment = 'Tratamiento de interés es requerido';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Aquí se puede manejar el envío del formulario
            alert('Formulario enviado con éxito');
            setValues(initialValues); // Resetear el formulario
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