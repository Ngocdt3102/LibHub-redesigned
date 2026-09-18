window.Storage = {
  get(key, fallback=null) {
    try { const value=localStorage.getItem(key); return value===null ? fallback : JSON.parse(value); }
    catch { return fallback; }
  },
  set(key,value) { localStorage.setItem(key,JSON.stringify(value)); },
  remove(key) { localStorage.removeItem(key); },
  seed() {
    // Luôn đảm bảo các tài khoản demo có đúng thông tin đăng nhập.
    // Điều này cũng sửa dữ liệu cũ trong localStorage sau khi cập nhật code.
    const existingUsers = this.get("library_users", []);
    const demoUsers = window.USERS || [];
    const mergedUsers = [...existingUsers];

    demoUsers.forEach(demo => {
      const index = mergedUsers.findIndex(u => Number(u.id) === Number(demo.id) || u.username === demo.username);
      if (index === -1) {
        mergedUsers.push({...demo});
      } else {
        // Chỉ đồng bộ các tài khoản demo để login luôn nhất quán.
        mergedUsers[index] = {...mergedUsers[index], ...demo};
      }
    });

    this.set("library_users", mergedUsers);
    if (!localStorage.getItem("library_books")) this.set("library_books", window.BOOKS);
    if (!localStorage.getItem("library_reviews")) this.set("library_reviews", window.REVIEWS);
    if (!localStorage.getItem("library_favorites")) this.set("library_favorites", []);
  }
};
