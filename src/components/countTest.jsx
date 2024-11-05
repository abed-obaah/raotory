<?php
// Enable CORS and set response headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database credentials
$host = "localhost";
$db_name = "raotoryc_raotory";
$username = "raotoryc_raotory";
$password = "Thesentence22";

// Get the email from the query parameters
if (!isset($_GET['email'])) {
    echo json_encode(['error' => 'Email parameter is required']);
    exit;
}

$userEmail = $_GET['email'];

try {
    // Create a new PDO instance for database connection
    $dsn = "mysql:host=$host;dbname=$db_name;charset=utf8"; // Added charset
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// try {
//     // Updated query to fetch all sale products along with their corresponding purchase prices and sold_date
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date,  -- Include the sold_date column
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = []; // To store each sale product details for invoices

//     // Loop through each sale product and calculate profit
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];  // Get the sold date

//         // Calculate total cost and profit
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response, including sold_date
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate  // Include the sold_date in the response
//         ];

//         // Store sales data for invoices (you can add more fields if necessary)
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate  // Add the sold date for invoice
//         ];
        
//         $numberOfProductSold[] = [
//              'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             ];
//     }

//     // Return the profit data and sales data for invoices
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails  // Add sales details for invoices
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }

// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = [];
    
//     // Use a set to keep track of distinct products
//     $distinctProducts = [];

//     // Loop through each sale product to calculate profit and track distinct products
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];

//         // Calculate total cost and profit
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate
//         ];

//         // Store sales data for invoices
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate
//         ];

//         // Add product to distinct products set
//         $distinctProducts[$productName] = true; // Use the product name as key to ensure uniqueness
//     }

//     // Get the count of distinct products sold
//     $totalDistinctProductsSold = count($distinctProducts);

//     // Return the profit data and sales data for invoices, including total distinct products sold
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails,
//         'total_distinct_products_sold' => $totalDistinctProductsSold // Include distinct products sold in the response
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }


// for disntinct names

// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = [];
//     $uniqueProducts = []; // Array to track unique product names

//     // Loop through each sale product to calculate profit and track sales details
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];

//         // Calculate total cost and profit
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate
//         ];

//         // Store sales data for invoices
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate
//         ];

//         // Add product name to unique products array
//         $uniqueProducts[$productName] = true; // Use the product name as a key for uniqueness
//     }

//     // Get the count of distinct product names sold
//     $totalDistinctProductsSold = count($uniqueProducts);

//     // Return the profit data and sales data for invoices, including total distinct products sold
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails,
//         'total_distinct_products_sold' => $totalDistinctProductsSold // Include distinct products sold in the response
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }


//In the current implementation, the script counts the total quantity sold across all sales for a user. This means if a user sold multiple quantities of the same product, each quantity contributes to the total_products_sold. For example:

// If a user sold:
// 3 units of Product A
// 2 units of Product B
// 1 unit of Product C
// The total would be calculated as 3 + 2 + 1 = 6 (not just the count of distinct products).


// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = [];
//     $totalProductsSold = 0; // Initialize total products sold counter

//     // Loop through each sale product to calculate profit and track sales details
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];

//         // Calculate total cost and profit
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate
//         ];

//         // Store sales data for invoices
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate
//         ];

//         // Count each product sold by this user_email
//         $totalProductsSold += $quantity; // Add the quantity to the total products sold
//     }

//     // Return the profit data and sales data for invoices, including total products sold
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails,
//         'total_products_sold' => $totalProductsSold // Include total products sold in the response
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }

// for distinct

// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = [];
//     $distinctProducts = []; // Initialize an array to track distinct products

//     // Loop through each sale product to calculate profit and track sales details
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];

//         // Calculate total cost and profit
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate
//         ];

//         // Store sales data for invoices
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate
//         ];

//         // Track distinct product names sold
//         if (!in_array($productName, $distinctProducts)) {
//             $distinctProducts[] = $productName; // Add product name if it's not already in the array
//         }
//     }

//     // Count the number of distinct products sold
//     $totalProductsSold = count($distinctProducts); // Get the count of unique product names

//     // Return the profit data and sales data for invoices, including total products sold
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails,
//         'total_products_sold' => $totalProductsSold // Include total products sold in the response
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }




// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = [];
//     $totalProductsSold = 0; // Initialize the total products sold counter

//     // Loop through each sale product to calculate profit and track sales details
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];

//         // Calculate total cost and profit
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate
//         ];

//         // Store sales data for invoices
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate
//         ];

//         // Increment total products sold by the quantity sold for each product
//         $totalProductsSold += $quantity; // Count every product sold regardless of repeats
//     }

//     // Return the profit data and sales data for invoices, including total products sold
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails,
//         'total_products_sold' => $totalProductsSold // Include total products sold in the response
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }



// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = [];
//     $totalProductsSold = 0; // Initialize the total products sold counter

//     // Create an array to track unique product names sold
//     $productNamesCounted = [];

//     // Loop through each sale product to calculate profit and track sales details
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
        
//         // Check if the product name has already been counted
//         if (!in_array($productName, $productNamesCounted)) {
//             $productNamesCounted[] = $productName; // Add to counted products
//             $totalProductsSold++; // Increment count of unique product names
//         }

//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];

//         // Calculate total cost and profit
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate
//         ];

//         // Store sales data for invoices
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate
//         ];
//     }

//     // Return the profit data and sales data for invoices, including total products sold
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails,
//         'total_products_sold' => $totalProductsSold // Include total products sold in the response
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }



// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = [];
//     $totalProductsSold = 0; // Initialize the total products sold counter
//     $productCount = []; // Array to count occurrences of each product name

//     // Loop through each sale product to calculate profit and track sales details
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];

//         // Calculate total cost and profit
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate
//         ];

//         // Store sales data for invoices
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate
//         ];

//         // Count occurrences of the product name
//         if (!isset($productCount[$productName])) {
//             $productCount[$productName] = 0; // Initialize if not set
//         }
//         $productCount[$productName] += $quantity; // Increment the count for this product

//         // Increment total products sold by the quantity sold for each product
//         $totalProductsSold += $quantity; // Count every product sold regardless of repeats
//     }

//     // Count unique product names for total count of different products sold
//     $uniqueProductCount = count($productCount);

//     // Return the profit data and sales data for invoices, including total products sold
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails,
//         'total_products_sold' => $totalProductsSold, // Include total products sold in the response
//         'unique_products_sold' => $uniqueProductCount // Total unique product names sold
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }



// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     $profits = [];
//     $salesDetails = [];
//     $totalProductsSold = count($sales); // Count each sale entry directly

//     // Loop through each sale product to calculate profit and track sales details
//     foreach ($sales as $sale) {
//         $productName = $sale['product_name'];
//         $quantity = $sale['quantity'];
//         $sellPrice = $sale['sell_price'];
//         $purchasePrice = $sale['purchase_price'];
//         $soldDate = $sale['sold_date'];

//         // Calculate total cost and profit for each sale
//         $totalCost = $quantity * $purchasePrice;
//         $totalSales = $quantity * $sellPrice;
//         $profitMade = $totalSales - $totalCost;

//         // Store profit data in the array for response
//         $profits[] = [
//             'product_name' => $productName,
//             'quantity_sold' => $quantity,
//             'total_sales' => $totalSales,
//             'total_cost' => $totalCost,
//             'profit_made' => $profitMade,
//             'sold_date' => $soldDate
//         ];

//         // Store sales data for invoices
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $productName,
//             'quantity' => $quantity,
//             'sell_price' => $sellPrice,
//             'sold_date' => $soldDate
//         ];
//     }

//     // Return the profit data and sales data for invoices, including total products sold
//     echo json_encode([
//         'success' => true,
//         'profits' => $profits,
//         'sales' => $salesDetails,
//         'total_products_sold' => $totalProductsSold // Total count of individual sales
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }



// try {
//     // Query to fetch all sale products along with their corresponding purchase prices
//     $stmt = $pdo->prepare("
//         SELECT 
//             sp.id AS sale_product_id,
//             sp.product_name,
//             sp.quantity,
//             sp.sell_price,
//             sp.sold_date, 
//             d.purchase_price
//         FROM 
//             sale_products sp
//         JOIN 
//             drugs d ON sp.product_name = d.product_name
//         WHERE
//             sp.user_email = :user_email
//     ");
    
//     // Bind the parameter and execute
//     $stmt->execute(['user_email' => $userEmail]);
//     $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
//     if (!$sales) {
//         echo json_encode(['error' => 'No sales found for this user.']);
//         exit;
//     }

//     // Get the count of all sales entries
//     $totalProductsSold = count($sales); // Count each sale entry directly

//     // Prepare the sales details without calculations
//     $salesDetails = [];
//     foreach ($sales as $sale) {
//         $salesDetails[] = [
//             'sale_product_id' => $sale['sale_product_id'],
//             'product_name' => $sale['product_name'],
//             'quantity' => $sale['quantity'],
//             'sell_price' => $sale['sell_price'],
//             'sold_date' => $sale['sold_date']
//         ];
//     }

//     // Return the sales data and the total number of sales
//     echo json_encode([
//         'success' => true,
//         'sales' => $salesDetails,
//         'total_products_sold' => $totalProductsSold // Total count of sales entries
//     ]);
// } catch (PDOException $e) {
//     echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
// }


try {
    // Query to fetch all sale products along with their corresponding purchase prices
    $stmt = $pdo->prepare("
        SELECT 
            sp.id AS sale_product_id,
            sp.product_name,
            sp.quantity,
            sp.sell_price,
            sp.sold_date, 
            d.purchase_price
        FROM 
            sale_products sp
        JOIN 
            drugs d ON sp.product_name = d.product_name
        WHERE
            sp.user_email = :user_email
    ");
    
    // Bind the parameter and execute
    $stmt->execute(['user_email' => $userEmail]);
    $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (!$sales) {
        echo json_encode(['error' => 'No sales found for this user.']);
        exit;
    }

    $profits = [];
    $salesDetails = [];
    $totalProductsSold = 0; // Initialize total products sold

    // Loop through each sale product to calculate profit and store sales details
    foreach ($sales as $sale) {
        $productName = $sale['product_name'];
        $quantity = $sale['quantity'];
        $sellPrice = $sale['sell_price'];
        $purchasePrice = $sale['purchase_price'];
        $soldDate = $sale['sold_date'];

        // Calculate total cost and profit
        $totalCost = $quantity * $purchasePrice;
        $totalSales = $quantity * $sellPrice;
        $profitMade = $totalSales - $totalCost;

        // Store profit data in the array for response
        $profits[] = [
            'product_name' => $productName,
            'quantity_sold' => $quantity,
            'total_sales' => $totalSales,
            'total_cost' => $totalCost,
            'profit_made' => $profitMade,
            'sold_date' => $soldDate
        ];

        // Store sales data for invoices
        $salesDetails[] = [
            'sale_product_id' => $sale['sale_product_id'],
            'product_name' => $productName,
            'quantity' => $quantity,
            'sell_price' => $sellPrice,
            'sold_date' => $soldDate
        ];

        // Accumulate the total quantity sold
        $totalProductsSold += $quantity;
    }

    // Return the profit data and sales data for invoices, including total products sold
    echo json_encode([
        'success' => true,
        'profits' => $profits,
        'sales' => $salesDetails,
        'total_products_sold' => $totalProductsSold // Now correctly reflecting total products sold
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Failed to fetch sales data: ' . $e->getMessage()]);
}


?>
