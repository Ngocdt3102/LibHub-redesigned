# LibHub - User Management Frontend V2

**LibHub** là hệ thống thư viện số frontend được xây dựng hoàn toàn bằng **HTML, CSS và Vanilla JavaScript**.

Dự án mô phỏng một nền tảng thư viện trực tuyến, cho phép người dùng tìm kiếm, khám phá, đọc, đánh giá và lưu sách yêu thích. Hệ thống đồng thời cung cấp khu vực quản trị dành cho Admin để quản lý sách và người dùng.

> ⚠️ Đây là frontend prototype sử dụng dữ liệu giả lập và `localStorage`. Dự án chưa sử dụng backend, database hoặc API thực tế.

---

## 🛠 Công nghệ

* HTML5
* CSS3
* Vanilla JavaScript
* LocalStorage
* Component Loader
* Nginx
* Docker
* GitHub Actions / CI-CD

---

# 🚀 Chạy dự án

## Cách 1: VS Code Live Server

Mở project bằng **Visual Studio Code**.

Cài extension:

```text
Live Server
```

Sau đó click chuột phải vào:

```text
login.html
```

hoặc:

```text
index.html
```

và chọn:

```text
Open with Live Server
```

---

## Cách 2: Python HTTP Server

Mở Terminal / PowerShell tại thư mục project:

```bash
python -m http.server 5500
```

Sau đó truy cập:

```text
http://localhost:5500
```

> ⚠️ Không nên mở trực tiếp bằng `file://` vì hệ thống sử dụng `fetch()` trong `component-loader.js` để tải các component HTML.

---

## Cách 3: Docker

### Build Docker image

```bash
docker build -t library-frontend .
```

### Chạy container

```bash
docker run --name library-frontend -p 8080:80 library-frontend
```

Sau đó truy cập:

```text
http://localhost:8080
```

### Dừng container

```bash
docker stop library-frontend
```

### Xóa container

```bash
docker rm library-frontend
```

---

# 🔐 Tài khoản Demo

Dự án hiện có các tài khoản demo cố định để kiểm thử authentication.

| Vai trò  | Username | Password    | Status  |
| -------- | -------- | ----------- | ------- |
| 👑 Admin | `admin`  | `Admin@123` | Active  |
| 👤 User  | `ngoc`   | `User@123`  | Active  |
| 👤 User  | `linh`   | `User@123`  | Active  |
| 🚫 User  | `minh`   | `User@123`  | Blocked |

## Admin

```text
Username: admin
Password: Admin@123
```

Sau khi đăng nhập thành công, Admin được chuyển tới:

```text
admin.html
```

---

## User

```text
Username: ngoc
Password: User@123
```

hoặc:

```text
Username: linh
Password: User@123
```

Sau khi đăng nhập thành công, User được chuyển tới:

```text
index.html
```

---

## Blocked User

```text
Username: minh
Password: User@123
```

Tài khoản này được sử dụng để kiểm tra chức năng khóa tài khoản.

Mặc dù username và password chính xác, hệ thống vẫn từ chối đăng nhập vì:

```text
status = blocked
```

---

# 🔒 Authentication Flow

Hệ thống mô phỏng authentication bằng JavaScript và LocalStorage.

Luồng đăng nhập:

```text
Login Page
    ↓
Username + Password
    ↓
Auth.login()
    ↓
Kiểm tra User
    ↓
Kiểm tra Password
    ↓
Kiểm tra Status
    ↓
Tạo Session
    ↓
Kiểm tra Role
    ↓
Admin → admin.html
User  → index.html
```

Hệ thống kiểm tra:

* Username tồn tại
* Password chính xác
* Tài khoản đang `active`
* Role của tài khoản

Tài khoản `blocked` sẽ không được phép đăng nhập.

---

# 💾 Dữ liệu

Dữ liệu mẫu ban đầu được lưu trong:

```text
js/data/
```

Bao gồm:

```text
js/data/books.js
js/data/users.js
js/data/reviews.js
js/data/categories.js
```

Khi ứng dụng khởi chạy, dữ liệu được seed vào `localStorage`.

Các dữ liệu chính:

```text
library_books
library_users
library_reviews
library_favorites
current_user
```

---

# 🔄 Reset dữ liệu Demo

Nếu muốn đưa hệ thống về trạng thái ban đầu:

### Cách 1: DevTools

Mở:

```text
F12
```

→

```text
Application
```

→

```text
Local Storage
```

→ chọn domain của project.

Xóa các key:

```text
library_books
library_users
library_reviews
library_favorites
current_user
```

Sau đó reload trang.

---

### Cách 2: Console

Có thể chạy:

```javascript
localStorage.removeItem("library_books");
localStorage.removeItem("library_users");
localStorage.removeItem("library_reviews");
localStorage.removeItem("library_favorites");
localStorage.removeItem("current_user");

location.reload();
```

---

# 📚 Chức năng User

## 🏠 Trang chủ

* Hero section
* Sách nổi bật
* Sách mới
* Sách phổ biến
* Danh mục sách
* Điều hướng tới thư viện

---

## 🔎 Tìm kiếm sách

Người dùng có thể tìm kiếm sách theo:

* Tên sách
* Tác giả
* Thể loại
* Nội dung liên quan

Kết quả tìm kiếm được cập nhật trên giao diện mà không cần backend.

---

## 🎛 Lọc và sắp xếp

Hỗ trợ:

* Lọc theo thể loại
* Lọc theo rating
* Sắp xếp sách
* Kết hợp tìm kiếm và bộ lọc

Các tùy chọn sắp xếp có thể bao gồm:

```text
Newest
Oldest
Rating
Popular
A-Z
```

---

## 📖 Chi tiết sách

Người dùng có thể xem:

* Bìa sách
* Tên sách
* Tác giả
* Thể loại
* Rating
* Số lượng review
* Mô tả
* Review của người dùng khác

---

## 📕 Đọc sách

Người dùng có thể mở:

```text
reader.html
```

để đọc nội dung sách.

Reader được thiết kế tập trung vào nội dung và hạn chế các thành phần gây mất tập trung.

---

## ❤️ Yêu thích

Người dùng có thể:

* Thêm sách vào yêu thích
* Xóa sách khỏi yêu thích
* Xem danh sách sách yêu thích

Dữ liệu yêu thích được lưu trong:

```text
library_favorites
```

---

## ⭐ Rating & Review

Người dùng có thể:

* Đánh giá sách
* Chọn số sao
* Viết review
* Xem review của người dùng khác

Review được lưu trong LocalStorage.

---

## 👤 Profile

Người dùng có thể xem thông tin cá nhân như:

* Avatar
* Họ tên
* Username
* Email
* Số điện thoại
* Thông tin tài khoản

---

# 👑 Chức năng Admin

Admin có khu vực quản trị riêng.

```text
admin.html
```

---

## 📊 Dashboard

Dashboard cung cấp thống kê tổng quan:

* Tổng số người dùng
* Tổng số sách
* Tổng số review
* Tổng số lượt đọc
* Hoạt động hệ thống

---

## 📚 Quản lý sách

Trang:

```text
admin-books.html
```

Admin có thể:

* Xem danh sách sách
* Tìm kiếm sách
* Lọc sách
* Thêm sách
* Chỉnh sửa sách
* Xóa sách
* Khôi phục sách nếu sử dụng soft-delete

---

## 👥 Quản lý User

Trang:

```text
admin-users.html
```

Admin có thể:

* Xem danh sách user
* Tìm kiếm user
* Chỉnh sửa thông tin user
* Khóa user
* Mở khóa user
* Reset mật khẩu giả lập
* Xóa user

---

## 🔄 Reset Password

Admin có thể reset password cho User thông qua:

```text
Reset Password
```

Quy trình:

```text
Select User
    ↓
Reset Password
    ↓
Confirmation Modal
    ↓
Nhập Password mới
    ↓
Xác nhận
    ↓
Cập nhật LocalStorage
```

Admin **không reset password của chính Admin thông qua chức năng quản lý User**.

---

## ⚙️ Admin Information

Trang:

```text
admin-info.html
```

Admin có thể:

* Xem thông tin cá nhân
* Cập nhật thông tin
* Thay đổi password của chính Admin

---

# 🧩 Component System

Project sử dụng hệ thống component HTML để tái sử dụng giao diện.

Các component chính:

```text
components/
├── common/
├── home/
├── books/
├── book-detail/
├── admin/
└── modal/
```

Một số component tiêu biểu:

```text
header.html
navbar.html
footer.html
book-card.html
book-grid.html
search-bar.html
filter-panel.html
rating.html
review-list.html
sidebar.html
stat-card.html
modal
toast
loading
```

Các component được tải thông qua:

```text
js/component-loader.js
```

---

# 📁 Cấu trúc Project

```text
user-management-frontend-v2/
│
├── index.html
├── login.html
├── books.html
├── book-detail.html
├── favorites.html
├── reader.html
├── profile.html
│
├── admin.html
├── admin-books.html
├── admin-users.html
├── admin-info.html
│
├── components/
│   ├── common/
│   ├── home/
│   ├── books/
│   ├── book-detail/
│   ├── admin/
│   └── modal/
│
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── global.css
│   ├── components.css
│   ├── library.css
│   ├── admin.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── component-loader.js
│   │
│   ├── data/
│   │   ├── books.js
│   │   ├── users.js
│   │   ├── reviews.js
│   │   └── categories.js
│   │
│   ├── services/
│   │   ├── storage.js
│   │   ├── book-service.js
│   │   ├── user-service.js
│   │   └── review-service.js
│   │
│   ├── pages/
│   │   ├── home.js
│   │   ├── books.js
│   │   ├── book-detail.js
│   │   ├── favorites.js
│   │   ├── reader.js
│   │   ├── profile.js
│   │   ├── admin.js
│   │   ├── admin-books.js
│   │   ├── admin-users.js
│   │   └── admin-info.js
│   │
│   └── utils/
│       ├── auth.js
│       ├── format.js
│       ├── animation.js
│       └── toast.js
│
├── assets/
│   ├── logo/
│   ├── books/
│   ├── avatars/
│   └── icons/
│
├── Dockerfile
├── nginx.conf
└── .github/
    └── workflows/
        └── ci-cd.yml
```

---

# 🎨 UI/UX

LibHub hướng tới phong cách:

```text
Modern
Clean
Professional
Premium
Responsive
User-friendly
```

Design system sử dụng:

* Indigo
* Violet
* Cyan
* White
* Slate

Màu trạng thái:

```text
Success → Green
Warning → Amber
Danger  → Red
Info    → Blue
```

Giao diện hỗ trợ:

* Desktop
* Tablet
* Mobile

Các thành phần UI có animation và transition nhẹ để tăng trải nghiệm người dùng.

---

# 🐳 Docker

Docker sử dụng:

```text
Nginx
```

để phục vụ static frontend.

Build:

```bash
docker build -t library-frontend .
```

Run:

```bash
docker run --name library-frontend -p 8080:80 library-frontend
```

Truy cập:

```text
http://localhost:8080
```

---

# 🔄 CI/CD

Project có GitHub Actions workflow:

```text
.github/workflows/ci-cd.yml
```

Workflow được thiết kế theo flow:

```text
GitHub
   ↓
GitHub Actions
   ↓
Validate Project
   ↓
Docker Build
   ↓
Docker Hub
```

Workflow có thể sử dụng GitHub Secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

Docker image được push với các tag:

```text
latest
<commit-sha>
```

---

# ⚠️ Lưu ý về bảo mật

Đây là **frontend prototype**.

Project hiện tại:

* Không có Backend
* Không có Database
* Không có JWT
* Không có API authentication
* Không có server-side authorization
* Password được lưu trong JavaScript/LocalStorage
* Dữ liệu có thể bị người dùng chỉnh sửa bằng DevTools

Các tài khoản demo và password được hard-code để phục vụ mục đích **development/testing**.

> ❗ Không sử dụng cơ chế authentication hiện tại cho môi trường production.

Khi tích hợp backend thật, cần chuyển authentication và authorization sang server-side.

---

# 🧪 Kiểm thử nhanh

## User

```text
Username: ngoc
Password: User@123
```

Expected:

```text
Login → index.html
```

## Admin

```text
Username: admin
Password: Admin@123
```

Expected:

```text
Login → admin.html
```

## Blocked User

```text
Username: minh
Password: User@123
```

Expected:

```text
Login Failed
Account Blocked
```

---

# 📌 Roadmap

Các bước phát triển tiếp theo có thể bao gồm:

```text
Frontend Prototype
       ↓
Backend API
       ↓
Database
       ↓
Real Authentication
       ↓
JWT / Refresh Token
       ↓
Cloud Storage
       ↓
Production Deployment
```

Các tính năng có thể mở rộng:

* API backend
* Database
* JWT Authentication
* Role-based access control
* Book upload
* PDF/EPUB reader
* Reading progress
* Advanced recommendation
* Email notification
* Real-time statistics
* Audit log
* Production security

---

# 📄 License

Project được xây dựng cho mục đích:

* Học tập
* Thực hành Frontend
* UI/UX
* JavaScript
* Docker
* CI/CD
* Prototype hệ thống thư viện số
