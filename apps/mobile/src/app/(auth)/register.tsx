import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    // TODO: wire up auth
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: insets.top + 56, paddingBottom: insets.bottom + 28, paddingHorizontal: 28 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View className="w-9 h-9 rounded-[11px] bg-card border border-[rgba(60,60,67,0.09)] items-center justify-center mb-[26px]">
          <Logo size="sm" />
        </View>

        {/* Title */}
        <Text
          className="text-text-primary font-black"
          style={{ fontSize: 38, letterSpacing: -0.8, lineHeight: 40 }}
        >
          Create
        </Text>
        <Text className="text-[16px] text-text-secondary mt-3 mb-9">
          Start tracking what matters.
        </Text>

        {/* Fields */}
        <View className="gap-[26px]">
          <Input
            label="Full name"
            placeholder="Your name"
            value={fullName}
            onChangeText={setFullName}
            textContentType="name"
            autoCapitalize="words"
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            isPassword
            textContentType="newPassword"
            hint="At least 8 characters"
          />
        </View>

        {/* CTA */}
        <Button label="Create account" loading={loading} onPress={handleRegister} className="mt-[18px]" />

        {/* Terms */}
        <Text className="text-[12px] text-text-tertiary text-center mt-6 leading-relaxed">
          By continuing you agree to our{' '}
          <Text className="text-primary-dark font-semibold">Terms</Text>
          {' '}and{' '}
          <Text className="text-primary-dark font-semibold">Privacy Policy</Text>.
        </Text>

        {/* Log in link */}
        <View className="mt-6 items-center">
          <Text className="text-[15px] text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" asChild>
              <Text className="text-primary-dark font-bold">Log in</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
