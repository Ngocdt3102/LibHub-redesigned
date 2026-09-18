document.addEventListener("DOMContentLoaded", async ()=>{
  Storage.seed();
  await ComponentLoader.loadAll();
  if(window.Page && typeof Page.init==="function") Page.init();
});
