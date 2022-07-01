// import { useState, useEffect } from 'react';

// export default function useFormValidation(initialState, validate) {
//   const [values, setValues] = useState(initialState);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     if (!isSubmitting) return;

//     const noErrors = Object.keys(errors).length === 0;

//     if (noErrors) {
//       console.log('submitting form');
//     } else {
//       console.log('NOT submitting form');
//     }

//     setSubmitting(false);
//   }, [errors]);

//   function handleChange(event) {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value,
//     });
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     setSubmitting(true);
//     setErrors(validate(values));
//   }

//   function handleBlur() {
//     setErrors(validate(values));
//   }

//   return {
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     values,
//     errors,
//     isSubmitting,
//   };
// }
