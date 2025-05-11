// hooks/useErrorToast.ts
import { toast } from "react-hot-toast";
import axios from "axios";

export function useErrorToast() {
  /**
   * Shows an error toast using exactly the server’s `message` field
   * (if present), otherwise the error’s own message, otherwise a generic.
   */
  const showError = (err: unknown) => {
    // 1. If Axios error and server returned JSON with `message`, use it:
    if (axios.isAxiosError(err) && err.response?.data) {
      // Sometimes your API might nest it differently; adjust as needed
      const apiMessage = (err.response.data as any).message;
      if (apiMessage) {
        toast.error(apiMessage);
        return;
      }
    }

    // 2. If it's an Error with a message, use that:
    if (err instanceof Error && err.message) {
      toast.error(err.message);
      return;
    }

    // 3. Fallback:
    toast.error("Something went wrong");
  };

  return { showError };
}
