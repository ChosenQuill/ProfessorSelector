import { expect, test } from '@playwright/test';

test('about page has expected h1', async ({ page }) => {
	await page.goto('/about');
	await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
});

test('homepage has a "Get Started" button', async ({ page }) => {
	await page.goto('/');
	const getStartedButton = page.locator('a.btn.btn-primary', { hasText: /^Get Started$/ });
	await expect(getStartedButton).toBeVisible();
	await expect(getStartedButton).toHaveAttribute('href', '/app');
  });

test('search for math 2414 and verify course details', async ({ page }) => {
	await page.goto('/app');

	const noTour = page.locator('button[value="no"]');
	if(noTour) {
		await noTour.click();
	}
  
	// Locate the "Add A Class" input field
	const classInput = page.locator('input[placeholder="Type here. Ex: SE.3345"]');
	await classInput.fill('math 2414');
  
	// Click the search button
	const searchButton = page.locator('button.btn-square.btn-primary');
	await searchButton.click();
  
	// Wait for the course description to be visible
	const courseDescription = page.locator('p.my-2');
	await expect(courseDescription).toBeVisible();
	await expect(courseDescription).toContainText('Continuation of Math 2413');
  
	// Wait for the professors table to be visible
	const professorsTable = page.locator('table');
	await expect(professorsTable).toBeVisible();
  
	// Verify professor names are displayed
	const professorNames = await professorsTable.locator('div.font-bold').allTextContents();
	expect(professorNames).toContain('Kelly Aman');
	// expect(professorNames).toContain('Mieczyslaw Dabkowski');
	// expect(professorNames).toContain('Rabin Dahal');
  });