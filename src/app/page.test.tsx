import { render, screen } from '@testing-library/react';
import Page from './page';

describe('Page', () => {
	it('renders a heading', () => {
		render(<Page />);

		expect(screen.getByText('Search for a city')).toBeInTheDocument();
	});
});
