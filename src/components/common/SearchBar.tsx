// src/components/common/SearchBar.tsx
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search..", onSearch }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-8">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-white-100 border-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
        onClick={() => onSearch("")}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;