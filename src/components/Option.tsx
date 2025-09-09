import React from "react";

interface OptionProps {
  value: string | number;
  children: React.ReactNode;
}

const Option: React.FC<OptionProps> = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

export default Option;
