import React from "react";
import BookItem from "./BookItem";
import type { IBookItemProps } from "../utils/types";

interface IBookListProps {
  items: IBookItemProps[];
}
const BookList: React.FC<IBookListProps> = ({ items }) => {
  return (
    <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {items.map(({ key, ...rest }) => {
        return <BookItem key={key} {...rest} />;
      })}
    </div>
  );
};

export default BookList;
