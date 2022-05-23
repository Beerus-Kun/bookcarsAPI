CREATE PROCEDURE SP_insertCustomer
@username nchar(25),
@password nchar(128),
@id_role int,
@first_name nvarchar(50),
@last_name nvarchar(50),
@phone_number nchar(12),
@day_of_birth date,
@address nvarchar(250),
@gender bit,
@mail nchar(50),
@image nchar(250)

AS
BEGIN TRANSACTION;
    INSERT INTO acount (username, password) VALUES (LOWER(@username), @password);
    INSERT INTO roleuser (username, id_role, is_active) VALUES (LOWER(@username), @id_role, 1);
    INSERT INTO person (first_name, last_name, phone_number, day_of_birth, address, gender, mail, username, image)
    VALUES (@first_name, @last_name, @phone_number, @day_of_birth, @address, @gender , @mail, @username, @image);
COMMIT TRANSACTION;


GO

CREATE PROCEDURE SP_selectPersonByEmail
@mail nchar(50)
AS
BEGIN TRANSACTION;
    SELECT * FROM person WHERE mail=@mail
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_selectPersonByPhonenumber
@phone_number nchar(12)
AS
BEGIN TRANSACTION;
    SELECT * FROM person WHERE phone_number = @phone_number
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_selectPersonByUsername
@username nchar(25)
AS
BEGIN TRANSACTION;
    SELECT * FROM person WHERE username=@username
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_selectPasswordByUsername
@username nchar(25)
AS
BEGIN TRANSACTION;
    SELECT password FROM acount WHERE username=@username
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_selectRoleByUsername
@username nchar(25)
AS
BEGIN TRANSACTION;
    SELECT id_role, is_active 
    FROM roleuser 
    WHERE username = @username 
    ORDER BY id_role
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_selectPersonByIdAccount
@id_account int
AS
BEGIN TRANSACTION;
    SELECT *, CONVERT(VARCHAR, day_of_birth, 103) as date FROM person WHERE id=@id_account
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updatePasswordByUsername
@username nchar(25),
@password nchar(128)
AS
BEGIN TRANSACTION;
    UPDATE acount
    SET password = @password
    WHERE username = @username
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updateFirstNameByUsername
@id_account int,
@first_name nvarchar(50)
AS
BEGIN TRANSACTION;
    UPDATE person
    SET first_name = @first_name
    WHERE id = @id_account
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updateLastNameById
@id_account int,
@last_name nvarchar(50)
AS
BEGIN TRANSACTION;
    UPDATE person
    SET last_name = @last_name
    WHERE id = @id_account
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updatePhoneNumberById
@id_account int,
@phone_number nchar(12)
AS
BEGIN TRANSACTION;
    UPDATE person
    SET phone_number = @phone_number
    WHERE id = @id_account
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updateDayOfBirthById
@id_account int,
@day_of_birth date
AS
BEGIN TRANSACTION;
    UPDATE person
    SET day_of_birth = @day_of_birth
    WHERE id = @id_account
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updateAdressById
@id_account int,
@address nvarchar(250)
AS
BEGIN TRANSACTION;
    UPDATE person
    SET address = @address
    WHERE id = @id_account
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updateGenderById
@id_account int,
@gender bit
AS
BEGIN TRANSACTION;
    UPDATE person
    SET gender = @gender
    WHERE id = @id_account
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updateMailById
@id_account int,
@mail nchar(50)
AS
BEGIN TRANSACTION;
    UPDATE person
    SET mail = @mail
    WHERE id = @id_account
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_updateCodeByUsername
@id_account int,
@code nchar(128)
AS
BEGIN TRANSACTION;
    UPDATE person
    SET code = @code
    WHERE id = @id_account
COMMIT TRANSACTION;

GO

---- them dot moi --- 

ALTER PROCEDURE SP_selectPersonByIdAccount
@id_account int
AS
BEGIN TRANSACTION;
    SELECT *, CONVERT(VARCHAR, day_of_birth, 103) as date FROM person WHERE id=@id_account
COMMIT TRANSACTION;

GO

ALTER PROCEDURE SP_insertCustomer
@username nchar(25),
@password nchar(128),
@id_role int,
@first_name nvarchar(50),
@last_name nvarchar(50),
@phone_number nchar(12),
@day_of_birth date,
@address nvarchar(250),
@gender bit,
@mail nchar(50),
@image nchar(250)

AS

Declare @new_id int;

BEGIN TRANSACTION;
    INSERT INTO acount (username, password) VALUES (LOWER(@username), @password);
    INSERT INTO roleuser (username, id_role, is_active) VALUES (LOWER(@username), @id_role, 1);
    INSERT INTO person (first_name, last_name, phone_number, day_of_birth, address, gender, mail, username, image)
    VALUES (@first_name, @last_name, @phone_number, @day_of_birth, @address, @gender , @mail, LOWER(@username), @image);
    SELECT @new_id = SCOPE_IDENTITY()
    INSERT INTO digitalwallet (id, id_user, balance)
    VALUES (@new_id, @new_id, 0)
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_insertDriver
@driving_license nchar(15), 
@number_plate nchar(10), 
@id_transport_detail int,
@id_driver int,
@username nchar(25)
AS
BEGIN TRANSACTION;
    UPDATE person
    SET driving_license = @driving_license
    WHERE id = @id_driver
    INSERT INTO roleuser (username, id_role, is_active) 
    VALUES (LOWER(@username), 3, 1);
    INSERT INTO transport(id_driver, number_plate, is_active, id_transport_detail)
    VALUES (@id_driver, @number_plate, 1, @id_transport_detail)
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_selectTransportDetail
AS
BEGIN TRANSACTION;
    select * from transportDetail
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_hasBooking
@id_account int
AS
BEGIN TRANSACTION;
    select *
    from Booking
    where id_user = @id_account and id_state < 3
COMMIT TRANSACTION;

GO
CREATE PROCEDURE SP_createBooking
@id_account int,
@distance float,
@total float,
@start_point nvarchar(512),
@end_point nvarchar(512),
@id_state int

AS
BEGIN TRANSACTION;
    insert into Booking(id_user, distance, total, start_point, end_point, id_profitsharing, id_state)
	values (@id_account, @distance, @total, @start_point, @end_point,(select top(1) id_profitsharing from PROFIT_SHARING), @id_state)
COMMIT TRANSACTION;

GO

CREATE PROCEDURE SP_selectBalance
@id_user int

AS
BEGIN TRANSACTION;
    select * from DigitalWallet where id_user = 1
COMMIT TRANSACTION;