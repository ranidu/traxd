import { View, Text } from 'react-native';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const isSmall = size === 'sm';
  return (
    <View
      className={`items-center justify-center ${isSmall ? 'w-8 h-8 rounded-[8px]' : 'w-9 h-9 rounded-[9px]'} bg-primary`}
    >
      <Text
        className={`text-white font-black tracking-tight ${isSmall ? 'text-[17px]' : 'text-[19px]'}`}
        style={{ letterSpacing: -1 }}
      >
        t
      </Text>
    </View>
  );
}
