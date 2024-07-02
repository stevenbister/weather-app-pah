'use client';

import { theme } from '@/theme';
import { ChakraProvider as CProvider } from '@chakra-ui/react';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
	return <CProvider theme={theme}>{children}</CProvider>;
}
