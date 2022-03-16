-- Khởi tạo múi giờ --
SET timezone = 'Asia/Ho_Chi_Minh';

-- Tạo bảng tài khoản -- 

CREATE TABLE Acount(
	username nchar(25) PRIMARY KEY,
	password nchar(128) NOT NULL
);

CREATE INDEX ON Acount (username);

-- Tạo bảng ngân hàng --

CREATE TABLE Bank(
	id serial PRIMARY KEY,
	current_Acount nchar(15) NOT NULL,
	id_user serial
);

CREATE INDEX ON Bank(id);

-- Tạo bảng đặt xe --

CREATE TABLE Booking(
	id serial PRIMARY KEY,
	id_user serial NOT NULL,
	id_transport int NOT NULL,
	start_point nchar(512) NOT NULL,
	end_point nchar(512) NOT NULL,
	distance float,
	total float,
	rating int,
	comment varchar(200) DEFAULT NULL,
	id_state serial NOT NULL,
	date timestamp without time zone default CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX ON Booking(id);

-- Tạo bảng người dùng (thông tin thông tin tài khoản 
(những thông tin của role khác có thể null)) --

CREATE TABLE Person(
	id serial PRIMARY KEY,
	first_name varchar(50) NOT NULL,
	last_name varchar(50) NOT NULL,
	id_card nchar(20) NULL,
	phone_number nchar(12) NOT NULL,
	day_of_birth date,
	address varchar(250) NULL,
	gender boolean NOT NULL,
	image nchar(250) NULL,
	username nchar(25) NOT NULL,
	mail nchar(50) NULL,
	driving_license nchar(15) NULL,
	score float NULL,
	code nchar(128)
);

CREATE INDEX ON Person(id);

-- Ví điện tử --

CREATE TABLE DigitalWallet(
	id serial PRIMARY KEY,
	id_user serial,
	balance float
);

CREATE INDEX ON DigitalWallet(id);

-- Tạo bảng chức vụ --
CREATE TABLE Role(
	id serial PRIMARY KEY,
	role_name nchar(15)
);

CREATE INDEX ON Role(id);

-- Tạo bảng chức vụ của tài khoản --
CREATE TABLE RoleUser(
	username nchar(25) NOT NULL,
	id_role serial NOT NULL,
	is_active boolean DEFAULT TRUE,
	PRIMARY KEY (username, id_role)
);

CREATE INDEX ON RoleUser(username);

-- Tạo bảng khu vực --

CREATE TABLE State(
	id serial PRIMARY KEY,
	state_name varchar(50) NULL
);

-- Tạo bảng phương tiện --

CREATE TABLE Transport(
	id serial PRIMARY KEY,
	id_driver serial NOT NULL,
	number_plate nchar(10) NOT NULL,
	is_active boolean DEFAULT TRUE,
	id_transport_detail serial
);

CREATE INDEX ON Transport(id);

-- Tạo bảng giá phương tiện --

CREATE TABLE TransportDetail(
	id serial PRIMARY KEY,
	transport_detail nchar(20),
	price float
);

CREATE INDEX ON TransportDetail(id);

-- Tạo khóa phụ ---

-- Ngân hàng --

ALTER TABLE Bank 
ADD CONSTRAINT FK_Bank_User 
FOREIGN KEY(id_user)
REFERENCES Person(id);

-- Đặt xe --

ALTER TABLE Booking
ADD  CONSTRAINT FK_Booking_State 
FOREIGN KEY(id_state)
REFERENCES State (id);

ALTER TABLE Booking
ADD CONSTRAINT FK_Booking_transport 
FOREIGN KEY(id_transport)
REFERENCES Transport (id);

ALTER TABLE Booking  
ADD CONSTRAINT FK_Booking_Person 
FOREIGN KEY(id_user)
REFERENCES Person(id);

-- Người dùng --

ALTER TABLE Person 
ADD CONSTRAINT FK_Person_Acount
FOREIGN KEY(username)
REFERENCES Acount(username);

-- Ví điện tử --

ALTER TABLE DigitalWallet 
ADD CONSTRAINT FK_DigitalWallet_Person 
FOREIGN KEY(id_user)
REFERENCES Person(id);

-- Danh sách cấp quyền --

ALTER TABLE RoleUser 
ADD CONSTRAINT FK_RoleUser_Acount 
FOREIGN KEY(username)
REFERENCES Acount (username);

ALTER TABLE RoleUser  
ADD CONSTRAINT FK_RoleUser_Role 
FOREIGN KEY(id_role)
REFERENCES Role (id);

-- Vận chuyển --

ALTER TABLE Transport  
ADD  CONSTRAINT FK_transport_Person
FOREIGN KEY(id_driver)
REFERENCES Person(id);

ALTER TABLE Transport  
ADD  CONSTRAINT FK_transport_transportDetail 
FOREIGN KEY(id_transport_detail)
REFERENCES TransportDetail (id);


-- STORED PRODUCE --

-- Thêm một khách hàng mới --
CREATE OR REPLACE PROCEDURE SP_insertCustomer(IN username nchar(25), IN password nchar(100), IN id_role integer, IN first_name VARchar(50), IN last_name VARCHAR(50), IN phone_number NCHAR(12), IN day_of_birth DATE, IN address VARCHAR(250), IN gender BOOLEAN, IN mail NCHAR(50)) 
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO acount (username, password) VALUES (LOWER(username), password);
    INSERT INTO roleuser (username, id_role) VALUES (LOWER(username), id_role);
    INSERT INTO person (first_name, last_name, phone_number, day_of_birth, address, gender, mail, username)
    VALUES (first_name, last_name, phone_number, day_of_birth, address, gender , mail, username);
END $$;
