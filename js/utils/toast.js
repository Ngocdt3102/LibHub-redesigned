window.Toast = {
  show(message,type="success"){
    const wrap=document.querySelector(".toast-wrap")||(()=>{const x=document.createElement("div");x.className="toast-wrap";document.body.appendChild(x);return x;})();
    const item=document.createElement("div"); item.className=`toast ${type}`; item.textContent=message; wrap.appendChild(item);
    setTimeout(()=>item.remove(),2800);
  }
};
