import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Input from "./Input";
import Option from "./Option";
import ToastProvider from "./ToastProvider";
import { notify } from "../utils/functions/toastService.ts";
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import type { ISearchBoxProps, AdvancedFields } from "../utils/types";

const SearchBox: React.FC<ISearchBoxProps> = ({ createUrl, setBooks }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const page = Number(searchParams.get("page")) || 1;
  // const checkFilter = searchParams.get("filter");
  // const checkQuery = searchParams.get("q");

  const [searchQuery, setSearchQuery] = useState("flammable");
  const [filter, setFilter] = useState("All");
  const [showAdvanced, setShowAdvanced] = useState(false);
  // https://openlibrary.org/works/OL46566W/The_Girl_in_the_Flammable_Skirt?edition=key%3A/books/OL696962M

  // Advanced fields
  const [advancedFields, setAdvancedFields] = useState<AdvancedFields>({
    title: "",
    author: "",
    isbn: "",
    subject: "",
    place: "",
    person: "",
    publisher: "",
  });

  const searchRef = useRef<number | null>(null);

  const options = [
    ["All", "All"],
    ["author", "Author"],
    ["title", "Title"],
    ["text", "Text"],
    ["subject", "Subject"],
    ["lists", "Lists"],
    ["advanced", "Advanced"],
  ];

  useEffect(() => {
    if (filter === "advanced") {
      setShowAdvanced(true);
      return;
    }

    if (searchQuery.trim().length == 0) return;
    searchRef.current = setTimeout(() => {
      const value = createUrl(filter, searchQuery, page);

      const items = async (url: string) => {
        try {
          const value = await axios.get(url);
          const data = value.data.docs;

          setBooks(data ? data : []);

          const urlObj = new URL(url);
          const params = urlObj.searchParams;
          searchParams.set("filter", filter);
          searchParams.set("q", params.get("q") || "");
          searchParams.set("mode", params.get("mode") || "everything");
          searchParams.set("page", params.get("page") || "1");
          window.history.replaceState(
            {},
            "",
            `${window.location.pathname}?${searchParams.toString()}`
          );
          console.log(data, "EEEEEEEEEEEEE");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios-specific error
            const message =
              error.response?.data?.message ||
              error.message ||
              "Failed to fetch books. Please try again!";
            notify.error(message);
          } else if (error instanceof Error) {
            // Generic JS error
            notify.error(error.message);
          } else {
            // Fallback for non-Error types
            notify.error("An unknown error occurred.");
          }
        }
      };
      items(value);
    }, 500);

    return () => {
      if (searchRef.current) clearTimeout(searchRef.current);
    };
  }, [searchQuery, filter]);

  // Handle advanced search
  const handleAdvancedSearch = async () => {
    const query = Object.entries(advancedFields)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, val]) => val.trim().length > 0)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");

    const url = `https://openlibrary.org/search.json?${query}`;
    try {
      const response = await axios.get(url);
      setBooks(response.data.docs || []);
      setShowAdvanced(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch books. Please try again!";
        notify.error(message);
      } else if (error instanceof Error) {
        // Generic JS error
        notify.error(error.message);
      } else {
        // Fallback for non-Error types
        notify.error("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      {/* Main Search Box */}
      <div className="flex items-center w-full max-w-xl rounded-xl overflow-hidden shadow-sm border border-gray-300 bg-white">
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="appearance-none bg-white text-gray-800 px-4 py-2 pr-8 border-none focus:outline-none focus:ring-0"
          >
            {options.map(([val, label]) => (
              <Option key={val} value={val}>
                {label}
              </Option>
            ))}
          </select>

          <ChevronDownIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-800 pointer-events-none" />
        </div>

        <div className="flex-1">
          <Input
            type="text"
            name="search"
            value={searchQuery}
            onChangeHandler={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            errorMsg=""
            className="border-0 outline-0"
          />
        </div>

        <button className="px-4 text-gray-600 hover:text-gray-900">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Advanced Search Modal */}
      {showAdvanced && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setShowAdvanced(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Advanced Search</h2>
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(advancedFields) as (keyof AdvancedFields)[]).map(
                (field) => (
                  <Input
                    key={field}
                    type="text"
                    name={field}
                    value={advancedFields[field]}
                    onChangeHandler={(e) =>
                      setAdvancedFields((prev) => ({
                        ...prev,
                        [field]: e.target.value,
                      }))
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    errorMsg=""
                  />
                )
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleAdvancedSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastProvider />
    </div>
  );
};

export default SearchBox;
