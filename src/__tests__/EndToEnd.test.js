import puppeteer from 'puppeteer';
import { mockData } from '../mock-data'

// End-to-end testing for filtering events by city
describe('filter events by city', () => {
    let browser;
    let page;
    jest.setTimeout(30000);
    beforeAll(async () => {
        // Launch browser with puppeteer
        // NOTE that comment below this one is code to get the browser to display, so we can see tests in real time (here for convenience)
        // {headless: false, slowMo: 250, ignoreDefaultArgs: ['--disable-extensions']}
        browser = await puppeteer.launch();
        // Create a new page and navigate to the locally hosted app
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        // Ensure the event list is loaded before moving on
        await page.waitForSelector('.event');
        await page.waitForSelector('.events-number-input');
    });

    afterAll(() => {
        browser.close();
    });

    // Test to ensure that events are shown from all cities by default
    test('Show events from all cities by default', async () => {
        // Note that the $$ is the equivelent of document.querySelectorAll()
        const events = await page.$$('.event');
        // Expect the events from above to have the same length as our mockData (because there are less than the 32 default in our mockData)
        expect(events).toHaveLength(mockData.length);
    });

    // Test to ensure that the user sees a list of suggestions when they search for a city
    test('User should see a list of suggestions when they search for a city', async () => {
        // Use page.type to type Berlin into the .city search box
        await page.type('.city', 'Berlin');
        const suggestions = await page.$$('.suggestions li');
        // Check that the suggestions list has a length of 2 (one for Berlin, one for All Cities)
        expect(suggestions).toHaveLength(2);
    });

    // Test to ensure that when a user clicks on a search result, only events from that city are shown
    test('User can filter events to a single city by clicking on a suggestion', async () => {
        // Click on the first suggestion (should be Berlin from the above test)
        await page.click('.suggestions li');
        const events = await page.$$('.event');
        // After clicking on the suggestion, there should only be 1 event showing
        expect(events).toHaveLength(1);
    })
});

// End-to-end testing for showing/hiding an events details
describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        // Launch browser with puppeteer
        browser = await puppeteer.launch();
        // Create a new page and navigate to the locally hosted app
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        // Ensure the event list is loaded before moving on
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    // Test which ensures an element is collapsed by default (before the user has done anything)
    test('An event element is collapsed by default', async () => {
        // Look for the existance of the .about-event section on the page to see if detauls are shown or not
        const eventDetails = await page.$('.event .about-event');
        expect(eventDetails).toBeNull();
    });

    // Test which ensures that the event details (.about-event) shows when the user clicks the toggle-details button
    test('User can expand an event to see its details', async () => {
        await page.click('.event .toggle-details');

        const eventDetails = await page.$('.event .about-event');
        expect(eventDetails).toBeDefined();
    });

    // Test to ensure the .about-event section is hidden when the button is clicked again
    // Note that we don't need to simulate the initial button click in this test. Because this test is done within a single page (as per the beforeAll and afterAll statements), so the details are expanded from the previous test
    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .toggle-details');
        const eventDetails = await page.$('.event about-event');
        expect(eventDetails).toBeNull();
    })
});