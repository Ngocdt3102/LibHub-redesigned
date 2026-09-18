window.Format = {
  stars(rating){return "★".repeat(Math.round(rating))+"☆".repeat(5-Math.round(rating));},
  date(value){return new Date(value).toLocaleDateString("vi-VN");},
  category(id){return (CATEGORIES.find(c=>c.id===Number(id))||{}).name||"Khác";}
};
