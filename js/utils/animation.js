window.Animation = {
  init(){ document.querySelectorAll(".animate-in").forEach((el,i)=>el.style.animationDelay=`${Math.min(i*35,350)}ms`); }
};
