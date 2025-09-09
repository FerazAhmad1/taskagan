import React from "react";

interface SelectProps {
  name: string;
  value: string | number;
  onChangeHandler: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
  className?: string;
  errorMsg?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  value,
  onChangeHandler,
  children,
  errorMsg,
  className,
}) => {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChangeHandler}
        style={{
          WebkitAppearance: "none",
          MozAppearance: "none",
          appearance: "none",
        }}
        className={
          className
            ? className
            : "w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-teal-600"
        }
      >
        {children}
      </select>
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
    </div>
  );
};

export default Select;
