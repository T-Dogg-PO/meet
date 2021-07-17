const { google } = require("googleapis");
const { resultingClientExists } = require("workbox-core/_private");
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

// The OAuth process, which first generates a URL so users can log in with Google and be authorized to see the calendar. After logging in they'll recieve a code as a URL parameter
module.exports.getAuthURL = async () => {
  // The SCOPES array is passed to the scope option. These SCOPES must be enabled in Google Console
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });

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

module.exports.getAccessToken = async (event) => {
  // Instantiate a new OAuthClient with values from above
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

module.exports.getCalendarEvents = async (event) => {
  const oAuth2Client = new google.authOAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  const access_token = decodeURIComponent(`${event.pathParameters.code}`);

  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime"
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
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