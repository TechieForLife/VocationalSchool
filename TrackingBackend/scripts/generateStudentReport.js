// Assumes that we are given JSON for a single student
module.exports = async function(reportData) {
	// This is all hypothetical. TODO: Come up with actual report.
	const {completedAssignments, completedProjects, newCertificatesEarned} = reportData

	// Do some calculations, like number of classes worked on, or interesting statistics like student momentum

	const reportFile = _generateNiceLookingReport({
		certificates: newCertificatesEarned, 
		completedCourses: newCompletedCourses, 
		progress: courseProgress
	})
}