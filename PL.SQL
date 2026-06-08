
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

DROP PROCEDURE IF EXISTS sp_delete_order_detail_from_id;
DELIMITER //
CREATE PROCEDURE sp_delete_order_detail_from_id(IN in_orderDetailsId INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Error, SQLEXCEPTION; Order Detail was not deleted. Check orderDetailId.' AS result;
	END;

	START TRANSACTION;

	IF EXISTS (SELECT 1 FROM OrderDetails WHERE orderDetailsId = in_orderDetailsId) THEN

		DELETE FROM OrderDetails WHERE orderDetailsId = in_orderDetailsId;

		COMMIT;

		SELECT 'Order Detail Deleted.' AS result;
	ELSE

		ROLLBACK;
		SELECT 'Error; Order Detail was not deleted. Check orderDetailId.' AS result;
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

DROP PROCEDURE IF EXISTS sp_update_order_detail_from_id;
DELIMITER //
CREATE PROCEDURE sp_update_order_detail_from_id(
	IN in_orderDetailId INT,
	IN in_orderId INT,
	IN in_candyId INT,
	IN in_orderWeightLbs DECIMAL(19,2),
	IN in_unitPricePerLb DECIMAL(5,2),
	IN in_lineTotal DECIMAL(19,2))
BEGIN
	DECLARE update_orderId INT;
	DECLARE update_candyId INT;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SELECT 'Error, SQLEXCEPTION; Order Detail was not updated. Check referenced order and candy.' AS result;
	END;

	START TRANSACTION;

	IF EXISTS (SELECT 1 FROM OrderDetails WHERE orderDetailsId = in_orderDetailId) THEN

		IF EXISTS (SELECT 1 FROM Candies WHERE candyId = in_candyId) THEN

			SET update_candyId = in_candyId;
		ELSE

			ROLLBACK;
			SELECT 'Error; Order Detail was not updated. Check candyId.' AS result;
		END IF;

		IF EXISTS (SELECT 1 FROM Orders WHERE orderID = in_orderId) THEN

			SET update_orderId = in_orderId;
		ELSE
		
			SELECT 'Error; Order Detail was not updated. Check orderId.' AS result;
		END IF;

		UPDATE OrderDetails
		SET orderId = update_orderId,
			candyId = update_candyId,
			orderWeightLbs = in_orderWeightLbs,
			unitPricePerLb = in_unitPricePerLb,
			lineTotal = in_lineTotal
		WHERE orderDetailsId = in_orderDetailId;

		COMMIT;

		SELECT 'Updated Order Detail.' AS result;

	ELSE

		ROLLBACK;
		SELECT 'Error; Order Detail was not updated. Check orderDetailId.' AS result;
	END IF;
END //
DELIMITER ;

DROP VIEW IF EXISTS v_orders;
CREATE VIEW v_orders AS
SELECT
	o.orderId,
	v.vendorName,
	SUM(od.lineTotal) as subTotal,
	o.taxPctOfTotal,
	o.shippingCost,
	o.orderDate,
	(o.taxPctOfTotal * SUM(od.lineTotal)) + SUM(od.lineTotal) + o.shippingCost as totalDue
FROM
	Orders o
JOIN
	Vendors v on o.vendorId = v.vendorId
JOIN
	OrderDetails od on o.orderId = od.orderId
GROUP BY
	o.orderId
ORDER BY
	o.orderId