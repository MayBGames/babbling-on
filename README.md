Looking into [Babylon.js](https://www.babylonjs.com/)! :metal:
=======================

I've worked with Unity and dipped my toe into Unreal.

I wanted something I could use to quickly prototype ideas. Something with minimal setup requirements and the shortest path-to-output possible. After researching things quite a bit I settled on [Babylon.js](https://www.babylonjs.com/).

### Why?

I :heart: javascript. A lot.

I also :heart: the idea of running full-fledged, high performance 3D code in a browser without the need for any plugins.

WebGL is the way to go for super performant 3D in a browser, and Babylon.js seems a good choice for working with WebGL.

I'm also much more comfortable in a code-based environment than a gui environment like Unreal or Unity.

Structure
=========

### Tasks

To get the best bang for your learning buck, I'd recommend looking through the [Project Tasks](https://github.com/MayBGames/babbling-on/projects/1). The Tasks (_Cards in GitHub parlance_) in the **Done** column are sorted in newest-to-oldest completion order.

### Commits

Every [commit](https://github.com/MayBGames/babbling-on/commits/master) has valuable details regarding what was done and why in the commit message. Many commits are linked to Tasks as well (_though not all - some commits are house cleaning/guality of life changes that don't belong to a task_). Some commits also have commit diff comments. These comments go into much greater detail regarding specific lines of code; how they function, why they were added/removed/changed, etc.

Setup
=====

Babbling On uses javascript [ES6 modules](http://2ality.com/2014/09/es6-modules-final.html#ecmascript-6-modules) (the link explains the benefits). While ES6 modules are awesome, they come with one caveat (it's actually a good thing security-wise, but can be a bit of a pain): they are fetched using [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) requests. This means a server needs to be installed, configured, and running locally.

### Install, configure, and run [nginx](https://nginx.org/en/)

##### install

On a Mac, using [Homebrew](https://brew.sh/)

```sh
$ brew update
$ brew install nginx
```

On Ubuntu using [apt-get](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04) (_link contains more detailed instructions_)

```sh
$ sudo apt-get update
$ sudo apt-get install nginx
```

##### configure

Once the install completes, open nginx's root config file

```sh
$ vim /usr/local/etc/nginx/nginx.conf
```

**NOTE** If you're not familiar with [vim](http://www.vim.org/), you can also open the nginx config file in your default text editor (_on macOS_) by using

```sh
$ open /usr/local/etc/nginx/nginx.conf
```

Once the file is open, update it look like this (_this should be the only contents of the file_):

```
user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    root          "/path/to/your/clone/of/Babbling On";

    charset utf-8;

    server {
        listen       4242; // Order 66 :-)
        server_name  localhost;

        location / {
            if ($request_method ~* "(GET|POST)") {
                add_header "Access-Control-Allow-Origin"  *;
            }

            if ($request_method = OPTIONS ) {
                add_header "Access-Control-Allow-Origin"  *;
                add_header "Access-Control-Allow-Methods" "GET, POST, OPTIONS, HEAD";
                add_header "Access-Control-Allow-Headers" "Authorization, Origin, X-Requested-With, Content-Type, Accept";
              
                return 200;
            }

            index  index.html;
        }
    }
}
```

##### run

 On mac/linux:

 ```sh
 $ sudo nginx
 ```

##### yay!

 Now you can navigate to http://localhost:4242 in your browser (_currently only [Chrome](https://www.google.com/chrome/browser/features.html) and [Safari](https://support.apple.com/downloads/safari) are supported; thanks vendor prefixes_) and see the project running!

Feedback/Contributions
======================

I'd love to hear what you think - good or bad! Feel free to comment on open issues, open your own issues, fork the repo, make changes you'd like to see, and send pull requests!

Thanks, and I hope this repo helps you wrap your head around [Babylon.js](https://www.babylonjs.com/)! :metal:
