// TODO: in real life knowing project requirements, MAYBE (that's a big maybe) would make this more generic and reusable with input type.
interface FormFieldProps {
  label: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const FormInput = ({
  label,
  required = false,
  value,
  placeholder,
  onChange,
}: FormFieldProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type="text"
        className="w-full px-3 py-2 border rounded-md"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
