import { useState, ChangeEvent, useEffect } from "react";
import useSWR, { mutate } from "swr";
import axios from 'axios'

const fetcher = (url: string) => axios(url).then(res => res.data);

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

// hook for number input
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

// hook to update data
export function useSubmitData(initialValue: any, r: string, t: string) {
  const [value, setValue] = useState(initialValue);
  const [route] = useState<string>(r);
  const [type] = useState<string>(t);

  function handleChange(e: any) {
    setValue(e);
  }

  async function submit(): Promise<boolean> {
    // API - update
    try {
      const response = await axios(route, {
        method: type,
        headers: {
          "Content-Type": "application/json",
        },
        data: value,
      });

      if (response.status === 201 || response.status === 200) {
        return true;
      } else {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return {
    value,
    handleChange,
    submit,
  };
}

// hook to fetch and handle data
export function useFetchData(r: string) {
  const [route] = useState<string>(r);

  const { data, error, isLoading } = useSWR(route, fetcher);

  const revalidate = () => {
    mutate(route);
  };

  return {
    data,
    isLoading,
    isError: error,
    revalidate,
  };
}
