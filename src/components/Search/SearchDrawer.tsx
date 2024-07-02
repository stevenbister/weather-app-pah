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
} from '@chakra-ui/react';
import React from 'react';
import { Search } from './Search';

export function SearchDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const inputRef = React.useRef(null);

	return (
		<>
			<Button onClick={onOpen}>Search</Button>

			<Drawer isOpen={isOpen} placement="left" initialFocusRef={inputRef} onClose={onClose}>
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
