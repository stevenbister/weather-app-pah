import { Container } from '@chakra-ui/react';

export default function PageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Container maxW="container.lg">{children}</Container>;
}
