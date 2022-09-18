<?php

// This script makes a server-to-server POST request in
// order to hide any API keys from the user
// (in a real site, you'd probably want to authenticate
// the user before allowing them to use this script!)

if ($_ENV['stage'] == 'production') {
	$url = $_ENV['REACT_APP_games_service_url'] . "/games";
	$api_key = '';
} else {
	$url = $_ENV['REACT_APP_games_service_url_internal'] . "/games";
	$api_key = '';
}

// get the JSON object POSTed to this script
$content = file_get_contents('php://input');

// POST the JSON object to the 'games' microservice
// API Key required for authorisation
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    "Content-type: application/json",
    "x-api-key: $api_key"
));
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $content);

// extract the JSON response from 'games'
$json_response = curl_exec($curl);

// extract the HTTP request code 'games'
$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

curl_close($curl);

// respond with the HTTP request code and body
http_response_code($status);
echo $json_response;

?>