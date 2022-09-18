<?php
	$url = $_ENV['games_service_url'] . "/games";
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">

    <title>GamerSG</title>

    <link rel="stylesheet" href="">
    <!--[if lt IE 9]>
      <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- Bootstrap libraries -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"
        integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
        crossorigin="anonymous"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"
        integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
        crossorigin="anonymous"></script>
</head>

<body>
    <div id="main-container" class="container">
        <h1 class="display-4">GamerSG &#127480;&#127468; – Store Administration</h1>
        <table id="gamesTable" class='table table-striped' border='1'>
            <thead class='thead-dark'>
                <tr>
                    <th>Title</th>
                    <th>Platform</th>
                    <th>Price</th>
                    <th>Stock</th>
					<th>Delete</th>
                </tr>
            </thead>
        </table>
        <a id="addGameBtn" class="btn btn-primary" href="add-game.html">Add a game</a>
        <a id="buyGameBtn" class="btn btn-primary" href="buy-game.html">Add a game</a>
    </div>
    <script>
        // Helper function to display error message
        function showError(message) {
            // Hide the table and button in the event of error
            $('#gamesTable').hide();
            $('#addGameBtn').hide();

            // Display an error under the main container
            $('#main-container')
                .append("<label>" + message + "</label>");
        }

        // anonymous async function - using await requires the function that calls it to be async
        $(async () => {
            // Change serviceURL to your own
            const serviceURL = "<?php echo $url; ?>";

            try {
                const response =
                    await fetch(
                        serviceURL, { mode: 'cors', method: 'GET' }
                    );
                const result = await response.json();
                if (response.status === 200) {
                    // success case
                    const games = result.data.games;

                    // for loop to setup all table rows with obtained game data
                    let rows = "";
                    for (const game of games) {
                        eachRow =
                            '<td>' + game.title + '</td>' +
                            '<td>' + game.platform + '</td>' +
                            '<td>' + game.price + '</td>' +
                            '<td>' + game.stock + '</td>' +
						    '<td><a href="deleteGame.php?game_id=' + game.game_id + '" style="text-decoration: none;">&#10060;</a></td>';
                        rows += '<tbody><tr>' + eachRow + '</tr></tbody>';
                    }
                    // add all the rows to the table
                    $('#gamesTable').append(rows);

                } else if (response.status == 404) {
                    // No games
                    showError
                        (result.message);
                } else {
                    // unexpected outcome, throw the error
                    throw response.status;
                }

            } catch (error) {
                // Errors when calling the service; such as network error, 
                // service offline, etc
                showError
                    ('There is a problem retrieving the games, please try again later.<br />' + error);

            } // error
        });
    </script>
</body>

</html>