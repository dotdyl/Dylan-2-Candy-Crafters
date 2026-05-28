
-- Spring 2026 CS340 - Group 71: Dylan Knapp, Dylan Keyhantaj

-- Stored procedure to load / create the default candy database

DROP PROCEDURE IF EXISTS sp_load_candy_db;
DELIMITER //
CREATE PROCEDURE sp_load_candy_db()
BEGIN
  -- Disabling foreign key checks
  SET FOREIGN_KEY_CHECKS=0;

  -- --------------------------------------------------------

  -- Note: there is no 'ON UPDATE CASCADE' constraint for any FK values, since no referenced PKs are designed to change values

  --
  -- Table structure for table `candies`
  --

  CREATE OR REPLACE TABLE `Candies` (
    `candyId` int(11) NOT NULL AUTO_INCREMENT,
    `candyName` varchar(50) NOT NULL UNIQUE,
    `pricePerLb` decimal(5,2) NOT NULL,
    `lbsPerGallon` decimal(19,2) NOT NULL,
    PRIMARY KEY (`candyId`)
  );

  --
  -- Dumping data for table `candies`
  --

  INSERT INTO `Candies` (`candyName`, `pricePerLb`, `lbsPerGallon`) VALUES
  ('Peppermint Sweethearts', 9.00, 5.00),
  ('Fudge Funboys', 8.00, 7.15),
  ('Red Rhino Cinnamon Twigs', 5.00, 5.25),
  ('Pineapple Creme Gummies', 7.57, 5.70);

  --
  -- Table structure for table `vendors`
  --

  CREATE OR REPLACE TABLE `Vendors` (
    `vendorId` int(11) NOT NULL AUTO_INCREMENT,
    `vendorName` varchar(50) NOT NULL UNIQUE,
    `addressLine1` varchar(50) NOT NULL,
    `addressLine2` varchar(50) DEFAULT NULL,
    `city` varchar(50) NOT NULL,
    `state` varchar(50) NOT NULL,
    `postalCode` varchar(50) NOT NULL,
    PRIMARY KEY (`vendorId`)
  );

  --
  -- Dumping data for table `vendors`
  --

  INSERT INTO `Vendors` (`vendorName`, `addressLine1`, `addressLine2`, `city`, `state`, `postalCode`) VALUES
  ('Candy Plaza', '3276 SW Munch Ln', NULL, 'Beaverton', 'Oregon', '97006'),
  ('Silly Billys Candies', '5784 SE Border Rd', NULL, 'Tualatin', 'Oregon', '97062'),
  ('Deluxe Treats & More', '100 Capital Dr', 'Suite 100, Floor 2', 'Portland', 'Oregon', '97224');

  --
  -- Table structure for table `orders`
  --

  CREATE OR REPLACE TABLE `Orders` (
    `orderId` int(11) NOT NULL AUTO_INCREMENT,
    `vendorId` int(11) NOT NULL DEFAULT -99,
    `subTotal` decimal(19,2) NOT NULL,
    `taxAmtOfTotal` decimal(19,2) NOT NULL,
    `shippingCost` decimal(19,2) NOT NULL,
    `orderDate` datetime NOT NULL,
    `totalDue` decimal(19,2) NOT NULL,
    PRIMARY KEY (`orderId`),
    FOREIGN KEY (`vendorId`) REFERENCES `Vendors` (`vendorId`) ON DELETE SET DEFAULT -- Sets the FK value to default, and we preserve the table record so revenue and finances can be tracked still
  );

  --
  -- Dumping data for table `orders`
  --

  INSERT INTO `Orders` (`vendorId`, `subTotal`, `taxAmtOfTotal`, `shippingCost`, `orderDate`, `totalDue`) VALUES
  ((SELECT vendorId FROM Vendors WHERE vendorName = 'Candy Plaza'), 4000.00, 0.00, 90.00, '2026-05-01 09:15:00', 4090.00),
  ((SELECT vendorId FROM Vendors WHERE vendorName = 'Candy Plaza'), 12000.00, 0.00, 300.00, '2026-05-02 13:42:00', 12300.00),
  ((SELECT vendorId FROM Vendors WHERE vendorName = 'Silly Billys Candies'), 9000.00, 0.00, 120.00, '2026-05-03 10:05:00', 9120.00);

  --
  -- Table structure for table `orderDetails`
  --

  CREATE OR REPLACE TABLE `OrderDetails` (
    `orderDetailsId` int(11) NOT NULL AUTO_INCREMENT,
    `orderId` int(11) NOT NULL,
    `candyId` int(11) NOT NULL DEFAULT -99,
    `orderWeightLbs` decimal(19,2) NOT NULL,
    `unitPricePerLb` decimal(5,2) NOT NULL,
    `lineTotal` decimal(19,2) NOT NULL,
    PRIMARY KEY (`orderDetailsId`),
    FOREIGN KEY (`candyId`) REFERENCES `Candies` (`candyId`) ON DELETE CASCADE, -- Order details will be purged if a referenced candy id is removed from the database in ordder to maintain performance
    FOREIGN KEY (`orderId`) REFERENCES `Orders` (`orderId`) ON DELETE CASCADE -- The order detail should be deleted if an order is deleted
  );

  --
  -- Dumping data for table `orderDetails`
  --

  INSERT INTO `OrderDetails` (`orderId`, `candyId`, `orderWeightLbs`, `unitPricePerLb`, `lineTotal`) VALUES
  ((SELECT orderId FROM Orders WHERE vendorId = (SELECT vendorId FROM Vendors WHERE vendorName = 'Candy Plaza') AND orderDate = '2026-05-01 09:15:00'), (SELECT candyId FROM Candies WHERE candyName = 'Peppermint Sweethearts'), 7.50, 9.00, 68.00),
  ((SELECT orderId FROM Orders WHERE vendorId = (SELECT vendorId FROM Vendors WHERE vendorName = 'Candy Plaza') AND orderDate = '2026-05-01 09:15:00'), (SELECT candyId FROM Candies WHERE candyName = 'Fudge Funboys'), 10.00, 8.50, 85.00),
  ((SELECT orderId FROM Orders WHERE vendorId = (SELECT vendorId FROM Vendors WHERE vendorName = 'Silly Billys Candies') AND orderDate = '2026-05-03 10:05:00'), (SELECT candyId FROM Candies WHERE candyName = 'Pineapple Creme Gummies'), 15.00, 7.00, 105.00),
  ((SELECT orderId FROM Orders WHERE vendorId = (SELECT vendorId FROM Vendors WHERE vendorName = 'Candy Plaza') AND orderDate = '2026-05-02 13:42:00'), (SELECT candyId FROM Candies WHERE candyName = 'Fudge Funboys'), 5.25, 8.00, 42.00);

  --
  -- Table structure for table `inventorySpaces`
  --

  CREATE OR REPLACE TABLE `InventorySpaces` (
    `inventoryId` int(11) UNIQUE NOT NULL,
    `candyId` int(11) DEFAULT NULL,
    `lastStocked` date DEFAULT NULL,
    `gallonsFilled` decimal(5,2) DEFAULT NULL,
    PRIMARY KEY (`inventoryId`),
    FOREIGN KEY (`candyId`) REFERENCES `Candies` (`candyId`) ON DELETE RESTRICT -- We want to force inventory spaces to be updated / cleared of a candy FK before a candy may be deleted
  );

  --
  -- Dumping data for table `inventorySpaces`
  --

  INSERT INTO `InventorySpaces` (`inventoryId`, `candyId`, `lastStocked`, `gallonsFilled`) VALUES
  (6, (SELECT candyId FROM Candies WHERE candyName = 'Fudge Funboys'), '2026-04-12', 15.50),
  (7, (SELECT candyId FROM Candies WHERE candyName = 'Peppermint Sweethearts'), '2026-05-03', 5.52),
  (15, (SELECT candyId FROM Candies WHERE candyName = 'Red Rhino Cinnamon Twigs'), '2026-04-25', 19.00),
  (23, NULL, NULL, NULL);

  -- Enabling foreign key checks
  SET FOREIGN_KEY_CHECKS=1;
END //

DELIMITER ;

-- 'CALL sp_load_candy_db();' to load the database.