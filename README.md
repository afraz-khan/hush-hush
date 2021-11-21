<div id="top"></div>


<!-- PROJECT SHIELDS -->
![Repo-Size][repo-size-shield]
![Watchers][watchers-shield]
[![Issues][issues-shield]][issues-url]
[![BSD License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/afraz-khan/hush-hush">
    <img src="https://i.ibb.co/0ts8L6D/logo192.png" alt="Logo" width="192" height="192">
  </a>

  <h3 align="center">Hush-Hush Password Wallet</h3>

  <p align="center">
    A personal password wallet!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/afraz-khan/hush-hush/issues">Report Bug</a>
    ·
    <a href="https://github.com/afraz-khan/hush-hush/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->


<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Hush-Hush is a web based personal password wallet that is used to manage credentials of your digital accounts securely. Not digital only, it can be used to save any secret information which is only accessible to the individual in control of the wallet. Wallet is protected with a username/password pair that you define while configuring the wallet.



### Built With


* [Flask](https://flask.palletsprojects.com/)
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com)


### Features
- 100% data encryption at rest
- Interactive GUI
- Easily deployable
- Complete control of the wallet
- Export credentials
- Import credentials (see format [here](https://github.com/afraz-khan/hush-hush/tree/develop/setup/import-format))

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Deployment

Backend of the project is built with flask and python cryptography tools like [cryptography](https://cryptography.io/), [pycryptodome](https://pycryptodome.readthedocs.io/). Frontend is built using reactjs. This project can be deployed same as any other flask app. See all deployment options [here](https://flask.palletsprojects.com/en/2.0.x/deploying/index.html). Frontend react code resides in the folder named `client` and build of that is used as the static assests folder to flask app.


### Prerequisites
Spin-up a linux server(ubuntu recommended) where you want to deploy your password wallet and don't use that server for any other purposes but to be used as your password wallet only.
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

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [] Make wallet scalable
- [] Add more deployement options

See the [open issues](https://github.com/afraz-khan/hush-hush/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the BSD License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@afrazkhan_](https://twitter.com/afrazkhan_)
Email: afrazkhan@pm.me
Project Link: [https://github.com/afraz-khan/hush-hush](https://github.com/afraz-khan/hush-hush)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [PyCryptodome](https://pycryptodome.readthedocs.io/)
* [React CSV](https://www.npmjs.com/package/react-csv)
* [Font Awesome](https://fontawesome.com/)
* [Flaticon](https://www.flaticon.com/)
* [Bootstrap](https://getbootstrap.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[repo-size-shield]: https://img.shields.io/github/repo-size/afraz-khan/hush-hush?logo=github&style=for-the-badge
[watchers-shield]: https://img.shields.io/github/watchers/afraz-khan/hush-hush?color=%23fac55a&style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/afraz-khan/hush-hush?style=for-the-badge
[contributors-url]: https://github.com/afraz-khan/hush-hush/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/afraz-khan/hush-hush?color=%239afc4e&logo=github&style=for-the-badge
[forks-url]: https://github.com/afraz-khan/hush-hush/network/members
[stars-shield]: https://img.shields.io/github/stars/afraz-khan/hush-hush?color=%2334959e&logo=github&style=for-the-badge
[stars-url]: https://github.com/afraz-khan/hush-hush/stargazers
[issues-shield]: https://img.shields.io/github/issues/afraz-khan/hush-hush?logo=github&style=for-the-badge
[issues-url]: https://github.com/afraz-khan/hush-hush/issues
[license-shield]: https://img.shields.io/github/license/afraz-khan/hush-hush?color=%23d1d1d1&style=for-the-badge
[license-url]: https://github.com/afraz-khan/hush-hush/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/afraz-khan
[product-screenshot]: https://i.ibb.co/NsSL4GH/hush-hush-demo.png
