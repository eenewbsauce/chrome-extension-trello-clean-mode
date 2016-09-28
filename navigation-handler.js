var label = document.querySelectorAll('#nav-usernameMenu .nav-elt-label')[0];

if (label.getAttribute('title').indexOf('rocketloansprod') > 0) {
  document.querySelectorAll('body')[0].setAttribute('class', 'prod');
}
