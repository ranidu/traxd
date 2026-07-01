import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Link } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
        {/* Logo + app name */}
        <View className="flex-row items-center gap-[9px] mb-10">
          <Logo size="sm" />
          <Text className="text-[17px] font-bold text-text-primary">Traxd</Text>
        </View>

        {/* Title */}
        <Text
          className="text-text-primary font-black"
          style={{ fontSize: 38, letterSpacing: -0.8, lineHeight: 40 }}
        >
          Welcome
        </Text>
        <Text className="text-[16px] text-text-secondary mt-3 mb-10">
          Log in to keep tracking.
        </Text>

        {/* Fields */}
        <View className="gap-[30px]">
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
            textContentType="password"
            rightAction={{
              label: 'Forgot?',
              onPress: () => {},
            }}
          />
        </View>

        {/* CTA */}
        <Button label="Log in" loading={loading} onPress={handleLogin} className="mt-10" />

        {/* Sign up link */}
        <View className="mt-[18px] items-center">
          <Text className="text-[14px] font-semibold text-text-secondary">
            New here?{' '}
            <Link href="/register" asChild>
              <Text className="text-primary-dark font-bold">Create account</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
