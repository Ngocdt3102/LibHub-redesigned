window.Auth = {
  current(){ return Storage.get("current_user", null); },

  login(username, password){
    const user = UserService.all().find(
      u => u.username.toLowerCase() === username.trim().toLowerCase()
        && u.password === password
        && u.status === "active"
    );
    if(!user) return false;

    const session = {...user};
    delete session.password;
    Storage.set("current_user", session);
    return true;
  },

  logout(){
    Storage.remove("current_user");
    location.href = "login.html";
  },

  requireLogin(){
    if(!this.current()){
      location.href = "login.html";
      return false;
    }
    return true;
  },

  requireAdmin(){
    const u = this.current();
    if(!u || u.role !== "Admin"){
      location.href = "index.html";
      return false;
    }
    return true;
  }
};
