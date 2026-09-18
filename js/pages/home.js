window.Page = { init(){
  const card=b=>`<article class="card book-card animate-in"><a href="book-detail.html?id=${b.id}"><div class="book-cover"><img src="${b.cover}" alt="${b.title}" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=cover-placeholder>📚</div>'"></div></a><div class="book-info"><h3>${b.title}</h3><div class="book-meta">${b.author}</div><div class="rating">${Format.stars(b.rating)} <span class="book-meta">${b.rating}</span></div></div></article>`;
  document.getElementById("featured-books").innerHTML=BookService.all().filter(x=>x.featured).map(card).join("");
  document.getElementById("new-books").innerHTML=BookService.all().filter(x=>x.newBook).map(card).join("");
  document.getElementById("popular-books").innerHTML=BookService.all().filter(x=>x.popular).map(card).join("");
  document.getElementById("categories").innerHTML=CATEGORIES.map(c=>`<a class="category-item" href="books.html?category=${c.id}"><div style="font-size:30px">${c.icon}</div><strong>${c.name}</strong></a>`).join("");
}};
