
import {test,expect} from '@playwright/test';

test('Login @Smoke', async ({ page }) => {

 await page.goto("http://49.249.29.4:8081/TestServer/Build/Health_Care_Hospital_System/")
 

 await page.getByPlaceholder('Username').click();
 await page.getByPlaceholder('Username').fill('superadmin');
 await page.getByPlaceholder('Password').click()
await page.getByPlaceholder('Password').fill('123');
await page.locator("//button[text()='SUBMIT']").click()
console.log("success")
console.log("success login")

})