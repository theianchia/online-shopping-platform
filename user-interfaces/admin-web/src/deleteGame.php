<?php

// This script makes a server-to-server POST request in
// order to hide any API keys from the user
// (in a real site, you'd probably want to authenticate
// the user before allowing them to use this script!)

if ($_ENV['stage'] == 'production') {
	$url = $_ENV['games_service_url'] . "/games";
	$api_key = '';
} else {
	$url = $_ENV['games_service_url_internal'] . "/games";
	$api_key = '';
}

$game_id = $_GET['game_id'];

if (is_numeric($game_id))
{
	$url .= "/" . $game_id;
	
	// POST the JSON object to the 'games' microservice
	// API Key required for authorisation
	$curl = curl_init($url);
	curl_setopt($curl, CURLOPT_HEADER, false);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array(
	    "Content-type: application/json",
	    "x-api-key: $api_key"
	));
	curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
	curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

	// extract the JSON response from 'games'
	$json_response = curl_exec($curl);

	// extract the HTTP request code 'games'
	$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

	curl_close($curl);
}

header("Location: ./");
exit();

?>