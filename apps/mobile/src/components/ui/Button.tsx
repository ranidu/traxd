import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  loading?: boolean;
}

export function Button({ label, loading, disabled, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-[52px] bg-primary rounded-[14px] items-center justify-center"
      activeOpacity={0.85}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-[17px] font-bold">{label}</Text>
      )}
    </TouchableOpacity>
  );
}
