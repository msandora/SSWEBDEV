/*----------------------------------------------------
Sheer Science Redesign
-----------------------------------------------------*/


function create_custom_dropdowns() {
  $('.swatch-dropdown select').each(function(i, select) {
    if (!$(this).next().hasClass('custom-dropdown')) {
      $(this).after('<div class="form-control custom-dropdown ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><span class="active-swatch"></span><div class="list"><ul></ul></div></div>');
      var dropdown = $(this).next();
      var options = $(select).find('option');
      var selected = $(this).find('option:selected');
      dropdown.find('.current').html(selected.data('display-text') || selected.text());
      options.each(function(j, o) {
        var display = $(o).data('display-text') || '';
        var swatch = $(o).val().replace(/\s+/g, '-').toLowerCase();
        if (display != 'Select Color' && display != 'Select') {
          dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '<img class="swatch-color" src="/SheerScience/Assets/img/' + swatch + '-swatch.png"></li>');
        }
      });
    }
  });
}
// Event listeners
// Open/close
$(document).on('click', '.swatch-dropdown .custom-dropdown', function(event) {
  $('.custom-dropdown').not($(this)).removeClass('open');
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    $(this).find('.option').attr('tabindex', 0);
    $(this).find('.selected').focus();
  } else {
    $(this).find('.option').removeAttr('tabindex');
    $(this).focus();
  }
});
// Close when clicking outside
$(document).on('click', function(event) {
  if ($(event.target).closest('.custom-dropdown').length === 0) {
    $('.custom-dropdown').removeClass('open');
    $('.custom-dropdown .option').removeAttr('tabindex');
  }
  event.stopPropagation();
});
// Option click
$(document).on('click', '.custom-dropdown .option', function(event) {
  $(this).closest('.list').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  var text = $(this).data('display-text') || $(this).text();
  $(this).closest('.custom-dropdown').find('.current').text(text);
  $(this).closest('.custom-dropdown').prev('select').val($(this).data('value')).trigger('change');
  var currentSwatch = $(this).children('span').attr('class');
   $('<span class="swatch-color swatch-' + currentSwatch + '"></span>').appendTo(".active-swatch");
  //  $('<span class="swatch-color ' + currentSwatch + '"></span>').appendTo($(this).parent('.custom-dropdown').find(".active-swatch"));
});

// Keyboard events
$(document).on('keydown', '.custom-dropdown', function(event) {
  var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
  // Space or Enter
  if (event.keyCode == 32 || event.keyCode == 13) {
    if ($(this).hasClass('open')) {
      focused_option.trigger('click');
    } else {
      $(this).trigger('click');
    }
    return false;
    // Down
  } else if (event.keyCode == 40) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      focused_option.next().focus();
    }
    return false;
    // Up
  } else if (event.keyCode == 38) {
    if (!$(this).hasClass('open')) {
      $(this).trigger('click');
    } else {
      var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
      focused_option.prev().focus();
    }
    return false;
  // Esc
  } else if (event.keyCode == 27) {
    if ($(this).hasClass('open')) {
      $(this).trigger('click');
    }
    return false;
  }
});





jQuery(document).ready(function () {
    if ($(".MarketingContainer__marketing-container")[0] && $(".Header__overlay")[0]){
      $('main.flex').addClass('Header__site-padding-top-with-promo');
    } 
    else if ($(".Header__overlay")[0]){
      $('main.flex').addClass('Header__site-padding-top-without-promo');
    }

    // Initialize custom dropdown field for swatch picker
    create_custom_dropdowns();

    // Open/Close Mobile Navigation
    $('.Header__nav-mobile-menu').on('click', function () {   
        var status = $('.Header__nav-group--mobile').attr('aria-hidden');
        if (status == 'false') {
          $('.Header__nav-group--mobile').attr('aria-hidden', 'true');
        } else {
          $('.Header__nav-group--mobile').attr('aria-hidden', 'false');
          $('.Header__nav-group--mobile').scrollTop(0);
        }
        $('.Header__container').toggleClass("Header__container--headroom");
        $(this).toggleClass("Header__nav-mobile-menu--active");
        $('.Header__nav-group--desktop').toggleClass("Header__nav-group--collapsed");
        $('.Header__nav-group--mobile').toggleClass("Header__nav-group--collapsed");
        $('.Header__nav-actions').toggleClass("Header__nav-actions--hide");
        $('#NavOverlay').toggleClass("Header__overlay-visible").toggleClass("layout__visually-hidden");
    });

    

    //Mobile Navigation Dropdowns
    $('.MenuListMobile__nav-menu-item').click(function () {
      var status = $(this).children('.MenuListMobile__nav-group').attr('data-status');
  
      // close everything first
      $('.MenuListMobile__nav-group').attr('data-status', 'closed');
      $('.MenuListMobile__nav-menu-item').removeClass('MenuListMobile__nav-menu-item--is-active');
      $('.MenuListMobile__mobile-nav-container').find('ul.MenuListMobile__nav-group').addClass('MenuListMobile__nav-group--is-hidden');

      if (status == 'closed') {
          // open it
          $(this).children('.MenuListMobile__nav-group').attr('data-status', 'open');
          $(this).addClass('MenuListMobile__nav-menu-item--is-active');
          $(this).find('ul').removeClass('MenuListMobile__nav-group--is-hidden');
      } else {
          // close it
          $(this).children('.MenuListMobile__nav-group').attr('data-status', 'closed');
          $(this).removeClass('MenuListMobile__nav-menu-item--is-active');
          $(this).find('ul').addClass('MenuListMobile__nav-group--is-hidden');
      }
    });

  // var executed = false;

  // var numItems = $('.HeaderNavMenu__item--hover').length;
  // $('.HeaderNavMenu__item--hover').each(function(){
  //     $(this).hover(function(){
  //       var status = $('.Header__overlay').attr('data-status');
  //       $(this).find( ".HeaderNavMenu__link" ).addClass('HeaderNavMenu__link--active');
  //       if (status == 'closed') {
  //         $('#NavOverlay').addClass("Header__overlay-visible").removeClass("layout__visually-hidden");
  //         $(".Header__nav-primary--container").addClass('Header__nav-primary--container-dropdown-visible');
  //         $(".Header__overlay").attr('data-status', 'open');
  //         if (!executed) {
  //             executed = true;
  //             // do something
  //             var dropdownHeight = $(this).find( ".HeaderNavMenu__dropdown" ).height(); dropdownHeight++
  //             $('head').append('<style>.Header__nav-primary--container:after{height:' + dropdownHeight + 'px !important;}</style>');
  //         }
  //       }
  //     }, function(){
  //       var status = $(".Header__overlay").attr('data-status');
  //       $(this).find( ".HeaderNavMenu__link" ).removeClass('HeaderNavMenu__link--active');
  //       if (status == 'open') {
  //         $('#NavOverlay').removeClass("Header__overlay-visible").addClass("layout__visually-hidden");
  //         $(".Header__nav-primary--container").removeClass('Header__nav-primary--container-dropdown-visible');
  //         $(".Header__overlay").attr('data-status', 'closed');
  //       }
  //     });
  // });



    // Adds/Dismisses overlay when hovering nav buttons on desktop

    $('.HeaderNavMenu__item--hover').hover(function(){
      var status = $('.Header__overlay').attr('data-status');
      $(this).find( ".HeaderNavMenu__link" ).addClass('HeaderNavMenu__link--active');
      if (status == 'closed') {
        $('#NavOverlay').addClass("Header__overlay-visible").removeClass("layout__visually-hidden");
        $(".Header__nav-primary--container").addClass('Header__nav-primary--container-dropdown-visible');
        $(".Header__overlay").attr('data-status', 'open');
        var dropdownHeight = $(this).find( ".HeaderNavMenu__dropdown" ).height(); dropdownHeight++
        $('head').append('<style>.Header__nav-primary--container:after{height:' + dropdownHeight + 'px !important;}</style>');
      }
    }, function () {  // Dismiss
      var status = $(".Header__overlay").attr('data-status');
      $(this).find( ".HeaderNavMenu__link" ).removeClass('HeaderNavMenu__link--active');
      if (status == 'open') {
        $('#NavOverlay').removeClass("Header__overlay-visible").addClass("layout__visually-hidden");
        $(".Header__nav-primary--container").removeClass('Header__nav-primary--container-dropdown-visible');
        $(".Header__overlay").attr('data-status', 'closed');
      }
    });

    // Cart Drawer
    $('.CartIcon__cart-icon, .Cart__hide-button').on('click', function () {  
      $('.Modal__overlay--cart').toggleClass("Modal__overlay--hidden").toggleClass("Modal__overlay--visible");
      $('.Cart__container').toggleClass("Cart__container--open");
    });

    // Keyword Search
    $('.Header__action-button').on('click', function () {  
        $('.Header__nav-actions').toggleClass("Header__nav-actions--hide-all");
        $('.Header__close-button').toggleClass("Header__close-button--hidden");
        $('.Header__drawer').toggleClass("Header__drawer--visible");
    });
});


/*----------------------------------------------------
  When promotion is present...
  this hides/display as user scrolls up/down
-----------------------------------------------------*/
$(function () {
  if ($(".MarketingContainer__marketing-container")[0]) {
      var header = $(".Header__container");
      var pos = header.position();
      $(window).scroll(function () {
          var windowpos = $(window).scrollTop();
          if (windowpos >= pos.top & windowpos >= 100) {
              header.addClass("headroom--not-top Header__container--unpinned");
          } else {
              header.removeClass("headroom--not-top Header__container--unpinned");
          }
      });
  }
});


/*----------------------------------------------------
  Remember which checkboxes have 
  been selected with local storage
-----------------------------------------------------*/
function App() { }

App.prototype.setState = function (key, state) {
    localStorage.setItem(key, state);
}

App.prototype.getState = function (key) {
    return localStorage.getItem(key);
}

function init() {
    var app = new App();

    // Get all checkboxes that we want to check
    var checkboxes = document.querySelectorAll('#accordion input[type="checkbox"]');

    // Loop through all checkboxes
    for (var i = 0; i < checkboxes.length; i++) {

        // The current checkbox in the loop
        var checkbox = checkboxes[i];

        // Determine if the checkbox is saved in LocalStorage
        var isSaved = app.getState(checkbox.id);

        // Set the selected state
        if (isSaved === 'true') {
            checkbox.checked = true;
        }

        // Create an event listener for each checkbox
        checkbox.addEventListener('click', function (e) {
            // We save the checkbox id as the key in localStorage
            // We save the checkbox checked state as the value
            var _checkbox = e.target;
            app.setState(_checkbox.id, _checkbox.checked)
        });
    }
}

init();

console.log("All Systems Go!");
