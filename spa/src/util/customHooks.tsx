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
  const [value, setValue] = useState<any>(initialValue);
  const [route] = useState<string>(r);
  const [type] = useState<string>(t);

  function handleChange(e: any) {
    setValue(e);
  }

  async function submit(data? : any): Promise<any | null> {

    // API - update
    try {
      const response = await axios(route, {
        method: type,
        data: value || data,
      });

      if (response.status === 201 || response.status === 200) {
        return response.data;
      }

      return null;
    } catch (error) {
      return null;
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
