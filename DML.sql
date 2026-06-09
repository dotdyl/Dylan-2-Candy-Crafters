-- CRUD Candies [Create, Read, Update, Delete]

-- Add a new candy record with an automatic id attached
INSERT INTO Candies(candyName, pricePerLb, lbsPerGallon)
VALUES (@candyNameINPUT, @pricePerLbINPUT, @lbsPerGallonINPUT);

-- get all candy data, as well as the combined inventory stock of every bin filled with each respective candy
SELECT Candies.candyId, Candies.candyName, Candies.pricePerLb, Candies.lbsPerGallon, 
SUM(InventorySpaces.gallonsFilled) AS totalGallonsFilled
FROM Candies
LEFT JOIN InventorySpaces ON Candies.candyId = InventorySpaces.candyId
GROUP BY Candies.candyId, Candies.candyName, Candies.pricePerLb, Candies.lbsPerGallon;

-- get candy id and name for dropdown for a Candies dropdown
SELECT candyId, candyName FROM Candies;

-- get a single candy's data for the Update Candies form
SELECT candyId, candyName, pricePerLb, lbsPerGallon FROM Candies
WHERE candyId = @candyIdINPUT

-- update a candy's attributes with the user-inputed values on a candy with a matching id
UPDATE Candies
SET candyName = @candyNameINPUT, pricePerLb = @pricePerLbINPUT, lbsPerGallon = @lbsPerGallonINPUT
WHERE candyId = @candyIdINPUT;

-- delete a candy with the matching id
DELETE FROM Candies
WHERE candyId = @candyIdINPUT;

-- CRUD Orders

-- add a new order using user-inputted values
INSERT INTO Orders (vendorId, subTotal, taxAmtOfTotal, shippingCost, orderDate, totalDue)
VALUES (@vendorIdINPUT, @subTotal, @taxAmt, @shipping, @orderDate, @totalDue);

-- get all order data to display in the table, adding the vendor name to the displayed table
SELECT Orders.orderId, CONCAT(Vendor.vendorId, ' - ', Vendor.vendorName), Orders.subTotal, Orders.taxAmtOfTotal, 
Orders.shippingCost, Orders.orderDate, Orders.totalDue FROM Orders
JOIN Vendors ON Orders.vendorId == Vendors.vendorId;

-- update an order based on the user-inputted input (might not be used, since this update would not be ideal)
UPDATE Orders
SET vendorId = @vendorIdINPUT, subTotal = @subTotal, taxAmtOfTotal = @taxAmtOfTotal,
shippingCost = @shippingCost, orderDate = @orderDate, totalDue = @totalDue
WHERE orderId = @orderIdInput;

-- delete an order based on the matching id
DELETE FROM Orders
WHERE orderId = @orderIdINPUT;

-- CURD OrderDetails

INSERT INTO OrderDetails (orderId, candyId, orderWeightLbs, unitPricePerLb, lineTotal)
VALUES (@orderIdINPUT, @candyIdINPUT, @orderWeightLbsINPUT, @unitPricePerLbINPUT, @lineTotalINPUT);

-- get all order data to display in the table, adding the candy name to the displayed table
SELECT OrderDetails.orderDetailsId, OrderDetails.orderId, CONCAT(Candies.candyId, ' - ', Candies.candyName), 
OrderDetails.orderWeightLbsotal, OrderDetails.unitPricePerLb, OrderDetails.lineTotal FROM OrderDetails
JOIN Candies ON OrderDetails.candyId = Candies.candyId;

-- get a single order details's data for the Update Order Details form
SELECT Order.orderDetailsId, OrderDetails.orderId, CONCAT(Candies.candyId, ' - ', Candies.candyName), 
OrderDetails.orderWeightLbsotal, OrderDetails.unitPricePerLb, OrderDetails.lineTotal FROM OrderDetails
WHERE orderDetailsId = @orderDetailsIdINPUT;

-- support the M:M relationship update by updating an order detail's attributes and FK values based on
-- user-inputted values
UPDATE OrderDetails
SET orderId = @orderIdINPUT, candyId = @orderIdINPUT, orderWeightLbs = @orderWeightLbsINPUT, 
unitPricePerLb = @unitPricePerLbINPIT, lineTotal = @lineTotalINPUT
WHERE orderId = @orderIdInput;

-- delete an order detail based on the matching id
DELETE FROM OrderDetails
WHERE orderDetailId = @orderDetaildINPUT;

-- CRUD Vendors

-- add a new vendor user user-inputd values
INSERT INTO Vendors (vendorName, addressLine1, addressLine2, city, state, postalCode)
VALUES (@vendorNameINPUT, @addressLine1, @addressLine2, @city, @state, @postalCode);

-- get all vendor data, as well as their total ytdPurchases based on the sum of their order totals
SELECT Vendors.vendorId, Vendors.vendorName, Vendors.addressLine1, Vendors.addressLine2, Vendors.city, 
Vendors.state, Vendors.postalCode, SUM(Orders.totalDue) AS ytdPurchases
FROM Vendors
LEFT JOIN Orders ON Vendors.vendorId = Orders.vendorId
GROUP BY Vendors.vendorId, Vendors.vendorName, Vendors.addressLine1, Vendors.addressLine2, Vendors.city, 
Vendors.state, Vendors.postalCode;

-- get vendor id and name for dropdown
SELECT vendorId, vendorName FROM Vendors;

-- update a vendor with new, user-inputted values on the vendor with the matching id
UPDATE Vendors
SET vendorName = @vendorNameINPUT,
    addressLine1 = @addressLine1,
    addressLine2 = @addressLine2,
    city = @city,
    state = @state,
    postalCode = @postalCode,
WHERE vendorId = @vendorIdINPUT;

-- delete the vendor with the matching id
DELETE FROM Vendors
WHERE vendorId = @vendorIdINPUT;

-- CRUD InventorySpaces

-- add a new inventory space with user-inputted values for all attributes, including unique id value
INSERT INTO InventorySpaces (inventoryId, candyId, lastStocked, gallonsFilled)
VALUES (@inventoryIdINPUT, @candyIdINPUT, @lastStockedINPUT, @gallonsFilledINPUT);

-- get all inventory data to display
SELECT InventorySpaces.inventoryId, CONCAT(Candies.candyId, " - ", Candies.candyName), InventorySpaces.lastStocked, 
InventorySpaces.gallonsFilled FROM InventorySpaces
JOIN Candies ON InventorySpaces.candyId = Candies.candyId;

-- update an inventory space with new user-inputted date on the inventory space with the matching id
UPDATE InventorySpaces
SET candyId = @candyIdInput,
    lastStocked = @lastStockedInput,
    gallonsFilled = @gallonsFilledInput
WHERE inventoryId = @inventoryIdInput;

-- delete the matching inventory space
DELETE FROM InventorySpaces
WHERE inventoryId = @inventoryIdInput;
