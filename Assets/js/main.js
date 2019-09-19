/*----------------------------------------------------
Sheer Science Redesign
-----------------------------------------------------*/
console.log("All Systems Go!");

jQuery(document).ready(function () {
    // Open/Close Mobile Navigation
    $('.Header__nav-mobile-menu').on('click', function () {   
        var status = $('.Header__nav-group--mobile').attr('aria-hidden');
        if (status == 'false') {
          $('.Header__nav-group--mobile').attr('aria-hidden', 'true');
        } else {
          $('.Header__nav-group--mobile').attr('aria-hidden', 'false');
        }
        $('.Header__container').toggleClass("Header__container--headroom");
        $(this).toggleClass("Header__nav-mobile-menu--active");
        $('.Header__nav-group--desktop').toggleClass("Header__nav-group--collapsed");
        $('.Header__nav-group--mobile').toggleClass("Header__nav-group--collapsed");
        $('.Header__nav-actions').toggleClass("Header__nav-actions--hide");
        $('#NavOverlay').toggleClass("Header__overlay-visible").toggleClass("layout__visually-hidden");
    });

    

    //Mobile Navigation Dropdowns
    $('.ProductListMobile__nav-menu-item').click(function () {
      var status = $(this).children(".ProductListMobile__nav-group").attr('data-status');
  
      // close everything first
      $(".ProductListMobile__nav-group").attr('data-status', 'closed');
      $('.ProductListMobile__nav-menu-item').removeClass('ProductListMobile__nav-menu-item--is-active');
      $('.ProductListMobile__mobile-nav-container').find('ul.ProductListMobile__nav-group').addClass('ProductListMobile__nav-group--is-hidden');

      if (status == 'closed') {
          // open it
          $(this).children(".ProductListMobile__nav-group").attr('data-status', 'open');
          $(this).addClass('ProductListMobile__nav-menu-item--is-active');
          $(this).find('ul').removeClass('ProductListMobile__nav-group--is-hidden');
      } else {
          // close it
          $(this).children(".ProductListMobile__nav-group").attr('data-status', 'closed');
          $(this).removeClass('ProductListMobile__nav-menu-item--is-active');
          $(this).find('ul').addClass('ProductListMobile__nav-group--is-hidden');
      }
    });



    // Adds/Dismisses overlay when hovering nav buttons on desktop
    $(".HeaderNavMenu__item--hover").hover(function(){
      $(".ProductList__nav-primary--container").addClass('ProductList__nav-primary--container-hover ProductList__nav-primary--container-dropdown-visible');

      $(this).find( ".HeaderNavMenu__link" ).addClass('HeaderNavMenu__link--active');

      setTimeout(function() { // Add
        $('#NavOverlay').toggleClass("Header__overlay-visible").toggleClass("layout__visually-hidden");
      }, 200);
    }, function () {  // Dismiss
      $(".ProductList__nav-primary--container").removeClass('ProductList__nav-primary--container-hover ProductList__nav-primary--container-dropdown-visible');

      $('#NavOverlay').toggleClass("Header__overlay-visible").toggleClass("layout__visually-hidden");
      $(this).find( ".HeaderNavMenu__link" ).removeClass('HeaderNavMenu__link--active');

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

$(function() {
	var header = $(".Header__container");
	var pos = header.position();						   
	$(window).scroll(function() {
		var windowpos = $(window).scrollTop();
		if (windowpos >= pos.top & windowpos >=100) {
			header.addClass("headroom--not-top Header__container--unpinned");
		} else {
			header.removeClass("headroom--not-top Header__container--unpinned");	
		}
	});
});




function App() { }
    
App.prototype.setState = function(key, state) {
  localStorage.setItem(key, state);
}

App.prototype.getState = function(key) {
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
    checkbox.addEventListener('click', function(e) {
      // We save the checkbox id as the key in localStorage
      // We save the checkbox checked state as the value
      var _checkbox = e.target;
      app.setState(_checkbox.id, _checkbox.checked)
    });
  }
}

init();