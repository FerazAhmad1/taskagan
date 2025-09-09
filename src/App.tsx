import { useState, useEffect, useRef } from "react";
import BookList from "./components/BookList";
import img from "./utils/logos/libraryLogo.png";
import type { IBookItemProps } from "./utils/types";
import SearchBox from "./components/SearchBox";
import { buildSearchUrl } from "./utils/functions/Helper";
import Input from "./components/Input";
import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";

function App() {
  const [allBooks, setAllBooks] = useState<IBookItemProps[]>([]); // original data
  const [books, setBooks] = useState<IBookItemProps[]>([]); // displayed data

  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchRef = useRef<number | null>(null);

  const options: IFuseOptions<IBookItemProps> = {
    keys: ["author_name", "language", "first_publish_year", "title"], // match real fields
    threshold: 0.3,
  };

  useEffect(() => {
    if (allBooks.length === 0) return;

    if (searchQuery.trim().length === 0) {
      setBooks(allBooks); // reset to all books when query is empty
      return;
    }

    searchRef.current = setTimeout(() => {
      const fuse = new Fuse(allBooks, options);
      const result = fuse.search(searchQuery).map((r) => r.item); // extract items

      setBooks(result);
    }, 300);

    return () => {
      if (searchRef.current) clearTimeout(searchRef.current);
    };
  }, [searchQuery, allBooks]);

  return (
    <div className="flex flex-col px-8 py-4 gap-8">
      <div className="flex flex-col  sticky top-4 md:flex-row md:justify-between md:items-center ">
        <img
          src={img}
          alt="Library logo"
          className="h-20 inline-block m-[-20px]"
        />
        <SearchBox
          setBooks={(newBooks) => {
            setAllBooks(newBooks); // save original
            setBooks(newBooks); // show original initially
          }}
          createUrl={buildSearchUrl}
          setLocalSearchQuery={setSearchQuery}
        />
      </div>

      <Input
        type="text"
        name="search"
        value={searchQuery}
        onChangeHandler={(e) => setSearchQuery(e.target.value.trim())}
        placeholder="Search..."
        errorMsg=""
        className="border border-gray-300 rounded-lg px-3 py-2 outline-none
             shadow-sm focus:shadow-lg transition md:w-1/2 sticky top-28 "
      />

      <BookList items={books} />
    </div>
  );
}

export default App;
