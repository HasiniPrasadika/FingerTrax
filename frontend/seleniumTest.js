const { Builder, By, Key, until } = require('selenium-webdriver');

async function testLogin() {
    let driver;

    try {
        // Initialize WebDriver for Chrome
        driver = await new Builder().forBrowser('chrome').build();

        // Navigate to the login page
        await driver.get('http://localhost:3000');
        console.log('Navigated to login page');

        // Locate and interact with email input
        await driver.wait(until.elementLocated(By.name('email')), 10000, 'Email input not found');
        let emailInput = await driver.findElement(By.name('email'));
        await emailInput.sendKeys('admin@example.com');
        console.log('Entered email');

        // Locate and interact with password input
        await driver.wait(until.elementLocated(By.name('password')), 5000, 'Password input not found');
        let passwordInput = await driver.findElement(By.name('password'));
        await passwordInput.sendKeys('password123', Key.RETURN);
        console.log('Entered password and submitted login form');

        // Wait for dashboard title or element indicating successful login
        await driver.wait(until.titleContains('Dashboard'), 10000, 'Dashboard title not found');
        console.log('Login successful!');

    } catch (error) {
        console.error('Error occurred during login:', error);

    } finally {
        // Close the WebDriver session
        if (driver) {
            await driver.quit();
            console.log('WebDriver session closed');
        }
    }
}

testLogin();