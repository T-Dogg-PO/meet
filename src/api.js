import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

// This function takes an events array, then uses map to create a new array with only locations
// It will also remove all duplicates by creating another new array using the spread opearator and spreading a new Set
export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};

// Function to check an accessToken's validity
const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    ).then((res) => res.json())
    .catch((error) => error.json());

    return result;
}

// async function to get all events from the API asynchronously
export const getEvents = async () => {
    // NProgress is a Node package used to display progress bars at the top of the page
    NProgress.start();
    // Use mockData if running locally
    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();
        return mockData;
    }

    // Check if user is offline. If they are use events from localStorage instead
    if (!navigator.onLine) {
        const data = localStorage.getItem("lastEvents");
        NProgress.done();
        return data ? JSON.parse(data).events : [];
    }

    const token = await getAccessToken();

    if (token) {
        // removeQuery() will remove the code from the URL once we're done with it
        removeQuery();
        const url = 'https://85s6317vx8.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' + '/' + token;
        const result = await axios.get(url);
        if (result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem("lastEvents", JSON.stringify(result.data));
            localStorage.setItem("locations", JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }
};

// Function checks if there's a path, then builds the URL with or without the current path
const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newurl = 
            window.location.protocol + 
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

// Function to get the access_token to access the API
export const getAccessToken = async () => {
    // Check localStorage to see if they already have a token
    const accessToken = localStorage.getItem('access_token');

    // If no locally stored accessToken, redirect to Google Authorization
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        // Check for authorization code. If no, redirect to Google Authoroization screen
        if (!code) {
            const results = await axios.get(
                "https://85s6317vx8.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
            );
            const { authUrl } = results.data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const { access_token } = await fetch('https://85s6317vx8.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode)
        .then((res) => {
            return res.json();
        }).catch((error) => error);
    
    access_token && localStorage.setItem("access_token", access_token);

    return access_token;
};