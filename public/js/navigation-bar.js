let isNavbarOpen = false;
function openNavbar() {
  $("#nav-icon-top").addClass("rotate-45 translate-y-[6px]");
  $("#nav-icon-bottom").addClass("-rotate-45 -translate-y-[8px]");
  $("#nav-icon-mid").addClass("opacity-0");
  caches;

  $("#mobile-nav-links-container").fadeIn("fast");
  $("#mobile-nav-links").animate({
    width: 200,
  });

  isNavbarOpen = true;
}

function closeNavbar() {
  $("#nav-icon-top").removeClass("rotate-45 translate-y-[6px]");
  $("#nav-icon-bottom").removeClass("-rotate-45 -translate-y-[8px]");
  $("#nav-icon-mid").removeClass("opacity-0");

  $("#mobile-nav-links-container").fadeOut("fast");
  $("#mobile-nav-links").animate({
    width: 0,
  });

  isNavbarOpen = false;
}

function toggleNavbar() {
  if (!isNavbarOpen) {
    openNavbar();
  } else {
    closeNavbar();
  }
}

$("#mobile-nav-links-background").on("click", function () {
  $("#nav-icon-top").removeClass("rotate-45 translate-y-[6px]");
  $("#nav-icon-bottom").removeClass("-rotate-45 -translate-y-[8px]");
  $("#nav-icon-mid").removeClass("opacity-0");

  $("#mobile-nav-links-container").fadeOut("fast");
  $("#mobile-nav-links").animate({ width: 0 }, "fast");

  isNavbarOpen = false;
});

let isProfileWebOpen = false;
function openProfileWeb() {
  if (!isProfileWebOpen) {
    $("#profile-web-arrow").addClass("rotate-180");
    $("#profile-web-links").slideDown(200);
    isProfileWebOpen = true;
  } else {
    $("#profile-web-arrow").removeClass("rotate-180");
    $("#profile-web-links").slideUp(200);
    isProfileWebOpen = false;
  }
}

let isProfileMobileOpen = false;
function openProfileMobile() {
  if (!isProfileMobileOpen) {
    $("#profile-mobile-arrow").addClass("rotate-180");
    $("#profile-mobile-links").slideDown(200);
    isProfileMobileOpen = true;
  } else {
    $("#profile-mobile-arrow").removeClass("rotate-180");
    $("#profile-mobile-links").slideUp(200);
    isProfileMobileOpen = false;
  }
}

window.addEventListener(
  "resize",
  function (event) {
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

    if (windowWidth >= 1280) {
      if (isNavbarOpen) {
        closeNavbar();
      }

      $("#profile-mobile-arrow").removeClass("rotate-180");
      $("#profile-mobile-links").slideUp(200);
      isProfileMobileOpen = false;
    } else {
      $("#profile-web-arrow").removeClass("rotate-180");
      $("#profile-web-links").slideUp(200);
      isProfileWebOpen = false;
    }
  },
  true,
);
