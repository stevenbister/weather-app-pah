import { Header } from '@/components/Header/Header';
import { fonts } from '@/fonts';
import { ChakraProvider } from '@/providers/ChakraProvider';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Next Weather',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={fonts.rubik.variable}>
			<body>
				<ChakraProvider>
					<Header py={8} />

					<ReactQueryProvider>
						<Box as="main" pb={16}>
							{children}
						</Box>
					</ReactQueryProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
