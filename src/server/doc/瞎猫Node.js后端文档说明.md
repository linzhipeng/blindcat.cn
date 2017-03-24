## **瞎猫的 Node.js 博客后端**

GitHub地址： [https://github.com/linzhipeng/blindcat.cn](https://github.com/linzhipeng/blindcat.cn)

前端演示地址： [http://blindcat.cn](http://blindcat.cn)

后端演示地址：[http://api.blindcat.cn](http://api.blindcat.cn)

后端 API 文档：[http://doc.blindcat.cn](http://doc.blindcat.cn)

### **关于作者**
林志鹏（瞎猫）
广东科技学院
前端工程师、Node后端工程师
邮箱：839884316@qq.com 
欢迎加我QQ聊天扯技术！欢迎约我打了篮球！
喜欢这个网站请帮我上GitHub 点个星~~

### **一些备注**
##### **要求登录**
要求登录的接口需要在请求时添加请求头 `headers`
|参数名|必选|类型|说明|默认值|
|:----    |:---|:----- |-----   |------  |
|userid |是  |String |用户id   |无 |
|token |是  |String |用户token令牌   |无 |

##### **URL**
文档中的 `API URL` 、接口返回的 `图片地址` 均为该后端部署地址的相对地址
举例：
后端部署在：`http://api.blindcat.cn` 
文档`api url` 为 `/article` 
某接口返回图片地址为：`static/article-image/58b90c7f97a17c44dc394c9a/article-1490325393418.jpg`

则：该接口请求地址为：`http://api.blindcat.cn/article`  
该图片地址为：`http://api.blindcat.cn/static/article-image/58b90c7f97a17c44dc394c9a/article-1490325393418.jpg` 

##### **关于源码**
- 开源
- 可商用
- 先和我打声招呼~~