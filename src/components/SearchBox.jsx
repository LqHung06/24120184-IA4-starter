export default function SearchBox({ value, onChange }) {
  return (
    <div className="search">
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
