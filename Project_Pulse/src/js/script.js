$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 1000,
    adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src = "icons/arrow-left.svg"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src = "icons/arrow-right.svg"></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 320,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  });
  $('ul.catalog__tabs').on(
    'click',
    'li:not(.catalog__tab_active)',
    function () {
      $(this)
        .addClass('catalog__tab_active')
        .siblings()
        .removeClass('catalog__tab_active')
        .closest('div.container')
        .find('div.catalog__content')
        .removeClass('catalog__content_active')
        .eq($(this).index())
        .addClass('catalog__content_active');
    }
  );

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (event) {
        event.preventDefault();
        $('.catalog-item__content')
          .eq(i)
          .toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });
  // $('.button_mini').on('click', function () {
  //   $('.overlay, #order').fadeIn('slow');
  // });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  // $('#consultation-form').validate();
  // $('#consultation form').validate({
  //   rules: {
  //     name: {
  //       required: true,
  //       minlength: 2,
  //     },
  //     phone: 'required',
  //     email: {
  //       required: true,
  //       email: true,
  //     },
  //   },
  //   messages: {
  //     name: {
  //       required: 'Пожалуйста, введите своё имя',
  //       minlength: jQuery.validator.format('Введите {0} символа(ов)!'),
  //     },
  //     phone: 'Пожалуйста, введите свой номер телефона',
  //     email: {
  //       required: 'Пожалуйста, введите свою почту',
  //       email: 'Ваш почтовый адрес должен быть в формате: name@domain.com',
  //     },
  //   },
  // });
  // $('#order form').validate();

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2,
        },
        phone: 'required',
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: 'Пожалуйста, введите своё имя',
          minlength: jQuery.validator.format('Введите {0} символа(ов)!'),
        },
        phone: 'Пожалуйста, введите свой номер телефона',
        email: {
          required: 'Пожалуйста, введите свою почту',
          email: 'Ваш почтовый адрес должен быть в формате: name@domain.com',
        },
      },
    });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: 'mailer/mailer/smart.php',
      data: $(this).serialize(),
    }).done(function () {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  //Плавный скроллинг

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $('a[href^=#up]').click(function () {
    const _href = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
    return false;
  });

  new WOW().init();
});
