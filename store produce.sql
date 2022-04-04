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


