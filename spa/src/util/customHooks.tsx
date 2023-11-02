import { useState, ChangeEvent } from "react";

// Hook for opening and closing modals
export function useModal(initialValue: boolean) {
  const [show, setShow] = useState(initialValue);

  function handleOpen() {
    setShow(!show);
  }

  function handleClose() {
    setShow(!show);
  }

  return {
    show,
    handleOpen,
    handleClose,
  };
}

// Hook for string input in forms
export function useFormStringInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleLoad(e: string) {
    setValue(e);
  }

  function handleReset() {
    setValue("");
  }

  return {
    value,
    handleLoad,
    handleChange,
    handleReset,
  };
}

// Hook for number input in forms
export function useFormNumberInput(initialValue: number) {
  const [value, setValue] = useState(initialValue || 1);

  // Handler for onChange of the input
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(Number(e.target.value));
  }

  // Function to load a value
  function handleLoad(valor: number) {
    setValue(valor);
  }

  // Function to reset the value
  function handleReset() {
    setValue(1);
  }

  return {
    value,
    handleOnChange,
    handleLoad,
    handleReset,
  };
}
