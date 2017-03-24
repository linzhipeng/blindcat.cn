# 瞎猫的Node + Vue 的单页应用博客
**进度：70%**

**前端演示地址： [http://blindcat.cn](http://blindcat.cn)**

**后端演示地址：[http://api.blindcat.cn](http://api.blindcat.cn)**

**后端 API 文档：[http://doc.blindcat.cn](http://doc.blindcat.cn)**

**喜欢请 Star 鼓励一下**

## 技术栈
**前端**
* Vue.js
* Vuex
* Vue Router
* Webpack
* Element-ui
* bluebird

**后端**
* Node.js
* Express
* MongoDB
* bluebird

## 前端安装

``` bash
# 进入前端代码目录
cd ./src/client

# 安装依赖
npm install

# 使用webpack打包build
npm run build
```
访问 `src/client/dist/index.html`

## 后端安装

``` bash
# 进入后端代码目录
cd ./src/server

# 安装依赖
npm install

# 建立用户资料目录 users
# 建立文章图片目录 article-image
cd public
mkdir users -m 777
mkdir article-image -m 777
cd ..

# 运行
node app
```
访问 `localhost:8081`

## License
MIT
