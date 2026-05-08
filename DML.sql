-- CRUD Candies [Create, Read, Update, Delete]

INSERT INTO Candies(candyName, pricePerLb, lbsPerGallon)
VALUES (@candyNameINPUT, @pricePerLbINPUT, @lbsPerGallonINPUT);

SELECT Candies.candyID, Candies.candyName, Candies.pricePerLb, Candies.lbsPerGallon, InventorySpaces.gallonsFilled
FROM Candies
JOIN InventorySpaces ON Candies.candyID = InventorySpaces.candyID;

UPDATE Candies
SET candyName = @candyNameINPUT, pricePerLb = @pricePerLbINPUT, lbsPerGallon = @lbsPerGallonINPUT
WHERE candyID = @candyIDINPUT;

DELETE FROM Candies
WHERE candyID = @candyIDINPUT;

-- CRUD Orders

INSERT INTO Orders (vendorID, subTotal, taxAmtOfTotal, shippingCost, orderDate, totalDue)
VALUES (@vendorIDINPUT, @subTotal, @taxAmt, @shipping, @orderDate, @totalDue);

SELECT * FROM Orders;

UPDATE Orders
SET vendorID = @vendorIDINPUT, subTotal = @subTotal, taxAmtOfTotal = @taxAmtOfTotal,
shippingCost = @shippingCost, orderDate = @orderDate, totalDue = @totalDue
WHERE orderID = @orderIDInput;

DELETE FROM Orders
WHERE orderID = @orderIDINPUT;

-- CRUD Vendors

INSERT INTO Vendors (vendorName, addressLine1, addressLine2, city, state, postalCode, ytdPurchasesTotal)
VALUES (@vendorNameINPUT, @addressLine1, @addressLine2, @city, @state, @postalCode, @ytdPurchasesTotal);

SELECT * FROM Vendors;

UPDATE Vendors
SET vendorName = @vendorNameINPUT,
    addressLine1 = @addressLine1,
    addressLine2 = @addressLine2,
    city = @city,
    state = @state,
    postalCode = @postalCode,
    ytdPurchasesTotal = @ytdPurchasesTotal
WHERE vendorID = @vendorIDINPUT;

DELETE FROM Vendors
WHERE vendorID = @vendorIDINPUT;

-- CRUD InventorySpaces

INSERT INTO InventorySpaces (candyID, lastStocked, gallonsFilled)
VALUES (@candyIDINPUT, @lastStockedINPUT, @gallonsFilledINPUT);

SELECT * FROM InventorySpaces;

UPDATE InventorySpaces
SET candyID = @candyIDInput,
    lastStocked = @lastStockedInput,
    gallonsFilled = @gallonsFilledInput
WHERE inventoryID = @inventoryIDInput;

-- Query to delete an inventory space
DELETE FROM InventorySpaces
WHERE inventoryID = @inventoryIDInput;
