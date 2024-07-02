'use client';

import { Link } from '@chakra-ui/next-js';
import { Container, Heading, type ContainerProps } from '@chakra-ui/react';

export interface HeaderProps extends Omit<ContainerProps, 'as' | 'maxW'> {}

export function Header({ ...rest }: HeaderProps) {
	return (
		<Container as="header" maxW="container.lg" {...rest}>
			<Heading as="h1">
				<Link href="/">Next Weather</Link>
			</Heading>
		</Container>
	);
}
