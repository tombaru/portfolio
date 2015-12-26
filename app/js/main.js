var app = (function(){

  var init = function(){
    setUpListeners();
  };

  var setUpListeners = function(){
    $('.input-file').on('change', showText);

  };

  var showText =function(){
    console.log($(this).val());
    $('.fake-upload').html($(this).val());
  };


  return{
    init:init
  }
}());


app.init();
