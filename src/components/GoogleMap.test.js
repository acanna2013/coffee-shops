import { render, screen } from '@testing-library/react';
import GoogleMap from './GoogleMap';

test('renders learn react link', () => {
  render(<GoogleMap />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
