import { useState, ChangeEvent } from "react";
import useSWR, { mutate } from "swr";
import axios, { AxiosError } from "axios";
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
  const [value, setValue] = useState<string>(initialValue);

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
  const [isValid, setIsValid] = useState<boolean>(
    regex.test(initialValue || "")
  );

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
export function useSubmitData(route: string, type: string) {
  async function submit(data: any): Promise<any | null> {
    try {
      const response = await axios(route, {
        method: type,
        data: data,
      });

      if (response.status === 201 || response.status === 200) {
        const responseData = await response.data;
        return { data: responseData, error: null };
      }
    } catch (res: any) {
      const errorMessage = res.response.data.error || "An error occurred";
      return { data: null, error: errorMessage };
    }
  }

  return {
    submit,
  };
}

// hook to delete data
export function useDeleteData(route: string) {
  async function del(): Promise<any | null> {
    try {
      const response = await axios(route, {
        method: "DELETE",
      });

      if (response.status === 201 || response.status === 200) {
        const responseData = await response.data;
        return { data: responseData, error: null };
      }
    } catch (res: any) {
      const errorMessage = res.response.data.error || "An error occurred";
      return { data: null, error: errorMessage };
    }
  }

  return {
    del,
  };
}

// hook to fetch and handle data
export function useFetchData(r: string) {
  const { data, error, isLoading } = useSWR(r, fetcher, {
    revalidateOnMount: true,
    shouldRetryOnError: false,
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
