# serverSetting
   
# 装系统
* 这里选择腾讯云服务器
  

#### 购买安装即可

* 购买后有公网主IP地址:`182.254.195.126`
* 安装可选多种系统
* 本内容安装的是 `Ubuntu`.
* 安装的时候可选 **登录设置**: `密码`/`SSH密钥`,选择不同的方式区别在于后期登录方式不同,**后期不可更改**(密码比较简单,哪种较优不知).
* 下面设置区分  `密码`/`SSH密钥` 两种方式



# 设置


#### 密码登录方式

* 用户名不可选,直接输入密码即可(后续登录服务器就是着这个密码)
* 在网页上登录服务器直接点击`登录`/`标准登录方式`/`端口22`
* 在Xshell上登录服务器: `新建会话`/先输入主机地址(公网ip地址),再点击`用户身份验证`,方法选`Password`,用户名可以在网页登录那里找.

#### SSH登录方式

* 先在网页创建SSH密钥,后下载保存在 `.ssh` 文件夹,再在原网页绑定密钥到服务器实例(如不行到`实例`/`更多操作/加载密钥`那里绑定).
* 绑定完成后即可在网页使用 `密钥` 登录,浏览选择生成下载的那个.
* 在Xshell上登录服务器: `方法` 选 `Public Key`,用户名同上,用户密匙导入下载的那个,密码空,连接即可完成.

#### 同步GitHub文件

* 安装git: `sudo apt-get install git`
##### https方法 
  
  ![](images/https_clone.png)

* 得到一个地址串,然后在服务器运行, `git clone https://github.com/xxxxx.git` 即可(注意:将同步到当前目录文件夹).
* 进入clone的文件夹, 输入 `git add .`, 以后同步直接输入 `git pull` 就可以啦.

* `git commit` 提交
* `git push -u origin master` 设置分支

##### SSH方法 

  ![](images/ssh_clone.png)

* `ssh-keygen -t rsa -C "your_email@example.com"` 生成SSH密匙(在.ssh目录)
* `cat id_rsa.pub` 将内容复制到GitHub(setting中) 
* 测试 `git clone git@github.com:xxxxxx.git`
* `git add` 完成




### Ubuntu自动重启软件`supervisor `

* 首先安装supervisor : `apt install supervisor`
* 配置supervisor : 进入目录`/etc/`或者`/etc/supervisor`下寻找 `supervisord.conf` 文件
* 在`supervisord.conf`文件末尾添加:
  
   ```
   [program:app_name]     ; 程序名字
   directroy=/usr/bin/nodejs  ; 程序所在的主目录
   command=node /var/www/Read_and_write_server/server.js  ; 执行程序的命令  
   autostart=true   ; 是否自动启动程序
   startsecs=5      ; 程序启动5秒种没有中断默认启动成功
   autorestart=true ; 是否重启
   startretries=3   ;重启失败尝试次数
   user=root        ; 执行程序的用户
   ```
    
* `sudo  supervisord -c /etc/supervisor/supervisord.conf`读取配置(注意先停止supervisor程序)
  
  
* `ps -A | grep supervisord` kill pid 或者 `sudo supervisorctl shutdown` 终止
* `service supervisor restart` 重启

### 通过web管理
  supervisord可以通过web管理进程以及查看进程状态，需要在配置文件里开启

  找到`[inet_http_server]`这一段，修改成
  ```
  [inet_http_server]         ; inet (TCP) server disabled by default
  port=*:9001        ; (ip_address:port specifier, *:port for all iface)
  username=admin             ; (default is no username (open server))
  password=123               ; (default is no password (open server))
  ```
  其中port这个字段要各位注意，如果*:9001表示允许所有ip访问，如果指定单个IP可以 xx.xx.xx.xx:9001 这样既可。如果你开启了iptabls记得要在规则里允许port指定的端口号。


### Linux下载包安装node

1. 下载包: `wget https://npm.taobao.org/mirrors/node/v12.13.1/node-v12.13.1-linux-x64.tar.xz`
2. 将tar.xz 解压成 .tar: `xz -d node-v12.13.1-linux-x64.tar.xz`
3. 解压tar包: `tar -xvf node-v12.13.1-linux-x64.tar`
4. `vim /etc/profile`
5. 添加:  `export  PATH=/node/node-v12.13.1-linux-x64/bin:$PATH`
6. 重启
   * 这种安装使用 supervisor 可能会识别不出
   * 使用`command=/node/node-v12.13.1-linux-x64/bin/node server.js`,不要使用node +  文件的形式



### 需要的软件

* Github桌面版下载: [官网](https://desktop.github.com/) 或者 [腾讯云](https://share.weiyun.com/5opM4Qs) 或者 [百度网盘](https://pan.baidu.com/s/15iZCRjez6lY1fCsvVdlDLA)
* Xshell桌面版下载: [腾讯云](https://share.weiyun.com/5moQtKQ) 或者 [百度网盘](https://pan.baidu.com/s/1zXBxDvrVCqmI49y_otGyvg)

