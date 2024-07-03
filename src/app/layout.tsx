import { Header } from '@/components/Header/Header';
import { Search } from '@/components/Search/Search';
import { SearchDrawer } from '@/components/Search/SearchDrawer';
import { fonts } from '@/fonts';
import { ChakraProvider } from '@/providers/ChakraProvider';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { Box, Center, Container, Divider, Flex, Grid, GridItem } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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
			<Flex as="body" minH="100dvh" direction="column">
				<ChakraProvider>
					<Header py={8} />

					<Container maxW="container.xl" pb={16} flex="1 0 auto" display="flex">
						<Grid templateColumns="repeat(12, 1fr)" gap={6} flex="1">
							<GridItem
								as="aside"
								colSpan={{
									base: 12,
									md: 3,
								}}
							>
								<ReactQueryProvider>
									<Box hideBelow="md">
										<Search />
									</Box>
									<Box hideFrom="md">
										<Suspense>
											<SearchDrawer triggerText="Search" placement="top" />
										</Suspense>
									</Box>
								</ReactQueryProvider>
							</GridItem>

							<Center hideBelow="md">
								<Divider orientation="vertical" />
							</Center>

							<GridItem
								as="main"
								colSpan={{
									base: 12,
									md: 8,
								}}
								alignSelf="center"
							>
								{children}
							</GridItem>
						</Grid>
					</Container>
				</ChakraProvider>
			</Flex>
		</html>
	);
}
