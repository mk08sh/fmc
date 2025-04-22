interface OptionCardProps {
  value: string;
  label: string;
  subheading?: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionCard({ value, label, subheading, isSelected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
        isSelected
          ? 'border-amber-600 bg-amber-50 text-amber-900'
          : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
      }`}
    >
      <p className="font-medium">{label}</p>
      {subheading && (
        <p className="text-sm mt-1 text-gray-600">{subheading}</p>
      )}
    </button>
  );
} 