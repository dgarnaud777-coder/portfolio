// Navbar scroll
(function(){var n=document.getElementById('navbar');if(!n)return;function s(){n.classList.toggle('scrolled',window.scrollY>36);}window.addEventListener('scroll',s,{passive:true});s();})();

// Burger menu
(function(){var b=document.getElementById('burger'),m=document.getElementById('mobileMenu');if(!b||!m)return;var o=false;function t(){o=!o;m.classList.toggle('open',o);var s=b.querySelectorAll('span');if(o){s[0].style.transform='translateY(7px) rotate(45deg)';s[1].style.opacity='0';s[2].style.transform='translateY(-7px) rotate(-45deg)';}else{s[0].style.transform=s[1].style.opacity=s[2].style.transform='';}}b.addEventListener('click',t);m.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){if(o)t();});});})();

// Smooth scroll
(function(){document.querySelectorAll('a[href^="#"]').forEach(function(l){l.addEventListener('click',function(e){var t=document.querySelector(l.getAttribute('href'));if(!t)return;e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-72,behavior:'smooth'});});});})();

// Reveal on scroll
(function(){
  document.body.classList.add('js-ready');
  var els=document.querySelectorAll('.reveal');
  if(!els.length)return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting)return;
      var sib=[].slice.call(entry.target.parentElement.querySelectorAll('.reveal'));
      var idx=sib.indexOf(entry.target);
      setTimeout(function(){entry.target.classList.add('visible');},Math.min(idx*90,360));
      io.unobserve(entry.target);
    });
  },{threshold:0.12});
  els.forEach(function(el){io.observe(el);});
})();

// Footer year
(function(){var y=document.getElementById('footerYear');if(y)y.textContent=new Date().getFullYear();})();
