function fetchGitHubInformation(event){

    let username = $("#gh-username").val();
    if (!username) {
        $('#gh-user-data').html(`<h2>Please enter username!</h2>`);
        return;
    }
    $("#gh-user-data").html(
        `<div id="loader">
        <img src="images/loader.gif" alt="loading..."/>
        </div>`
    );
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response){
            let userData = response;
            $("gh-user-data").html(userInformationHTML(userData));
        }, function (errorResponse){
            if (errorResponse.status === 404){
                $("gh-user-data").html(`<h2>No info found ${username}</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(
                    `<h2>Error: ${`errorResponse.responseJSON.message`}</h2>`
                );
            }
        }
    )
}