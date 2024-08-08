const { test, expect, beforeEach, describe } = require('@playwright/test');

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
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
});
