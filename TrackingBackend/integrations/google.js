// This is a wrapper around the google api to avoid boiler plate and keep scripts at a higher-level.
const {google} = require('googleapis')
const readline = require('readline');
const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)


const SCOPES = ['https://www.googleapis.com/auth/classroom.courses.readonly'];

class GoogleClassroomIntegration {
	constructor() {
		this.scopes = SCOPES
		this.tokenPath = "token.json"
	}

	async build() {
		await this._getCredentials()
	}

	async getCourses() {
		//TODO: Implement
	}

	async addCourse(courseName) {
		//TODO: Implement
	}

	async getCourseByName(name) {
		//TODO: Implement
	}

	async addAssignmentToCourse(assignment, courseName) {
		//TODO: Implement
	} 

	// Authorization flow helpers
	async _getCredentials(path="./credentials.json") {
		const content = await readFile(path).catch(err => console.error("Could not find credentials.json. Make sure it has been downloaded and try again."))

		if (content.length > 0) {
			this._authorize(JSON.parse(content))
		}
	}

	async _authorize(credentials) {
		console.log("Authorizing")
		const {client_secret, client_id, redirect_uris} = credentials.installed

		this.oAuth2Client = new google.auth.OAuth2(
			client_id, client_secret, redirect_uris[0]
		)

		// check for previously saved token
		const token = await readFile(this.tokenPath).catch(err => false)

		if (!token) {
			await this._getNewToken()
		} else {
			console.log("Using previous token.")
			console.log(token)
			this.oAuth2Client.setCredentials(JSON.parse(token))
		}

	}

	async _getNewToken() {
		console.log("Getting new token.")
		const authUrl = this.oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: this.scopes
		})

		console.log("Authorize this app by visiting this url:", authUrl)

		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})

		rl.question("Enter the code from that page here: ", (code) => {
			rl.close()

			this.oAuth2Client.getToken(code, async (err, token) => {
				if (err) {
					return console.error(`Error retrieving access token: ${err}`)
				} else {
					await writeFile(this.tokenPath, token)
					console.log(`Stored token at ${this.tokenPath}`)
				}
			})
		})
	}
}

const googleTest = new GoogleClassroomIntegration()

googleTest.build()