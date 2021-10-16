$(document).ready(function () {
  console.log("ready!");

  var totalSteps = $('.quiz-step').length;
  var curStep = $('.quiz-step_active').data('step');

  $('.js-intro').click(function (e) {
    e.preventDefault();
    $('.wrapper').removeClass('wrapper-w-bgi');
    $('.intro').hide();
    $('.quiz').show();
    $('.progress__bar').css('width', parseFloat(100/totalSteps*curStep) + '%');
  })

  $('input[type="checkbox"], input[type="radio"]').change(function () {
    var radios = Array.from($('.quiz-step_active input'));
    var checkedRadio = radios.filter(function (e) {
      return e.checked;
    });
    if (checkedRadio.length > 0){
      $('button[type="submit"]').prop('disabled', false);
    }
    else {
      $('button[type="submit"]').prop('disabled', true);
    }
  })

  $('.quiz-form button[type="submit"]').click(function (e) {
    e.preventDefault();
    if (curStep === totalSteps){
      $('.quiz-form').css('display', 'none');
      $('.loading').css('display', 'block');
      $('.wrapper').addClass('wrapper-w-bgi');
      setTimeout(function () {
        $('.loading').css('display', 'none');
        $('.capture').css('display', 'block');
      }, 2000)
    }else{
      $('.loading').css('display', 'none');
      $('.quiz-form').css('display', 'flex');
      curStep = curStep + 1;
      $('.quiz-form button[type="submit"]').prop('disabled', true);
      $('.quiz-step').removeClass('quiz-step_active');
      $('.quiz-step[data-step="'+curStep+'"]').addClass('quiz-step_active');
      $('.progress__bar').css('width', parseFloat(100/totalSteps*curStep) + '%');
    }
  })

  $('.js-capture').click(function (e) {
    e.preventDefault();
    $('.capture').hide();
    $('.wrapper').removeClass('wrapper-w-bgi');
    $('.result').show();
  })

  $('.js-back').click(function (e) {
    e.preventDefault();
  })

});