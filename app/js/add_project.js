// Модуль обратной связи
var addProject = (function (){

  var init = function(){
        console.log('Инициализация модуля addProject');
        _setUpListners();
      },

      _setUpListners = function () {
        $('#add-project').on('submit', _submitForm);
      },
      _submitForm = function (e) {
        console.log('Сабмит формы');

        e.preventDefault();

        var form = $(this),
            url = '/ajax.php',
            defObject = _ajaxForm(form, url);

        if (defObject) {
            defObject.done(function(answer) {
              var message = answer.message,
                  status = answer.status;

              if (status === 'OK'){
                form.trigger('reset');
                form.find('.success-message').text(message).show();
              } else {
                form.find('.error-message').text(message).show();
              }

            });
        }

      },
      _ajaxForm = function (form, url) {

        // вовзращает false, если не проходит валидация
        if (!validation.validateForm(form)) return false;

        var data = form.serialize();

        return $.ajax({

          type: 'POST',
          url: url,
          dataType: 'JSON',
          data: data

        }).fail( function(answer) {
            console.log('Проблемы в PHP');
            form.find('.error-message').text('На сервере произошла ошибка').show();
        });


      };


  return {
    init: init,
  };
})();

addProject.init();