window.Page={init(){
  let state={query:"",category:new URLSearchParams(location.search).get("category")||"",sort:"popular",page:1,size:8};
  const category=document.getElementById("category-filter");
  category.innerHTML='<option value="">Tất cả</option>'+CATEGORIES.map(c=>`<option value="${c.id}">${c.name}</option>`).join("");
  category.value=state.category;
  function render(){
    const all=BookService.search(state), start=(state.page-1)*state.size, list=all.slice(start,start+state.size);
    document.getElementById("result-count").textContent=`${all.length} kết quả`;
    document.getElementById("book-grid").innerHTML=list.length?list.map(card).join(""):`<div class="empty card" style="grid-column:1/-1"><div class="empty-icon">🔍</div><div class="empty-title">Không tìm thấy sách phù hợp</div><p class="text-muted">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p><button class="btn btn-light" id="clear-filters" style="margin-top:16px">Xóa bộ lọc</button></div>`;
    const clearBtn=document.getElementById("clear-filters");
    if(clearBtn) clearBtn.onclick=()=>{state.query="";state.category="";state.sort="popular";state.page=1;document.getElementById("book-search").value="";category.value="";document.getElementById("sort-filter").value="popular";render();};
    const pages=Math.ceil(all.length/state.size); document.getElementById("pagination").innerHTML=Array.from({length:pages},(_,i)=>`<button class="${i+1===state.page?"active":""}" data-page="${i+1}">${i+1}</button>`).join("");
    document.querySelectorAll("[data-page]").forEach(x=>x.onclick=()=>{state.page=+x.dataset.page;render()});
  }
  function card(b){const fav=Storage.get("library_favorites",[]).includes(b.id);return `<article class="card book-card animate-in"><div class="book-cover"><img src="${b.cover}" alt="${b.title}" onerror="this.style.display='none'"></div><div class="book-info"><div style="display:flex;justify-content:space-between;gap:6px"><a href="book-detail.html?id=${b.id}"><h3>${b.title}</h3></a><button class="favorite-btn ${fav?"active":""}" data-fav="${b.id}">${fav?"♥":"♡"}</button></div><div class="book-meta">${b.author} · ${Format.category(b.categoryId)}</div><div class="rating">${Format.stars(b.rating)} ${b.rating}</div></div></article>`}
  document.getElementById("search-btn").onclick=()=>{state.query=document.getElementById("book-search").value;state.page=1;render()};
  document.getElementById("book-search").onkeydown=e=>{if(e.key==="Enter")document.getElementById("search-btn").click()};
  category.onchange=e=>{state.category=e.target.value;state.page=1;render()};
  document.getElementById("sort-filter").onchange=e=>{state.sort=e.target.value;state.page=1;render()};
  document.addEventListener("click",e=>{const id=e.target.dataset.fav;if(!id)return;let f=Storage.get("library_favorites",[]);f=f.includes(+id)?f.filter(x=>x!==+id):[...f,+id];Storage.set("library_favorites",f);Toast.show(f.includes(+id)?"Đã thêm vào yêu thích":"Đã bỏ yêu thích");render()});
  render();
}};
