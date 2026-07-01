import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  hint?: string;
  rightAction?: { label: string; onPress: () => void };
  isPassword?: boolean;
}

export function Input({ label, hint, rightAction, isPassword, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <Text className="text-[12px] font-bold tracking-[0.5px] uppercase text-text-tertiary mb-[10px]">
        {label}
      </Text>
      <View className="flex-row items-center border-b border-b-[rgba(60,60,67,0.14)] pb-[11px]">
        <TextInput
          className="flex-1 text-[17px] text-text-primary"
          placeholderTextColor="#aeaeb4"
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)} activeOpacity={0.7}>
            <Text className="text-[14px] font-semibold text-primary-dark">
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
        {rightAction && !isPassword && (
          <TouchableOpacity onPress={rightAction.onPress} activeOpacity={0.7}>
            <Text className="text-[14px] font-semibold text-primary-dark">{rightAction.label}</Text>
          </TouchableOpacity>
        )}
      </View>
      {hint && <Text className="text-[12px] text-text-tertiary mt-[9px]">{hint}</Text>}
    </View>
  );
}
