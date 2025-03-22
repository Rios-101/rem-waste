import { toast } from "react-toastify";

type voidFn = () => void;
let resetState: voidFn = () => { };

export const APICall = async (
  fn: (...args: any) => Promise<any>,
  args?: any,
  showSuccessToast: boolean = true,
  showLoadingBar: boolean = false
) => {

  try {
    // showLoadingBar && loadingBarRef.current?.continuousStart();
    const response =
      args &&
        typeof args[Symbol.iterator] === "function" &&
        !(typeof args == "string")
        ? await fn(...args)
        : await fn(args);
    if (showSuccessToast) toast(`Success`, { type: "success" });
    // showLoadingBar && loadingBarRef.current?.complete();
    return response;
  } catch (error: any) {
    if (error.response) {
      if (showSuccessToast)
        toast(`Error`, { type: "error" });


      if (error.response.status == 401) {
        resetState();
      }
    }
    // showLoadingBar && loadingBarRef.current?.complete();
    throw error;
  }
};