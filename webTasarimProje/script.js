/* Responsive NavBar */
const hamburger_button = document.querySelector('.hamburger-button');
const responsive_nav = document.querySelector('.navbar-header');
const body = document.querySelector('body');

hamburger_button.addEventListener('click', function(){
    hamburger_button.classList.toggle('is-active');
    responsive_nav.classList.toggle('show-responsive-navbar');
    body.classList.toggle('non-scroll-body');
})

  /* Section Color */
const sections = document.querySelectorAll('main > section');

sections.forEach((section, index) => {
    if (index % 2 === 1) {
        section.classList.add('skip-section');
    }
});

    /* Scroll Animation */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting){
        entry.target.classList.add('show');
      }
      else{
        entry.target.classList.remove('show'); //Animasyonların tekrarlanması istenmezse silinebilir.
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));


 /* Page Load Animation */ 
window.addEventListener('load', function() {
  const loader = document.querySelector('.loading-screen');
  const body = document.body;

  body.style.overflow = 'hidden'; // Body kaymasını engelle

  setTimeout(() => {
      loader.classList.add('loader-hidden');
      loader.addEventListener('transitionend', () => {
          body.style.overflow = ''; // Body kaymasına izin ver
          document.body.removeChild(loader);
      });
  }, 000); // 1000 = 1 Saniye
});

/* İnput Placehover'i */
document.querySelectorAll('.contact-input').forEach(input => {
  input.addEventListener('focus', function() {
      if (this.value.trim() !== '') {
          this.classList.add('not-empty');
      }
  });

  input.addEventListener('input', function() {
      if (this.value.trim() !== '') {
          this.classList.add('not-empty');
      } else {
          this.classList.remove('not-empty');
      }
  });
});