const addHostSite = require("../addHostSite")

test("Able to add hostsite from interactor", async () => {
	const url = "https://www.khanacademy.org"
	const name = "Khan Academy"
	const site = await addHostSite(url, name)
	expect(site).toEqual(expect.objectContaining({url, name}))
})