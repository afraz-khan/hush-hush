<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/afraz-khan/hush-hush">
    <img src="https://i.ibb.co/0ts8L6D/logo192.png" alt="Logo" width="64" height="64">
  </a>
  <h3 align="center">Hush-Hush Password Wallet</h3>

</div>

# Deploy on Linux Server

### Prerequisites
Spin-up a linux server(ubuntu recommended) where you want to deploy your password wallet and do not use that server for any other purposes but to be used as your password wallet only.
Make sure that below dependencies are installed on the server.

* git
* python3
* python3-pip
* python3-venv (optional, in case if you want to create separate virtual env)
* node>= 10.x
* npm
* tmux

```
sudo apt update
sudo apt install git python3 python3-pip python3-venv nodejs npm tmux
```

### Installation
1. Log into the server and clone the project using below command
   ```
   git clone https://github.com/afraz-khan/hush-hush.git
   ```
2. Navigate to the project's root.
   ```
   cd hush-hush
   ```
3. Activate your virtual environment, if you created any. (optional)
4. Figure out your final server url i.e. https://www.example.com, public-ip(123.23.57.12) and run below command to setup the environment.
   ```
   bash setup.sh
   ```
   This bash script takes `username/password` combination, server-url/public-ip and does below tasks in order
   * installs required python & node dependencies
   * creates required environment keys for your wallet
   * sets required application config params
   * creates react build
  
   > If script is stuck due to some error, try to run it again or feel free to contact. I am more than happy to help :).

4. Use `tmux` to create a new terminal session for your wallet application. That session would run in background so that you can work simultaneously in other terminal sessions on the server.
   * Create new session
     ```
     tmux new -s mywalletapp
     ```
   * serve your application using below command
     ```
     gunicorn --bind x.x.x.x:8080 wsgi:app
     ```
     > `x.x.x.x` should be private ip of your server
   * Press `Ctrl + B` and `D` on your keyboard to leave the terminal session running in background.
   * If you need to make changes to your application for some reason or stop the session, enter the command below to reattach to the “mywalletapp” session.
     ```
     tmux attach -t mywalletapp
     ```
     Once again, when you are ready to leave the tmux session to do it’s work, press `Ctrl B` and press `D` on your keyboard. 
   * If for some reason, you want to kill the session, press `Ctrl D` while inside the tmux session.
   * Run below command to list all tmux sessions
     ```
     tmux ls
     ```
5. Your wallet is deployed, now press `Ctrl C` to logout the server and head over to `https://server-public-ip:8080` to see the app.
   > If you set a domain for the server url during the installation than setup that domain for the server and try to access the wallet at `https://your-domain`.
   You can serve the flask app behind an nginx server. Look for step 6 of [this](https://faun.pub/deploy-flask-app-with-nginx-using-gunicorn-7fda4f50066a) document to configure nginx but application works without that.
