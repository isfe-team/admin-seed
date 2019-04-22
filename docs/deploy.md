# Deploy

本项目经过前端构建之后，得到产物（`dist/**`），可以部署在任何 web 容器/静态资源服务器中。下面以 Nginx 为例。

## Nginx

> 需要自行安装 Nginx，下面是如何配置 Nginx。

```
user  root;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    server_tokens off; # 去除 server 字段中的 nginx version
    add_header X-Frame-Options SAMEORIGIN; # 防止安全问题 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options

    # 配置后台服务地址（注意低版本的 nginx 不支持有下划线）
    upstream BACKEND_SERVER {
      server 172.31.236.104:6060;
    }

    #gzip  on;

    server {
        listen       8081;
        server_name  172.31.236.104;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        # location / {
            # root   html;
            # index  index.html index.htm;
        # }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        # error_page   500 502 503 504  /50x.html;
        # location = /50x.html {
            # root   html;
        # }

        # 如果只有一个应用，可以直接采用 = / 配置，不用前缀（Context）
        location = / {
            try_files $uri /index.html;
        }

        # 一些静态资源
        location ~* \.(gif|jpg|jpeg|png|css|map|js|ico|json|eot|svg|ttf|woff|woff2|docx|doc)$ {
            root      /path/to/your/application/directory;
        }

        # 页面地址，一般我不喜欢缓存页面，这样的话 可以防止缓存，然后更新失效问题
        location ~* \.(htm|html)$ {
            root      /path/to/your/application/directory;
            expires   -1;
        }

        # 其余请求代理到需要的后台地址，也可以 rewrite
        location / {
            proxy_pass http://BACKEND_SERVER;
            proxy_http_version 1.1;
            proxy_pass_request_headers on;
            proxy_set_header Connection "";
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Cookie $http_cookie;

            client_max_body_size    30m;
            client_body_buffer_size 128k;

            proxy_cookie_path /# /;
            proxy_cookie_path /#/ /;

            proxy_redirect off;
            proxy_connect_timeout   6000;
            proxy_send_timeout      6000;
            proxy_read_timeout      6000;
            proxy_buffer_size       80k;
            proxy_buffers           4 640k;
            proxy_busy_buffers_size 1280k;
            proxy_temp_file_write_size 1280k;

            proxy_next_upstream http_502 http_504 error invalid_header;

            # transfer-encoding: chunked
            # chunked_transfer_encoding off;
        }

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

    # another virtual host using mix of IP-, name-, and port-based configuration
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
```
