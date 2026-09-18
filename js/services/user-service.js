window.UserService = {
  all(){return Storage.get("library_users",USERS);},
  get(id){return this.all().find(u=>u.id===Number(id));},
  save(user){let list=this.all();let i=list.findIndex(x=>x.id===user.id);i>=0?list[i]=user:list.push(user);Storage.set("library_users",list);},
  remove(id){Storage.set("library_users",this.all().filter(u=>u.id!==Number(id)));},
  resetPassword(id){ return !!this.get(id); }
};
