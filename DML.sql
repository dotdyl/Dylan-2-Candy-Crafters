-- CRUD Candies [Create, Read, Update, Delete]

INSERT INTO Candies(candyName, pricePerLb, lbsPerGallon)
VALUES (@candyNameINPUT, @pricePerLbINPUT, @lbsPerGallonINPUT);

SELECT Candies.candyId, Candies.candyName, Candies.pricePerLb, Candies.lbsPerGallon, InventorySpaces.gallonsFilled
FROM Candies
JOIN InventorySpaces ON Candies.candyId = InventorySpaces.candyId;

UPDATE Candies
SET candyName = @candyNameINPUT, pricePerLb = @pricePerLbINPUT, lbsPerGallon = @lbsPerGallonINPUT
WHERE candyId = @candyIdINPUT;

DELETE FROM Candies
WHERE candyId = @candyIdINPUT;

-- CRUD Orders

INSERT INTO Orders (vendorId, subTotal, taxAmtOfTotal, shippingCost, orderDate, totalDue)
VALUES (@vendorIdINPUT, @subTotal, @taxAmt, @shipping, @orderDate, @totalDue);

SELECT * FROM Orders;

UPDATE Orders
SET vendorId = @vendorIdINPUT, subTotal = @subTotal, taxAmtOfTotal = @taxAmtOfTotal,
shippingCost = @shippingCost, orderDate = @orderDate, totalDue = @totalDue
WHERE orderId = @orderIdInput;

DELETE FROM Orders
WHERE orderId = @orderIdINPUT;

-- CRUD Vendors

INSERT INTO Vendors (vendorName, addressLine1, addressLine2, city, state, postalCode)
VALUES (@vendorNameINPUT, @addressLine1, @addressLine2, @city, @state, @postalCode);

SELECT * FROM Vendors;

UPDATE Vendors
SET vendorName = @vendorNameINPUT,
    addressLine1 = @addressLine1,
    addressLine2 = @addressLine2,
    city = @city,
    state = @state,
    postalCode = @postalCode,
WHERE vendorId = @vendorIdINPUT;

DELETE FROM Vendors
WHERE vendorId = @vendorIdINPUT;

-- CRUD InventorySpaces

INSERT INTO InventorySpaces (candyId, lastStocked, gallonsFilled)
VALUES (@candyIdINPUT, @lastStockedINPUT, @gallonsFilledINPUT);

SELECT * FROM InventorySpaces;

UPDATE InventorySpaces
SET candyId = @candyIdInput,
    lastStocked = @lastStockedInput,
    gallonsFilled = @gallonsFilledInput
WHERE inventoryId = @inventoryIdInput;

-- Query to delete an inventory space
DELETE FROM InventorySpaces
WHERE inventoryId = @inventoryIdInput;
