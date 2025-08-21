import React from 'react';
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    onClear?: () => void;
}

const SearchBar = ({ placeholder = "Search...", onSearch, onClear }: SearchBarProps) => {
    const [query, setQuery] = React.useState("");

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleClear = () => {
        setQuery("");
        if (onClear) {
            onClear();
        }
    };

    return (
        <div className="flex items-center bg-stone-50 rounded-full shadow-md p-2 w-2/12 h-10">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-grow px-4 py-2 rounded-full focus:outline-none bg-stone-50 font-normal text-stone-600"
            />
            <div className="flex items-center mr-4 ml-2 text-stone-600">
                {query === "" ? (
                    <button onClick={handleSearch}>
                        <FaSearch />
                    </button>
                ) : (
                    <button onClick={handleClear}>
                        <FaTimes />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;