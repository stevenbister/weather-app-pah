'use client';

import { ChakraProvider as CProvider } from '@chakra-ui/react';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
	return <CProvider>{children}</CProvider>;
}
