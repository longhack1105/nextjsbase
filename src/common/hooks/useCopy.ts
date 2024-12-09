import { toastText } from "../func/toast";

export function useCopy(text: string, message?: string) {
  var input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand("copy");
  document.body.removeChild(input);
  toastText({ msg: message ? message : "Copy thành công!" });
  return result;
}
