window.BookService = {
  all(){ return Storage.get("library_books", BOOKS); },
  get(id){ return this.all().find(b=>b.id===Number(id)); },
  search({query="",category="",sort="popular"}={}) {
    let list=this.all();
    query=query.trim().toLowerCase();
    if(query) list=list.filter(b=>`${b.title} ${b.author}`.toLowerCase().includes(query));
    if(category) list=list.filter(b=>String(b.categoryId)===String(category));
    if(sort==="rating") list.sort((a,b)=>b.rating-a.rating);
    if(sort==="newest") list.sort((a,b)=>b.year-a.year);
    if(sort==="title") list.sort((a,b)=>a.title.localeCompare(b.title));
    return list;
  },
  save(book){ let list=this.all(); const i=list.findIndex(x=>x.id===book.id); i>=0?list[i]=book:list.push(book); Storage.set("library_books",list); },
  remove(id){ Storage.set("library_books",this.all().filter(b=>b.id!==Number(id))); }
};
