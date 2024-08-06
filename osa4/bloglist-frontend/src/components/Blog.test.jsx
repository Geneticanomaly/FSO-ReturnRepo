import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import Notification from './Notification';

test('renders content', () => {
    const blog = {
        title: 'The Two Reacts',
        author: 'Dan Abramov',
        url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
    };

    render(<Blog blog={blog} />);

    const element = screen.getByText(/The Two Reacts/i);
    expect(element).toBeDefined();
});
