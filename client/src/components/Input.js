export default function Input({ value, setValue, label, type }) {
  const divStyle = {
    padding: "30px",

    marginLeft: "10px",
  };
  const labelStyle = {
    marginLeft: "10px",
    fontSize: 20,
  };
  const inputStyle = {
    display: "flex",
    marginLeft: "10px",
  };
  return (
    <div className="mb-3" style={divStyle}>
      <label className="form-label" style={labelStyle}>
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        className="form-control"
        style={inputStyle}
      />
    </div>
  );
}
