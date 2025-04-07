export default function SearchBar({ value, onChange }) {
    return (
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search by name or ID..."
        className="w-full p-2 border rounded shadow-sm"
      />
    );
  }  