# docker 学习

## 镜像相关

列出镜像

```bash
docker images
```

获取镜像

```bash
docker pull [选项] [Docker Registry 地址[:端口号]/] 镜像名[:标签]
```

删除镜像

```bash
docker image rm [镜像ID]
# 或者
docker rmi [镜像ID或者镜像名称]
```

## 容器相关

查看容器状态

```bash
# 查看运行中的容器
docker ps
# 查看所有的容器
docker ps -a
docker container ls
docker container ls -a
```

启动容器

```bash
docker run 参数 镜像名称:tag 执行的命令
```

-i 保持和docker容器内的交互，启动容器时，运行的命令结束后，容器依然存活，没有退出（默认是会退出，即停止的）
-t 为容器的标准输入虚拟一个tty
-d 后台运行容器
--rm 容器启动后，执行完成命令或程序后就销毁
--name 给容器起一个自定义的名称
-p 宿主机:内部端口

删除容器

```bash
docker rm [容器ID]
```

停止容器

```bash
docker stop [容器ID]
```

重启容器
```bash
docker start [容器ID]
```

进入容器

```bash
docker exec -it 容器ID(容器名称) 命令
```

退出容器

```bash
exit
```

查看日志

```bash
docker logs [容器ID或容器名称]
```

## 数据卷相关

创建数据卷

```bash
docker volume create 数据卷名称
```

查看数据卷

```bash
docker volume inspect 数据卷名称
```

查看全部数据卷信息

```bash
docker volume ls
```

删除数据卷

```bash
docker volume rm  数据卷名称
```

应用数据卷

```bash
docker run -v 数据卷名称:容器内路径 镜像ID 
docker run -v 路径:容器内路径 镜像ID
```


