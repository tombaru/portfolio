// Модуль валидации
var validation = (function (){

  var init = function(){
        _setUpListners();
      },

      // Проверяет, чтобы все поля формы были не пустыми.
      // Если пустые - вызывает тултипы
      validateForm = function (form) {
        var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
            valid = true;
            
        $.each(elements, function(index, val) {
          var element = $(val),
              val = element.val(),
              pos = element.attr('qtip-position');

          if(val.length === 0){
            element.addClass('has-error');
            _createQtip(element, pos);
            valid = false;
          }
        });

        return valid;
      },
      // Прослушивает все события
      _setUpListners = function () {
        // удаляем красную обводку у элементов форм
        $('form').on('keydown', '.has-error', _removeError);
        // при сбросе формы удаляем также: тултипы, обводку, сообщение от сервера
        $('form').on('reset', _clearForm);
      },
      // Убирает красную обводку у элементов форм
      _removeError = function() {
        $(this).removeClass('has-error');
      },
      // Очищает форму
      _clearForm = function(form) {
        var form = $(this);
            // удаляем тултипы
            form.find('.input, .textarea').trigger('hideTooltip');
            // удаляем красную подсветку
            form.find('.has-error').removeClass('has-error');
            // очищаем и прячем сообщения с сервера
            form.find('.error-mes, success-mes').text('').hide();
      },
      // Создание тултипов
      _createQtip = function (element, position) {
        // позиция
        if (position === 'right') {
          position = {
            my: 'left center',
            at: 'right center'
          }
        }else{
          position = {
            my: 'right center',
            at: 'left center',
            adjust: {
              method: 'shift none'
            }
          }
        }
        // инициализация
        element.qtip({
          content: {
            text: function() {
              return $(this).attr('qtip-content');
            }
          },
          show: {
            event: 'show'
          },
          hide: {
            event: 'keydown hideTooltip'
          },
          position: position,
          style: {
            classes: 'qtip-mystyle qtip-rounded',
            tip: {
              height: 10,
              width: 16
            }
          }
        }).trigger('show');
      };

  return {
    init: init,
    validateForm: validateForm
  };

})();

validation.init();