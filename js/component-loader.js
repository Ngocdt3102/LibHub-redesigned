window.ComponentLoader = {
  async loadAll(){
    const nodes=document.querySelectorAll("[data-component]");
    await Promise.all([...nodes].map(async node=>{
      const path=node.dataset.component;
      try {
        const res=await fetch(`components/${path}.html`);
        if(!res.ok) throw new Error(res.status);
        node.outerHTML=await res.text();
      } catch(e) {
        node.innerHTML=`<div class="card" style="padding:15px;color:#b91c1c">Không tải được component: ${path}</div>`;
      }
    }));
    this.bindCommon();
  },
  bindCommon(){
    const u=Auth.current();
    document.querySelectorAll("[data-auth-name]").forEach(x=>x.textContent=u?.fullName||"Khách");
    document.querySelectorAll("[data-auth-avatar]").forEach(x=>x.src=u?.avatar||"https://i.pravatar.cc/100?img=5");
    document.querySelectorAll("[data-logout]").forEach(x=>x.onclick=(e)=>{e.preventDefault();Auth.logout();});
    document.querySelectorAll("[data-admin-only]").forEach(x=>x.classList.toggle("hidden",u?.role!=="Admin"));
    this.bindMobileMenu();
    this.bindModalDismiss();
    Animation.init();
  },
  bindMobileMenu(){
    const drawer=document.querySelector("[data-mobile-menu-drawer]");
    if(!drawer) return;
    const open=()=>drawer.classList.add("open");
    const close=()=>drawer.classList.remove("open");
    document.querySelectorAll("[data-mobile-menu-open]").forEach(x=>x.onclick=open);
    document.querySelectorAll("[data-mobile-menu-close]").forEach(x=>x.onclick=close);
    drawer.addEventListener("click",e=>{ if(e.target===drawer) close(); });
  },
  bindModalDismiss(){
    document.addEventListener("keydown",e=>{
      if(e.key!=="Escape") return;
      document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach(m=>m.classList.add("hidden"));
    });
    document.addEventListener("click",e=>{
      if(e.target.classList && e.target.classList.contains("modal-backdrop")) e.target.classList.add("hidden");
    });
  }
};
