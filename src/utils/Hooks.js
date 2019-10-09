import {useState} from 'react';

// Form handler custom hook. Takes a callback to be triggered on form Submit
// Provides onSubmit and onChange handlers
const useForm = (callback, initialValues) => {
  const [inputs, setInputs] = useState({...initialValues});

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    callback();
  }
  const handleInputChange = event => {
    event.persist();
    setInputs (inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}
export default useForm;
