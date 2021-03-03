CREATE TABLE Course (
	Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Name varchar(255) NOT NULL
);

CREATE TABLE HostSite (
	Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	url varchar(255) NOT NULL
);

CREATE TABLE Assignment (
	Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	CourseId int NOT NULL,
	HostSiteId int,
	FOREIGN KEY (CourseId) REFERENCES Course(Id),
	FOREIGN KEY (HostSiteId) REFERENCES HostSite(Id)
);

CREATE TABLE Student (
	Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	FirstName varchar(255) NOT NULL,
	LastName varchar(255) NOT NULL
);

CREATE TABLE Submission (
	Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	StudentId int NOT NULL,
	AssignmentId int NOT NULL,
	SubmittedOn TIMESTAMP NOT NULL,
	FOREIGN KEY (StudentId) REFERENCES Student(Id),
	FOREIGN KEY (AssignmentId) REFERENCES Assignment(Id)

);

CREATE TABLE Credentials (
	Id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Username varchar(255) NOT NULL,
	Password varchar(255) NOT NULL,
	StudentId int NOT NULL,
	HostSiteId int NOT NULL,
	FOREIGN KEY (StudentId) REFERENCES Student(Id),
	FOREIGN KEY (AssignmentId) REFERENCES Assignment(Id)
);