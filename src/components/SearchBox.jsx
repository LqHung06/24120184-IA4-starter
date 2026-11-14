export default function SearchBox({ value, onChange }) {
  return (
    <div className="mb-3 col-12 col-md-6">
      <label htmlFor="product-search" className="form-label">Search products</label>
      <input
        id="product-search"
        type="search"
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
