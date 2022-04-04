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
    INSERT INTO roleuser (username, id_role) VALUES (LOWER(@username), @id_role);
    INSERT INTO person (first_name, last_name, phone_number, day_of_birth, address, gender, mail, username, image)
    VALUES (@first_name, @last_name, @phone_number, @day_of_birth, @address, @gender , @mail, @username, @image);
COMMIT TRANSACTION;
