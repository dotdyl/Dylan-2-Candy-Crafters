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
WHERE orderID = @orderIDInput

DELETE FROM Orders
WHERE orderID = @orderIDINPUT;


-- CRUD Vendors
-- CRUD InventorySpaces
