import type { SetStateAction } from "react";

export interface IBookItemProps {
    key: string;
    title: string;
    subtitle?: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
}

export interface ISearchBoxProps {
    createUrl: (filter: string, query: string, page: number) => string;
    setBooks: (items: SetStateAction<IBookItemProps[]>) => void
    setLocalSearchQuery: (query: SetStateAction<string>) => void
}

export interface AdvancedFields {
    title: string;
    author: string;
    isbn: string;
    subject: string;
    place: string;
    person: string;
    publisher: string;
}


export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
