const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

// SCOPES allows us to set access levels (in this case, readonly because we don't have access rights to update the calendar ourselves)
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// credentials are the values required to access the calendar. process.env refers to the values in config.json (which keeps the API secrets hidden)
const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://t-dogg-po.github.io/meet/"],
  javascript_origins: ["https://t-dogg-po.github.io", "http://localhost:3000"],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Step 1 of the OAuth process, which first generates a URL so users can log in with Google and be authorized to see the calendar. After logging in they'll recieve a code as a URL parameter (used in step 2 - getting the access token)
module.exports.getAuthURL = async () => {
  // The SCOPES array is passed to the scope option. These SCOPES must be enabled in Google Console
  // oAuth2Client.generateAuthUrl will create the authURL for us with the specified options (e.g. what access levels we have for the GoogleCalendar API)
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });

  // Then we simply return the authURL from above
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      authUrl: authUrl
    })
  };
};

// Step 2 - After authorization with Google in step 1, exchange the code parameter from the authURL for an access token to the Google Calendar
module.exports.getAccessToken = async (event) => {
  // Instantiate a new OAuthClient with values from the credentials above. For each request we need to create aa new OAuthClient and return a promise (which means we don't have a value for it yet, but will soon)
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    // Exchange authorization code for access token with a callback after the exchange
    // The callback in this case is an arrow function with the results as parameters (err and token)
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  }).then((token) => {
    // Respond with OAuth token
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(token)
    };
  }).catch((err) => {
    // Handle error
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  });
};

// Step 3 - With the access token we can now access the Google Calendar
module.exports.getCalendarEvents = async (event) => {
  // Again instantiate a new OAuthClient with values from the credentials above
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Decode the access token extracted from the URL passed in
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

  // Set the access_token as credentials for our OAuthClient
  oAuth2Client.setCredentials({ access_token });

  // Return a new promise
  return new Promise((resolve, reject) => {
    // In the promise's callback function, we use this calendar method to get a list of events from the Google Calendar in question using our oAuth2Client for authentication
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime"
      },
      // Then use a callback to resolve or reject the promise
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  // Then finally return the calendar events
  }).then((results) => {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ events: results.data.items })
    };
  }).catch((err) => {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  });
};