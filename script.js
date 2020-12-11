var pages = 0;
var counter = 1;
$(document).ready(function()
{
    function makeApiCall()
    {
        // var quantity = 50;
        var s = document.getElementById("movieInput").value;
        var url = `http://www.omdbapi.com/?s=${s}&apikey=f13c29df`;  
        $.ajax({url: url, contentType: "application/jsonp", dataType: 'jsonp',}).then(function(data)
        {
            console.log(data);
            function NewCards(counter)
            {
                var posterURL = data[counter].Poster;
                var title = data[counter].Title;
                return `<div class ="card">
                    <img class="card-img-top src=${posterURL} alt="NA">;
                    <div class="card-body">
                        <h4 class=card-title>${title}</h4>
                    </div>
                </div>`
            }


            var newCards = '';
            for(var i = 0; i < data.length; i++)
            {
                newCards += NewCards(i);
            }
            console.log("page: " + pages);
            pages++;
            $("#img_display").append(newCards);
        });
    }
    $("#query").submit(function(event)
    {
        event.preventDefault();
        pages=0;
        $("#img_display").html("");
        makeApiCall();
    });

    $(window).scroll(function() 
    {
        if($(window).scrollTop() >= ($(document).height() - $(window).height()))
        {
            makeApiCall();
        }
    });
});


function AddData()
{
    var rows="";
    var review=document.getElementById("review").value
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    rows+="<tr><td>"+collegeName+"</td><td>"+today+"</td><td>"+counter+"</td><td>"+review_itself+"</td></tr>";
    counter+=1;
    $(rows).appendTo("#list tbody");

}
