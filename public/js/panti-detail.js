var swiper = new Swiper(".mySwiper", {
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

function openFormDana() {
  $("#form-dana").fadeIn("fast");
}

function closeFormDana() {
  $("#form-dana").fadeOut("fast");
}

function openFormNonDana() {
  $("#form-non-dana").fadeIn("fast");
}

function closeFormNonDana() {
  $("#form-non-dana").fadeOut("fast");
}

function openFormPesan() {
  $("#form-pesan").fadeIn("fast");
}

function closeFormPesan() {
  $("#form-pesan").fadeOut("fast");
}

function loadMorePesan() {}
