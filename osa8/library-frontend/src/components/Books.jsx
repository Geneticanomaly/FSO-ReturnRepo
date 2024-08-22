import { gql, useQuery } from '@apollo/client';

const Books = () => {
    const ALL_BOOKS = gql`
        query {
            allBooks {
                title
                author {
                    name
                }
                published
            }
        }
    `;

    const result = useQuery(ALL_BOOKS);

    if (result.loading) {
        return <div>Loading...</div>;
    }

    const books = result.data.allBooks;

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
