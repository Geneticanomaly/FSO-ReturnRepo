const loginWith = async (page, username, password) => {
    await page.getByRole('textbox').first().fill(username);
    await page.getByRole('textbox').last().fill(password);
    await page.getByRole('button', { name: 'login' }).click();
};

const createBlog = async (page, textboxes, title, author, url) => {
    await textboxes[0].fill(title);
    await textboxes[1].fill(author);
    await textboxes[2].fill(url);
    await page.getByRole('button', { name: 'create' }).click();
};

export { loginWith, createBlog };
