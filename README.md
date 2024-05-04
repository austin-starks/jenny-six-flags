# Jenny Six Flags

I want to ask Jenny out on a date. I want to go to Six Flags.

I used DALL-E to generate the initial images and Runway ML to convert it to a video.

## Dependencies

- You need to create and setup a [SendGrid Email Account](https://sendgrid.com/en-us/1?adobe_mc_sdid=SDID%3D4BA48597E9BE0B3C-6F442E1059B631FE%7CMCORGID%3D32523BB96217F7B60A495CB6%40AdobeOrg%7CTS%3D1702859620) in order to be notified via email when your crush responds

## Installation

1. Clone the repository.
2. Go to the directory.
3. Install the dependencies: `npm run build`
4. Setup the SENDGRID_API_KEY and SENDGRID_EMAIL in a .env file

## Turning on the system

To turn on the client and server:

1. Open two terminal windows.
2. In one window, turn on the client: `cd client; npm run dev`
3. In the other window, turn on the server: `cd app; npm start`
