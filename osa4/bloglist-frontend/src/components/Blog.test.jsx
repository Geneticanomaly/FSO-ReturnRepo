import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

test('All blog info is showcased when view button is pressed', async () => {
    const user = {
        token: '',
        username: 'hellas',
        name: 'Arto Hellas',
    };
    const blog = {
        title: 'The Two Reacts',
        author: 'Dan Abramov',
        url: 'https://overreacted.io/things-i-dont-know-as-of-2018/',
        likes: 0,
        user: {
            username: 'hellas',
            name: 'Arto Hellas',
            id: '66aa7132dd35770081cf1b9f',
        },
    };

    render(<Blog blog={blog} user={user} />);

    const title = screen.getByText(/The Two Reacts/i);
    expect(title).toBeDefined();

    const author = screen.getByText(/Dan Abramov/i);
    expect(author).toBeDefined();

    const event = userEvent.setup();
    const button = screen.getByText(/view/i);
    await event.click(button);

    const url = screen.getByText(/https:\/\/overreacted\.io\/things-i-dont-know-as-of-2018\//i);
    expect(url).toBeDefined();

    const likes = screen.getByText(/likes 0/i);
    expect(likes).toBeDefined();

    const publisher = screen.getByText(/Arto Hellas/i);
    expect(publisher).toBeDefined();
});
