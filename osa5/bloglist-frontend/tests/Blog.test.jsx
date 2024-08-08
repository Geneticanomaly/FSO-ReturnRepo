import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../src/components/Blog';
import BlogForm from '../src/components/BlogForm';

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

test('renders content', () => {
    render(<Blog blog={blog} />);

    const element = screen.getByText(/The Two Reacts/i);
    expect(element).toBeDefined();
});

test('All blog info is showcased when view button is pressed', async () => {
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

test('like button calls a function when pressed', async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} user={user} updateBlog={mockHandler} />);

    const event = userEvent.setup();
    const button = screen.getByText(/view/i);
    await event.click(button);

    const likeButton = screen.getByRole('button', { name: /like/i });
    expect(likeButton).toBeDefined();

    await event.click(likeButton);
    await event.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
});

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const event = userEvent.setup();
    const createBlog = vi.fn();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const inputTitle = container.querySelector('#blog-title');
    const inputAuthor = container.querySelector('#blog-author');
    const inputUrl = container.querySelector('#blog-url');
    const inputSubmit = container.querySelector('#blog-create');

    await event.type(inputTitle, 'My new title!');
    await event.type(inputAuthor, 'Dan Abramov');
    await event.type(inputUrl, 'testurl.com');
    await event.click(inputSubmit);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('My new title!');
    expect(createBlog.mock.calls[0][0].author).toBe('Dan Abramov');
    expect(createBlog.mock.calls[0][0].url).toBe('testurl.com');
});
