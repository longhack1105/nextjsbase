import { BiErrorCircle } from "react-icons/bi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

export const toastText = ({ msg }: { msg: string }) =>
  toast(msg, {
    position: "bottom-center",
    autoClose: 3000,
    closeButton: false,
    className: "toastify-custom toastify-custom-warn",
    icon: BiErrorCircle,
    progressStyle: {
      background: "#ff8800",
    },
  });
export const toastSuccess = ({ msg }: { msg: string }) => {
  return toast(msg, {
    position: "bottom-center",
    autoClose: 3000,
    closeButton: false,
    className: "toastify-custom toastify-custom-success",
    icon: FaRegCircleCheck,
    progressStyle: {
      background: "#51CC57",
    },
  });
};

export const toastInfo = ({ msg }: { msg: string }) =>
  toast(msg, {
    position: "bottom-center",
    autoClose: 3000,
    closeButton: false,
    className: "toastify-custom toastify-custom-info",
    icon: BiErrorCircle,
    progressStyle: {
      background: "#5099f8",
    },
  });

export const toastWarn = ({ msg }: { msg: string }) =>
  toast(msg, {
    position: "bottom-center",
    autoClose: 3000,
    closeButton: false,
    className: "toastify-custom toastify-custom-warn",
    icon: BiErrorCircle,
    progressStyle: {
      background: "#ff8800",
    },
  });

export const toastError = ({ msg }: { msg: string }) =>
  toast(msg, {
    position: "bottom-center",
    autoClose: 3000,
    closeButton: false,
    className: "toastify-custom toastify-custom-error",
    icon: BiErrorCircle,
    progressStyle: {
      background: "#f85050",
    },
  });
