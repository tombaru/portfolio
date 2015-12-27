var app = (function(){

  var init = function(){
    setUpListeners();
  };

  var setUpListeners = function(){
    $('.input-file').on('change', showText);

  };

  var showText =function(){
    console.log($(this).val().substr(12));
    $('.fake-upload').html($(this).val().substr(12));
  };


  return{
    init:init
  }
}());


app.init();
