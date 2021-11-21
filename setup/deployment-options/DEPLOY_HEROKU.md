<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/afraz-khan/hush-hush">
    <img src="https://i.ibb.co/0ts8L6D/logo192.png" alt="Logo" width="64" height="64">
  </a>
  <h3 align="center">Hush-Hush Password Wallet</h3>
</div>
</br>

# Deploy on Heroku

### Prerequisites
- Make sure you have below packages on your local machine installed
  * git
  * python3
  * python3-pip
  * python3-venv (optional, in case if you want to create separate virtual env)
  * node>= 10.x
  * npm
  
- Create a new app in your heroku account and name it as you like. For this tutorial, i will stick to name `mypasswordwalletapp`.
- Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli) in your local machine.
- Create a local session of heroku by running below command in your terminal
  ```
  heroku login
  ```

### Installation
1. Clone the project using below command
   ```
   git clone https://github.com/afraz-khan/hush-hush.git
   ```
2. Navigate to the project's root.
   ```
   cd hush-hush
   ```
3. Link the repo to your new heroku app
   ```
   heroku git:remote -a mypasswordwalletapp
   ```
4. Activate your virtual environment, if you created any. (optional)
5. Figure out your final server url i.e. https://www.example.com, public-ip(123.23.57.12). In this case it would be `https://mypasswordwalletapp.herokuapp.com`.
   Run below command to setup the environment.
   ```
   bash setup.sh
   ```
   This bash script takes `username/password` combination, server-url (`https://mypasswordwalletapp.herokuapp.com`) and does below tasks in order
   * installs required python & node dependencies
   * creates required environment keys for your wallet
   * sets required application config params
   * creates react build
  
   > If script is stuck due to some error or you want to change something then run the script again. If you are unable to resolve the issue then feel free to contact. I am more than happy to help :).

6. Run below commands to push the changes.
   ```
   git add .
   git add client/build -f
   git commit -am 'my password wallet'
   git push heroku main
   ```

5. Your wallet is deployed, head over to `https://mypasswordwalletapp.herokuapp.com`.
</br>
</br>

---
