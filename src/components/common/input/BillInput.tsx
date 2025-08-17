interface BillInputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { label: string; value: string }[];
  className?: string;
}

const BillInput = ({ label, name, type, value, placeholder, onChange, options, className }: BillInputProps) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 mb-2">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full p-2 border rounded-md"
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">-- Select --</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full p-2 border rounded-md"
        />
      )}
    </div>
  );
};

export default BillInput;
