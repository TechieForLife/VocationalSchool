// This is a wrapper around the google api to avoid boiler plate and keep scripts at a higher-level.
const {google} = require('googleapis')
const readline = require('readline');
const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)


const SCOPES = [
	// Manage your Google Classroom classes
	'https://www.googleapis.com/auth/classroom.courses', 	

	// See, edit, and create classwork materials in Google Classroom
	'https://www.googleapis.com/auth/classroom.courseworkmaterials',

	// Manage course work and grades for students in the Google Classroom classes you teach and view the course work and grades for classes you administer  
	'https://www.googleapis.com/auth/classroom.coursework.students',

	// https://www.googleapis.com/auth/classroom.student-submissions.students.readonly
	'https://www.googleapis.com/auth/classroom.student-submissions.students.readonly'
];

class GoogleClassroomIntegration {
	constructor() {
		this.scopes = SCOPES
		this.tokenPath = "token.json"
	}

	async build() {
		await this._getCredentials()
		this.endpoint = await google.classroom({version: "v1", auth: this.oAuth2Client})
	}

	async getCourses() {
		const res = await this.endpoint.courses.list({pageSize: 10})
		const {courses} = res.data

		return courses
	}

	async addCourse(courseName, description) {
		const course = await this.endpoint
				.courses
				.create({
					// body: {
						name: courseName,
						description,
						ownerId: "me",
					// }
				})
				.catch(e => console.error(e))
	}

	async getCourseByName(name) {
		const courses = await this.getCourses()
		const possibleCourse = courses.filter(course => course.name == name)

		if (possibleCourse.length > 0) {
			return possibleCourse[0]
		} else {
			return {}
		}
	}

	async addAssignmentToCourse(assignment, courseName) {
		//TODO: Implement
	}

	async getAssignmentsFromCourse(courseName) {
		//TODO: Implement
	}

	async deleteAssignmentFromCourse(assignment, courseName) {
		//TODO: Implement
	}

	// Authorization flow helpers
	async _getCredentials(path="./credentials.json") {
		const content = await readFile(path).catch(err => console.error("Could not find credentials.json. Make sure it has been downloaded and try again."))

		if (content.length > 0) {
			await this._authorize(JSON.parse(content))
		}
	}

	async _authorize(credentials) {
		const {client_secret, client_id, redirect_uris} = credentials.installed

		// Create a client for OAuth2
		this.oAuth2Client = new google.auth.OAuth2(
			client_id, client_secret, redirect_uris[0]
		)

		// Check for stored token.
		const token = await readFile(this.tokenPath).catch(err => false)

		if (!token) {
			// If the token doesn't exist, create a new one.
			await this._getNewToken()
		} else {
			// Otherwise, use the token to set credentials.
			this.oAuth2Client.setCredentials(JSON.parse(token))
		}

	}

	async _getNewToken() {
		// Generate a URL the user can use to authorize scopes.
		const authUrl = this.oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: this.scopes
		})

		// Prompt user to visit url and authorize scopes and generate an auth. code.
		console.log("Authorize this app by visiting this url:", authUrl)

		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})

		// Wait for user to complete flow and grab the auth. code.
		rl.question("Enter the code from that page here: ", (code) => {
			rl.close()

			// Generate a token for future use.
			this.oAuth2Client.getToken(code, async (err, token) => {
				if (err) {
					return console.error(`Error retrieving access token: ${err}`)
				} else {
					await writeFile(this.tokenPath, JSON.stringify(token))
					// Use new token to authorize. This avoids a second pass on this flow.
					this.oAuth2Client.setCredentials(token)
				}
			})
		})
	}
}


// Test Code
const googleAPI = new GoogleClassroomIntegration()

module.exports = googleAPI