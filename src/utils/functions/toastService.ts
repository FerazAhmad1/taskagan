// utils/toastService.ts
import { toast } from "react-toastify";

export const notify = {
    success: (msg: string) =>
        toast.success(msg, { toastId: msg }), // toastId prevents duplicates
    error: (msg: string) => toast.error(msg, { toastId: msg }),
    info: (msg: string) => toast.info(msg, { toastId: msg }),
    warning: (msg: string) => toast.warning(msg, { toastId: msg }),
};
