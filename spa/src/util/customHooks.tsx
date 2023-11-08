import { useState, ChangeEvent } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { fetcher } from "./swrFetcher";

// hook for opening and closing modals
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

// hook for string input
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

// hook for string input with regex
export function useFormStringInputWithRegex(
  initialValue: string | undefined,
  regex: RegExp
) {
  const [value, setValue] = useState(initialValue || "");
  const [isValid, setIsValid] = useState<boolean>(regex.test(initialValue || ""));

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const inputIsValid = regex.test(inputValue);
    setIsValid(inputIsValid);
    setValue(inputValue);
  }

  function handleLoad(e: string | undefined) {
    setValue(e || "");
    setIsValid(regex.test(e || ""));
  }

  function handleReset() {
    setValue("");
    setIsValid(false);
  }

  return {
    value,
    isValid,
    handleLoad,
    handleChange,
    handleReset,
  };
}

export function useFormSelectBox(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
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

// hook for number input
export function useFormNumberInput(initialValue: number) {
  const [value, setValue] = useState(initialValue || 1);

  // Handler for onChange of the input
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
    handleChange,
    handleLoad,
    handleReset,
  };
}

// hook to update data
export function useSubmitData(initialValue: any, r: string, t: string) {
  const [route] = useState<string>(r);
  const [type] = useState<string>(t);

  async function submit(data: any): Promise<any | null> {
    // API - update
    try {
      const response = await axios(route, {
        method: type,
        data:  data,
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.data;
        return data;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  return {
    submit,
  };
}

// hook to fetch and handle data
export function useFetchData(r: string) {

  const { data, error, isLoading } = useSWR(r, fetcher, {
    revalidateOnMount: true,
  });

  const revalidate = () => {
    mutate(r);
  };

  return {
    data,
    isLoading,
    isError: error,
    revalidate,
  };
}
