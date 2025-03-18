# BlogMS
It's a bolg management system
💡 从零开始基于 Docker 构建 Django + MySQL + 前端 项目（GitHub 版本控制 & 最终部署）

📌 项目架构
	•	后端：Django（使用 Docker 容器）
	•	数据库：MySQL（使用 Docker 容器）
	•	前端：HTML + CSS + JavaScript 或 Vue.js（使用 Docker 容器）
	•	版本控制：GitHub
	•	最终部署：部署到服务器（如 AWS、阿里云、Vercel 等）

⸻

🔹1. 初始化 GitHub 仓库
	1.	在 GitHub 创建一个新仓库（如 blog-project）。
	2.	在本地初始化 Git 并连接远程仓库：

git init
git remote add origin https://github.com/zephyr/blog-project.git
git pull origin main --allow-unrelated-histories



⸻

🔹2. 创建项目结构

blog-project/
│── backend/       # Django 后端
│── frontend/      # 前端代码
│── docker-compose.yml  # Docker 编排文件
│── .gitignore     # Git 忽略文件
│── README.md      # 项目说明文档



⸻

🔹3. 使用 Docker 运行 Django

1️⃣ 创建 Dockerfile（后端）

在 backend/ 目录下创建 Dockerfile：

# 使用 Python 3.12 作为基础镜像
FROM python:3.12

# 设置工作目录
WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖
RUN pip install -r requirements.txt

# 运行 Django 服务器
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# 开放端口
EXPOSE 8000



⸻

2️⃣ 创建 docker-compose.yml

在 blog-project/ 目录下创建：

version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    depends_on:
      - db

  db:
    image: mysql:8
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: blog_db
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:



⸻

🔹4. 运行 Docker 容器

在 blog-project/ 目录下运行：

docker-compose up --build -d

	•	-d 表示以 后台模式 运行。
	•	现在 Django 运行在 localhost:8000，MySQL 运行在 localhost:3306。

⸻

🔹5. 连接 Django 与 MySQL

修改 backend/settings.py：

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'blog_db',
        'USER': 'user',
        'PASSWORD': 'password',
        'HOST': 'db',  # Docker 容器名
        'PORT': '3306',
    }
}

然后在 Docker 里执行：

docker-compose exec backend python manage.py migrate



⸻

🔹6. 创建 Django 超级用户

docker-compose exec backend python manage.py createsuperuser



⸻

🔹7. 构建前端（Vue.js 或 HTML + CSS + JavaScript）

1️⃣ Vue.js

在 blog-project/ 目录下运行：

npx create-vite frontend --template vue

然后修改 docker-compose.yml：

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app

2️⃣ 运行前端

docker-compose up --build -d

前端运行在 localhost:5173。

⸻

🔹8. GitHub 版本管理

1️⃣ 添加 .gitignore

__pycache__/
*.pyc
*.pyo
venv/
db.sqlite3
.env
node_modules/

2️⃣ 提交代码

git add .
git commit -m "Initialize Django + MySQL + Vue.js with Docker"
git push origin main



⸻

🔹9. 部署到服务器
	1.	购买服务器（如 AWS、阿里云）。
	2.	安装 Docker：

sudo apt update && sudo apt install docker docker-compose -y


	3.	拉取代码：

git clone https://github.com/zephyr/blog-project.git


	4.	运行 Docker：

cd blog-project
docker-compose up --build -d


	5.	访问 http://<服务器IP>:8000。

⸻

✅ 总结

📌 开发流程
	1.	创建 GitHub 仓库
	2.	使用 Docker 运行 Django
	3.	连接 MySQL
	4.	开发前端
	5.	版本控制（GitHub）
	6.	部署到服务器
