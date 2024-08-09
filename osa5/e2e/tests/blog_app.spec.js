const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog, addUser } = require('./helper');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset');
        await addUser(request, 'Matti Luukkainen', 'mluukkai', 'salainen');
        await page.goto('http://localhost:5173/');
    });

    test('Login form is displayed', async ({ page }) => {
        const header = page.getByText('Login to application');
        await expect(header).toBeVisible();

        const inputUsername = page.getByRole('textbox').first();
        await expect(inputUsername).toBeVisible();

        const inputPassword = page.getByRole('textbox').last();
        await expect(inputPassword).toBeVisible();

        const button = page.getByRole('button', { name: 'login' });
        await expect(button).toBeVisible();
    });

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'salainen');

            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
        });
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'dannylee', 'wrong');

            await expect(page.getByText('invalid username or password')).toBeVisible();
            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible();
        });

        describe('when logged in', () => {
            beforeEach(async ({ page }) => {
                await loginWith(page, 'mluukkai', 'salainen');
            });
            test('a new blog can be created', async ({ page }) => {
                await page.getByRole('button', { name: 'new blog' }).click();

                const textboxes = await page.getByRole('textbox').all();

                await createBlog(
                    page,
                    textboxes,
                    'a blog created by playwright',
                    'playwright',
                    'https://playwright.dev/'
                );

                const titleDiv = page.locator('.blog-title');
                await expect(titleDiv).toContainText('a blog created by playwright');
            });
            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'new blog' }).click();

                const textboxes = await page.getByRole('textbox').all();

                await createBlog(
                    page,
                    textboxes,
                    'a blog created by playwright',
                    'playwright',
                    'https://playwright.dev/'
                );

                await page.getByRole('button', { name: 'view' }).click();
                const blogLikes = page.locator('.blog-likes p');
                await expect(blogLikes).toContainText('likes 0');
                await page.getByRole('button', { name: 'like' }).click();
                await expect(blogLikes).toContainText('likes 1');
            });
            test('a blog can be deleted', async ({ page }) => {
                await page.getByRole('button', { name: 'new blog' }).click();

                const textboxes = await page.getByRole('textbox').all();

                await createBlog(
                    page,
                    textboxes,
                    'a blog created by playwright',
                    'playwright',
                    'https://playwright.dev/'
                );

                await page.getByRole('button', { name: 'view' }).click();

                const titleDiv = page.locator('.blog-title');
                await expect(titleDiv).toBeVisible();

                page.on('dialog', async (dialog) => await dialog.accept());
                await page.getByRole('button', { name: 'remove' }).click();

                await expect(titleDiv).not.toBeVisible();
            });
            test('the creator of a blog only sees the remove button', async ({ page, request }) => {
                await page.getByRole('button', { name: 'new blog' }).click();

                const textboxes = await page.getByRole('textbox').all();

                await createBlog(
                    page,
                    textboxes,
                    'a blog created by playwright',
                    'playwright',
                    'https://playwright.dev/'
                );

                await page.getByRole('button', { name: 'view' }).click();
                await expect(page.getByRole('button', { name: 'remove' })).toBeVisible();
                await page.getByRole('button', { name: 'Logout' }).click();

                await addUser(request, 'Arto Hellas', 'hellas', 'salainen');
                await loginWith(page, 'hellas', 'salainen');

                await page.getByRole('button', { name: 'view' }).click();
                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible();
            });
        });
    });
});
