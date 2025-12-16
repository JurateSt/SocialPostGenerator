interface FormNumberProps {
  label: string;
  required?: boolean;
  value: number | "";
  placeholder?: string;
  min?: number;
  step?: number;
  onChange: (value: number | "") => void;
}

export const FormNumber = ({
  label,
  required = false,
  value,
  placeholder,
  min,
  step = 1,
  onChange,
}: FormNumberProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type="number"
        className="w-full px-3 py-2 border rounded-md"
        value={value}
        placeholder={placeholder}
        min={min}
        step={step}
        onChange={(e) => {
          const v = e.target.value;
          onChange(v === "" ? "" : Number(v));
        }}
      />
    </div>
  );
};
