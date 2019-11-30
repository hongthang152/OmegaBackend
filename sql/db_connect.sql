CREATE TABLE IF NOT EXISTS Appdata (
	id int NOT NULL auto_increment,
    name varchar(50),
    version varchar(50),
    date varchar(50),
    email varchar(50),
    severity varchar(50),
    type varchar(50),
    description varchar(255),
    PRIMARY KEY (id)
);


-- INSERT INTO Appdata (appl_name, appl_version, generated_date, reporter_email, report_type, descript)
-- VALUES 
-- 	("New App", "1.0.0", "New Date", "New Email", "B", "This is a new app"),
-- 	("New App", "2.0.0", "New Date", "New Email", "F", "This is a new app");