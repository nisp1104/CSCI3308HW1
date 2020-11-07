var counter = 1;

function makeApiCall() {
    var userTags = document.getElementById("enterTags").value;
    var photoCount = document.getElementById("selectImages").value;
    var url =`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=24a3c2a51ab53b02d3dbe66458445150&tags=${userTags}&per_page=${photoCount}&page=${counter}&format=json&nojsoncallback=1`;
    $.ajax({url:url, dataType: "json", jsonpCallback: 'jsonFlickrFeed'}).then(function(data) {
        console.log(data);

        for (var i = 0; i < photoCount / 5; i++) {
            var divCardGroup = document.createElement("div");
            divCardGroup.className = "card-group";
            document.getElementById("image_container").appendChild(divCardGroup);
            
            for (var j = 0; j < 5; j++) {
                var divCard = document.createElement("div");
                divCard.className = "card mb-3";
                divCard.style = "width: 20%";
    
                var img = document.createElement("img");
                var photo = data.photos.photo[5*i+j];
    
                img.className = "card-img-top";
                img.src = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                
                var divBody = document.createElement("div");
                divBody.className = "card-body";
    
                var header = document.createElement("h5");
                header.className = "card-title";
                header.innerText = photo.title;
    
                divCardGroup.appendChild(divCard);
                divCard.appendChild(img);
                divCard.appendChild(divBody);
                divBody.appendChild(header);
            }
        }
    });
}

$(window).scroll(function() {   
    if($(window).scrollTop() + $(window).height() > $(document).height() - 5) {
        counter += 1;
        makeApiCall();
    }
  });