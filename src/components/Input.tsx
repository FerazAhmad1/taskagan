import React from "react";

interface InputProps {
  type: string;
  name: string;
  value: string | number;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder: string;
  errorMsg: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChangeHandler,
  placeholder,
  errorMsg,
  className,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
        className={
          className
            ? className
            : "w-full  px-4 py-2 border-1 border-gray-200 rounded-lg focus:outline-none focus:border-teal-600"
        }
      />
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </>
  );
};

export default Input;
