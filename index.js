const { google } = require('googleapis');

const SCOPES = [ 'https://www.googleapis.com/auth/spreadsheets' ];

const sheets = google.sheets({
	version,
	auth
});

const helloWorld = async () => {
	await sheets.spreadsheets.values.update({
		spreadsheetId,
		range: 'A1',
		resource: {
			values: [ [ 'Hello World' ] ]
		}
	});
};
