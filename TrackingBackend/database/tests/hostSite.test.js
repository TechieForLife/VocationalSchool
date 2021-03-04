const sequelize = require('./index')


const HostSite = sequelize.models.hostSite
test("HostSites may be created", async () => {
	await sequelize.sync({force: true})
	const hostSite = await HostSite.create({name: "test", url: "https://www.example.com"})
	expect(hostSite.name).toBe("test")
})

test("HostSites may be queried", async () => {
	const foundHostSite = await HostSite.findOne({where: {name: "test"}})
	expect(foundHostSite).toEqual(expect.objectContaining({name: "test"}))
})

test("HostSites may be updated", async () => {
	hostSite = await HostSite.findOne({where: {name: "test"}})
	hostSite.name = "foo"
	await hostSite.save()

	const updatedHostSite = await HostSite.findOne({where: {name: "foo"}})
	expect(updatedHostSite.name).toBe("foo")
})

test("HostSites may be deleted", async () => {
	const hostSite = await HostSite.create({name: "destroyMe", url: "https://destroy.all.humans"})
	await hostSite.destroy()

	expect(HostSite.findOne({where: {name: "destroyMe"}})).resolves.toBe(null)
})