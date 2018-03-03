// client-side js for [index]

$(function() {
  console.log('hello world :o');
  
  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

  
  
  
  
  
  /*********/
  // Slider
  /*********/
  
    let img_index = 0;
    slide();

    function slide() {
        var i;
        var x = document.getElementsByClassName("slides");
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";  
        }
        img_index++;
        if (img_index > x.length) img_index = 1;  
        x[img_index-1].style.display = "block";  
        setTimeout(slide, 5000); // Change image every 2 seconds
    }
});
