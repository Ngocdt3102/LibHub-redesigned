window.ReviewService = {
  all(){return Storage.get("library_reviews",REVIEWS);},
  byBook(id){return this.all().filter(r=>r.bookId===Number(id));},
  add(review){let list=this.all();review.id=Date.now();list.push(review);Storage.set("library_reviews",list);}
};
