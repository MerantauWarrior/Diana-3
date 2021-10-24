$(document).ready(function () {

  var curStep = 0;
  var results = {
    price: 0,
    material: ''
  };

  $('.js-intro').click(function (e) {
    e.preventDefault();
    curStep = curStep + 1;
    $('.wrapper').removeClass('wrapper-w-bgi');
    $('.intro').hide();
    $('.quiz').css('display', 'flex');
    $('.footer__designed').hide();
    $('.progress').show();
    $('.progress__bar').css('width', parseFloat(100/6*curStep) + '%');
    $('.header__back').show();
    $('.quiz-step[data-step="'+curStep+'"]').addClass('quiz-step_active');
    btnDisabled();
  })

  function btnDisabled(){
    var radios = Array.from($('.quiz-step_active input'));
    var checkedRadio = radios.filter(function (e) {
      return e.checked;
    });
    if (checkedRadio.length > 0){
      $('.js-quiz-submit').prop('disabled', false);
    }
    else {
      $('.js-quiz-submit').prop('disabled', true);
    }
  }

  $('input[type="checkbox"], input[type="radio"]').change(function () {
    btnDisabled();
  })

  function resultEnd(title, img, link){
    $('.result__name').text(title);
    $('.result__media img').attr('src', img);
    $('.result__controls a').attr('href', link);
  }

  $('.js-quiz-submit').click(function () {
    curStep = curStep + 1;
    if (curStep > 6){
      $('.quiz-step').removeClass('quiz-step_active');
      $('.js-quiz-submit').hide();
      $('.loading').show();
      $('.wrapper').addClass('wrapper-w-bgi');
      setTimeout(function () {
        $('.loading').hide();
        $('.quiz-step[data-step="'+curStep+'"]').addClass('quiz-step_active');
      }, 2000);
      results.price = parseInt($('input[name="q1"]:checked').val());
      results.material = $('input[name="q2"]:checked').val().toLowerCase();

      if (results.price < 2000 && results.material === 'plush'){
        resultEnd('Dreamcloud Classic', 'imgs/Dreamcloud/classic.jpeg', '#Dreamcloudclassic')
      }
      if (results.price < 2000 && results.material === 'medium'){
        resultEnd('Nectar Classic', 'imgs/Nectar/classic.jpeg', '#Nectarclassic')
      }
      if (results.price < 2000 && results.material === 'firm'){
        resultEnd('Awara Classic', 'imgs/Awara/classic.jpeg', '#Awaraclassic')
      }
      if (results.price === 2000 && results.material === 'plush'){
        resultEnd('Dreamcloud Premier', 'imgs/Dreamcloud/premier.jpeg', '#Dreamcloudpremier')
      }
      if (results.price === 2000 && results.material === 'medium'){
        resultEnd('Nectar Premier', 'imgs/Nectar/premier.jpeg', '#Nectarpremier')
      }
      if (results.price === 2000 && results.material === 'firm'){
        resultEnd('Awara Premier', 'imgs/Awara/premier.jpeg', '#Awarapremier')
      }

    }else{
      $('.quiz-step').removeClass('quiz-step_active');
      $('.quiz-step[data-step="'+curStep+'"]').addClass('quiz-step_active');
      $('.progress__bar').css('width', parseFloat(100/6*curStep) + '%');
      btnDisabled();
    }
  })

  $('.js-capture').click(function (e) {
    e.preventDefault();
    var email = $(this).siblings('input[type="email"]').val().trim();
    console.log(email)
    if (email.length > 0){

      const options = {
        method: 'POST',
        headers: {Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          data: '{"token": "KnHZJR","properties": {"$email":'+email+'}}'
        })
      };
      console.log(options)
      fetch('https://a.klaviyo.com/api/identify', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

      curStep = curStep + 1;
      $('.quiz-step').removeClass('quiz-step_active');
      $('.quiz-step[data-step="'+curStep+'"]').addClass('quiz-step_active');
      $('.wrapper').removeClass('wrapper-w-bgi');
      $('.footer__designed').show();
    }
  })
  $('#cEmail').keyup(function () {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ($(this).val().length > 0 && filter.test($(this).val().trim())){
      $('.js-capture').prop('disabled', false);
    }else {
      $('.js-capture').prop('disabled', true);
    }
  })

  $('.js-back').click(function (e) {
    e.preventDefault();
    curStep = curStep - 1;
    $('.quiz-step').removeClass('quiz-step_active');
    $('.quiz-step[data-step="'+curStep+'"]').addClass('quiz-step_active');
    if (curStep < 7){
      $('.wrapper').removeClass('wrapper-w-bgi');
      $('.progress__bar').css('width', parseFloat(100/6*curStep) + '%');
      $('.js-quiz-submit').show();
      btnDisabled();
    }
    if (curStep < 1){
      $('.wrapper').addClass('wrapper-w-bgi');
      $('.intro').show();
      $('.quiz').css('display', 'none');
      $('.footer__designed').show();
      $('.progress').hide();
      $('.progress__bar').css('width', parseFloat(100/6*curStep) + '%');
      $('.header__back').hide();
    }
    if (curStep === parseInt($('.quiz-step').length - 1)){
      $('.wrapper').addClass('wrapper-w-bgi');
    }
  })

});