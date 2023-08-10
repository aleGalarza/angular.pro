(function ($) {
  "use strict";

  // Preloader (if the #preloader div exists)
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Smooth scroll for the navigation and links with .scrollto classes
  $(".main-nav a, .mobile-nav a, .scrollto").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-scrolled")) {
            top_space = top_space - 20;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".main-nav, .mobile-nav").length) {
          $(".main-nav .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $(".mobile-nav-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".main-nav, .mobile-nav");
  var main_nav_height = $("#header").outerHeight();

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function () {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find("li").removeClass("active");
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
    });
  });

  // jQuery counterUp (used in Whu Us section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Porfolio isotope and filter
  $(window).on("load", function () {
    var portfolioIsotope = $(".portfolio-container").isotope({
      itemSelector: ".portfolio-item",
    });
    $("#portfolio-flters li").on("click", function () {
      $("#portfolio-flters li").removeClass("filter-active");
      $(this).addClass("filter-active");

      portfolioIsotope.isotope({ filter: $(this).data("filter") });
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });
})(jQuery);

// Obtener referencias a los elementos del DOM
const titleInput = document.getElementById("title-input");
const contentInput = document.getElementById("content-input");
const imageUploadInput = document.getElementById("image-upload");
const submitButton = document.getElementById("submit-button");
const newsSection = document.getElementById("news-section");

// Array para almacenar las noticias
const news = [];

// Función para crear una noticia
function createNews() {
  const title = titleInput.value;
  const content = contentInput.value;
  const file = imageUploadInput.files[0];

  // Validar que se haya ingresado un título y contenido
  if (title.trim() === "" || content.trim() === "") {
    alert("Por favor, ingrese un título y contenido");
    return;
  }

  // Validar que se haya seleccionado un archivo de imagen
  if (!file) {
    alert("Por favor, seleccione una imagen");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    const imageUrl = event.target.result;

    const newsItem = {
      title: title,
      content: content,
      imageUrl: imageUrl,
    };

    news.push(newsItem);
    renderNews();
  };

  reader.readAsDataURL(file);

  // Limpiar los campos de entrada después de crear una noticia
  titleInput.value = "";
  contentInput.value = "";
  imageUploadInput.value = "";
}

// Función para renderizar las noticias en la sección
function renderNews() {
  const newsSection = document.getElementById("news-section");
  newsSection.innerHTML = "";

  news.forEach((item) => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    const newsImage = document.createElement("img");
    newsImage.classList.add("news-image");
    newsImage.src = item.imageUrl;
    newsImage.width = 100;
    newsImage.height = 50;

    const newsContent = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = item.title;

    const content = document.createElement("p");
    content.textContent = item.content;

    newsContent.appendChild(title);
    newsContent.appendChild(content);

    newsCard.appendChild(newsImage);
    newsCard.appendChild(newsContent);

    newsSection.appendChild(newsCard);
  });
}

// Asociar el evento de clic al botón de envío
submitButton.addEventListener("click", createNews);
