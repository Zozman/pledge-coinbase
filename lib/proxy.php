<?PHP
/*
 * proxy.php
 *
 * Used to overcome Origin Server Problems
 * Used for Pledge jQuery Plugin
 *
 * By Zac Lovoy              zwlovoy@gmail.com
 */
	// Import the Coinbase PHP Package
	require_once("Coinbase.php");
	// Initialize the coinbase variable with the key and secret
	$coinbase = Coinbase::withApiKey($_GET['key'], $_GET['secret']);
	// Use the Coinbase API to get a button response
	$response = $coinbase->createButton("Donation", $_GET['amount'], $_GET['currency'], "", array(
            "description" => "", "price_string" => $_GET['amount'],
            "price_currency_iso" => $_GET['currency'], "type" => "donation",
            "style" => "none"
        ));
	// Return the JSON object
	echo json_encode($response);
?>