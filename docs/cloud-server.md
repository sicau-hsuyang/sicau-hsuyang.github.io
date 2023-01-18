# 云服务器相关

使用命令行登录

```bash
ssh [user]@[ip]
```

使得服务器可以支持`root`账号登录，[修改root账号登录](https://zhuanlan.zhihu.com/p/590437914)

[Ubuntu安装docker](https://blog.csdn.net/u012563853/article/details/125295985)

```bash
docker ps [-a]
docker rmi [镜像ID]
docker pull [镜像源名称]
docker rm -f [容器实例]
docker build -t [TagName] [dir]
docker run -d -p [端口映射关系] [容器ID]
docker exec -it [容器实例，如gitlab] [内部的bin名称]
```

docker run -d --name yapi --restart=always --privileged=true -p 3000:3000 -e YAPI_ADMIN_ACCOUNT=admin@yangxu.com -e YAPI_ADMIN_PASSWORD=123456 -e YAPI_CLOSE_REGISTER=true -e YAPI_DB_SERVERNAME=1.12.243.15 -e YAPI_DB_PORT=27017 -e YAPI_DB_DATABASE=yapi -e YAPI_DB_USER=admin -e YAPI_DB_PASS=123456 -e YAPI_DB_AUTH_SOURCE=admin -e YAPI_MAIL_ENABLE=false -e YAPI_PLUGINS=[] jayfong/yapi

docker run -itd --name redis -p 6379:6379 redis

docker run -d -p 8443:443 -p 8090:80 -p 8022:22 --restart always --name gitlab -v /usr/local/gitlab/etc:/etc/gitlab -v /usr/local/gitlab/log:/var/log/gitlab -v /usr/local/gitlab/data:/var/opt/gitlab --privileged=true --platform linux/amd64 twang2218/gitlab-ce-zh

docker run --name nginx -p 8080:80 -d nginx