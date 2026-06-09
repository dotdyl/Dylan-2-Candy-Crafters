
DROP PROCEDURE IF EXISTS sp_delete_candy_from_id;
DELIMITER //
CREATE PROCEDURE sp_delete_candy_from_id(IN in_candyId INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Error, SQLEXCEPTION; Candy was not deleted. Check inventory spaces stocked with this candy.' AS result;
	END;

	START TRANSACTION;

	IF EXISTS (SELECT 1 FROM Candies WHERE candyId = in_candyId) THEN

		DELETE FROM Candies WHERE candyId = in_candyId;

		COMMIT;

		SELECT 'Candy deleted' AS result;
	ELSE

		ROLLBACK;
		SELECT 'Error; Candy was not deleted. Check candyId.' AS result;
	END IF;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS sp_update_inventory_space_from_id;
DELIMITER //
CREATE PROCEDURE sp_update_inventory_space_from_id(
	IN in_inventoryId INT,
	IN in_candyId INT,
	IN in_gallonsFilled decimal(5,2),
	IN in_lastStocked date)
BEGIN

	DECLARE update_candyId INT DEFAULT NULL;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Error, SQLEXCEPTION; Inventory Space was not updated. Check referenced candy.' AS result;
	END;

	START TRANSACTION;

	IF EXISTS (SELECT 1 FROM InventorySpaces WHERE inventoryId = in_inventoryId) THEN

		IF EXISTS (SELECT 1 FROM Candies WHERE candyId = in_candyId) THEN

			SET update_candyId = in_candyId;

		END IF;

		UPDATE InventorySpaces
		SET candyId = update_candyId,
			lastStocked = in_lastStocked,
			gallonsFilled = in_gallonsFilled
		WHERE inventoryId = in_inventoryId;

		COMMIT;

		SELECT 'Updated Inventory Space.' AS result;

	ELSE

		ROLLBACK;
		SELECT 'Error; Inventory Space was not updated. Check inventoryId.' AS result;
	END IF;
END //
DELIMITER ;

-- ** SP for creating candies **
DROP PROCEDURE IF EXISTS sp_create_candy;

DELIMITER //

CREATE PROCEDURE sp_create_candy(
	IN in_candyName VARCHAR(50),
	IN in_candyPricePerLb decimal(5,2),
	IN in_lbsPerGallon decimal(19,2)
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Error, SQLEXCEPTION; Candy was not created.' AS result;
	END;

	START TRANSACTION;
	
		INSERT INTO Candies (candyName,pricePerLb,lbsPerGallon)
		VALUES (in_candyName, in_candyPricePerLb, in_lbsPerGallon);

	COMMIT;

	SELECT 'Candy created successfully.' AS result;

END //
DELIMITER ;