import type { AlertProps as ChakraAlertProps } from '@chakra-ui/react';
import { AlertIcon, Alert as ChakraAlert } from '@chakra-ui/react';

export interface AlertProps extends Omit<ChakraAlertProps, 'children'> {
	message: string;
}

export function Alert({ message }: AlertProps) {
	return (
		<ChakraAlert status="error">
			<AlertIcon />
			{message}
		</ChakraAlert>
	);
}
