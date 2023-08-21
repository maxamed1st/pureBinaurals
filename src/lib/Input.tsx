import { forwardRef, useState } from "react";
import { InputProps } from "../vite-env";

//custom input element
const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  //Set Invalid color only after user leaves the input invalid
  const [Blur, setBlur] = useState(false)
  return (
    <input
      {...props}
      className={`rounded outline-none border-2 
       ${Blur ? "valid:border-success invalid:border-error" : "border-base-300"}`}
      onBlur={() => setBlur(true)}
      required
      ref={forwardedRef}
    />
  )
});

export default Input;