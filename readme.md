# 项目启动
1. npm install
2. npm install -g hotnode
3. hotnode ./bin/www
4. 访问http://localhost:3000/

# 说明
1. 游客可访问页面路由统一在routes/index.js定义
2. 登录用户可访问页面路由统一在routes/users.js定义

# 调试模式
- hotnode --debug ./bin/www
- 浏览器打开localhost:3000
- 在另一命令行窗口运行 node-inspector &
- 浏览器打开localhost:8080