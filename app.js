
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Load stored bookmarks
fetchBookmarks();

function saveBookmark(e){

  var siteName = document.getElementById('desc').value;
  var siteURL = document.getElementById('url').value;

  //Form validation
  function validate(siteName,siteURL){
    if(!siteName || !siteURL){
      alert('Please fill the form');
      return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteURL.match(regex)){
      alert('Please enter a valid URL');
      return false;
    }
    return true;
  }

  if(!validate(siteName,siteURL)){
    return false;
  }

   var bookmark = {
     name: siteName,
     url: siteURL
   };

   if (localStorage.getItem('bookmarks') === null) {
    //Init of the array of bookmarks
    var bookmarks = [];
    //Adding to the array
    bookmarks.push(bookmark);
    //Adding to the LocalStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   }
   else{
     //Getting the Bookmarks from the LocalStorage
     //Must be an Object to add items
    var bookmarks =  JSON.parse(localStorage.getItem('bookmarks'));
    //Adding to the bookmarks
    bookmarks.push(bookmark);
    //Adding the LocalStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
   }
    fetchBookmarks();

    document.getElementById('myForm').reset();    
    e.preventDefault();
    };

    function deleteBookmark(url){
      //Get Bookmarks
      var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      for(i=0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
          bookmarks.splice(i,1);
        }
      }
      //Re-set Bookmarks
      localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
      //Re-fetch Bookmarks
      fetchBookmarks();
    }

   function fetchBookmarks(){
     //Getting bookmarks from the LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var result = document.getElementById('bookmarks');
    result.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
      //getting values from bookmarks
      var desc = bookmarks[i].name;
      var url = bookmarks[i].url;

      result.innerHTML += 
      '<li>'+
        '<div class="title">' +desc+ '</div>'+
          '<div class="links">'+
            ' <a class="btn-visit" target="_blank" href="'+url+'">Visit</a> ' +
            ' <a onclick="deleteBookmark(\''+url+'\')" class="btn-delete" href="#">Delete</a> ' +
        '</div>'+
      '</li>';
    }


  }
