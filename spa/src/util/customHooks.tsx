import { useState, ChangeEvent, useEffect } from "react";
import useSWR, { mutate } from "swr";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

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
export function useUpdateData(initialValue: any, r: string) {
  const [value, setValue] = useState(initialValue);
  const [route] = useState<string>(r);

  function handleChange(e: any) {
    setValue(e);
  }

  async function update(): Promise<boolean> {
    // API - update
    try {
      const response = await fetch(route, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      if (response.status !== 201) {
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
    update,
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
