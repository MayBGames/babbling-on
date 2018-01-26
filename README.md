Making a game with [Babylon.js](https://www.babylonjs.com/)! :metal:
===============================

I :heart: javascript. A lot.

_"Yeah, so do I..."_ I hear you saying. _"But, I mean... can you really make a game with javascript?"_

**:tada::confetti_ball:ABSOLUTELY:confetti_ball::tada:**

_"Whoa!"_ You say. _"I want to do that! How do I do that?"_

Read on :sunglasses:

### A new approach to teaching

This is kind of a new concept for tutorials. Instead of using blog posts or a series of videos to teach game development with Babylon.js, this repo teaches using code, commit comments, a GitHub Project with task cards, and inline commit diff comments (_comments about specific lines in a commit - they're super awesome, you'll see :thumbsup:_).

The idea is that this repo teaches by showing.

1. What are best practices for game development? **Look at the repo**
2. How do I do ____ with lighting/physics/cameras in Babylon.js? **Look at the repo**
3. What does the process of making a game look like? **Look at the repo**

##### why Babylon.js?

I've worked with Unity and dipped my toe into Unreal.

I wanted something I could use to quickly prototype ideas. Something with minimal setup requirements and the shortest path-to-output possible. After researching things quite a bit I settled on Babylon.js.

Babylon.js has a nice, consistent api, it's small enough to load into a browser quickly, and it's [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) performance seems quite good.

I'm also much more comfortable in a code-based environment than a gui environment like Unreal or Unity.

Structure
=========

With all this talk about the importance of the repo, how is the repo structured?

### master branch

The `master` branch is the always-deployable version of the project. Before code from topic or special branches are merged to `master` it must be validated that merging will not cause instability on `master`.

**NOTE** _As part of the learning process, all the initial work (the work in the [Initial Push](https://github.com/MayBGames/babbling-on/projects/1) project) has been done on the `master` branch. All work moving forward will be done on topic/special branches._

### Topic branches

The idea is to add branches for specific features/sections of Babylon.js. So, for example, a branch would be created for **lighting** or **texturing** etc. Each branch would go into detail on the topic and how it relates to the game being built. All topic branches will be merged back into `master` when work on them has been completed.

### Special branches

Occasionally branches may be created for a special purpose. One example is the `stl-ggj-2018` branch for the St Louis Global Game Jam 2018. Any such branch will contain only work for that event/occasion/need. Special branches _may_ be merged back into `master`. That decision will will be made on a case-by-case basic.

### Projects

Each branch will have an associated [GitHub Project](https://help.github.com/articles/about-project-boards/). Each Project will have one or more Tasks.

Projects are a good way to group work. All work related to physics, for example, would be completed under a project named "Physics", or something similar (_we'll cross that bridge when we come to it :stuck_out_tongue_winking_eye:_).

### Tasks

Tasks represent things that needs to be done. Tasks have tags specifying how they add value to the Project. Looking through a Project's tasks can be a very helpful way to see what the process of development using Babylon.js (_and game dev in general_) looks like. 

A task has three stages:

1. **To Do**: This is the stage all tasks are added to. Tasks in this stage need to be worked on but have not been started.
2. **In Progress**: This is the stage for all tasks that are currently being worked on, but are not yet complete.
3. **Done**: This stage signifies that a task is complete and requires no additional work.

### Commits

Every [commit](https://github.com/MayBGames/babbling-on/commits/master) has valuable details regarding what was done and why in the commit message. Some commits are linked to Tasks as well (_though not all - some commits are house cleaning/guality of life changes that don't belong to a task_). Some commits also have commit diff comments. These comments go into much greater detail regarding specific lines of code; how they function, why they were added/removed/changed, etc.

Commits that close tasks or fix bugs are [annotated](https://help.github.com/articles/closing-issues-using-keywords/) as such.

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
        listen       4242; # Order 66 :-)
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

Thanks, and I hope this repo helps you wrap your head around [Babylon.js](https://www.babylonjs.com/) and game dev in general! :metal:
