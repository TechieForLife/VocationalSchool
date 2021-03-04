const {Builder, By, Key} = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox');

// This is a wrapper for a selenium scraper that can grab course assignments and student progress.
class KhanAcademyScraper {
	constructor() {
		this.baseUrl = "https://www.khanacademy.org"
		this.driver = false
		this.screen = {
			width: 1920,
			height: 1080
		}
	}

	async build() {
		this.driver = await new Builder()
			.forBrowser("firefox")
			.setFirefoxOptions(new firefox.Options().headless().windowSize(this.screen))
			.build()
	}

	async _getCourseURLByName(courseName, category="computing") {
		const courseListUrl = `${this.baseUrl}/${category}`

		try {
			await this.driver.get(courseListUrl)

			// Find all anchors on the page
			const anchors = await this.driver.findElements(By.tagName('a'))

			for (var idx in anchors) {
				const anchor = anchors[idx]

				// Check if the anchor has a title equal to the courseName
				const title = await anchor.getAttribute("title")

				if (title == courseName) {
					// If so, we have a hit. Return the url
					return await anchor.getAttribute("href")
				}
			}

			throw new Error(`Course ${courseName} does not exist for category: ${category}`)
		} catch (e) {
			console.error("Could not grab course url.")
			console.error(e)
		}
	}

	async getAssignmentsByCourseName(courseName, options={}) {
		const assignments = []
		const category = options.category ? options.category : "computing"

		await this.build()

		try {
			// Find the url of the course.
			const url = await this._getCourseURLByName(courseName, category)

			await this.driver.get(url)

			// Grab all the anchors on the page.
			const anchors = await this.driver.findElements(By.tagName('a'))

			for (var idx in anchors) {
				// Only care about anchors that link to an assignment. Heuristic: Link is prefixed by the course URL.
				const anchor = anchors[idx]
				const href = await anchor.getAttribute("href")


				if (href.startsWith(url)) {
					// Whenever we have a hit, find the assignment name. Heuristic: Assignment name is located in descendant span.
					const descendants = await anchor.findElements(By.xpath(".//*"))
					let name = ""

					for (idx in descendants) {
						const descendant = descendants[idx]
						const tag = await descendant.getTagName()

						if (tag == "span") {
							name = await descendant.getText()
						}
					}

					if (name.length > 0) {
						const assignment = {name, url: href}
						assignments.push(assignment)
					}
				}
			}

		} finally {
			this.driver.quit()
			return assignments
		}
	}
}

const kaScraper = new KhanAcademyScraper()

const test = async () => {
	kaScraper.build()

	kaScraper.getAssignmentsByCourseName("Intro to HTML/CSS: Making webpages")
}

test()
module.exports = kaScraper