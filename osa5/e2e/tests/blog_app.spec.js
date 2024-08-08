const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await page.goto('http://localhost:5173/');
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen',
            },
        });
    });

    test('Login form is displayed', async ({ page, request }) => {
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
            await page.getByRole('textbox').first().fill('mluukkai');
            await page.getByRole('textbox').last().fill('salainen');
            await page.getByRole('button', { name: 'login' }).click();

            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
        });
        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('textbox').first().fill('dannylee');
            await page.getByRole('textbox').last().fill('wrong');
            await page.getByRole('button', { name: 'login' }).click();

            await expect(page.getByText('invalid username or password')).toBeVisible();
        });
    });
});
