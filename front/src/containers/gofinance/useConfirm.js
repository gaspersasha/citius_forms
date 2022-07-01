import { useState } from 'react';

const useConfirm = ({ handleSubmit, isConsent, handleChange, isLeadgen }) => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isSelected, setSelected] = useState(isConsent);

  const handleChangeSelected = (e) => {
    e.preventDefault();
    setSelected(!isSelected);
    setSubmitted(false);
    handleChange();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!isSubmitted) setSubmitted(true);

    if (!isSelected && isLeadgen) return;

    handleSubmit(e);
  };

  return {
    handleFormSubmit,
    handleChangeSelected,
    isSubmitted,
    isSelected,
  };
};

export default useConfirm;
