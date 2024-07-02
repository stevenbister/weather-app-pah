'use client';

import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	useDisclosure,
	type DrawerProps,
} from '@chakra-ui/react';
import React from 'react';
import { Search } from './Search';

export interface SearchDrawerProps
	extends Omit<DrawerProps, 'isOpen' | 'initialFocusRef' | 'onClose' | 'children'> {
	triggerText: string;
}

export function SearchDrawer({ triggerText, ...rest }: SearchDrawerProps) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const inputRef = React.useRef(null);

	return (
		<>
			<Button onClick={onOpen}>{triggerText}</Button>

			<Drawer isOpen={isOpen} initialFocusRef={inputRef} onClose={onClose} {...rest}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">Search</DrawerHeader>

					<DrawerBody>
						<Search defaultWeatherData={[]} inputRef={inputRef} />
					</DrawerBody>

					<DrawerFooter borderTopWidth="1px">
						<Button variant="outline" mr={3} onClick={onClose}>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
