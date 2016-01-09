var app = (function(){

  var init = function(){
    setUpListeners();
  };

  var setUpListeners = function(){
    $('.input-file').on('change', showText);

  };

  var showText =function(){
    var fileName = $(this).val().substr(12);
    var fakeInput = ($('.fake-upload .input'));
    var fakeInput = fakeInput[0];
    fakeInput.placeholder = fileName;

    // $('.fake-upload').children('input').placeholder = ($(this).val().substr(12));
  };


  return{
    init:init
  }
}());


app.init();
