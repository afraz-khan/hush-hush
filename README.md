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
    <a href="https://github.com/afraz-khan/hush-hush/issues">Report Bug</a>
    ·
    <a href="https://github.com/afraz-khan/hush-hush/issues">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project 💡

[![Product Name Screen Shot][product-screenshot]](https://hush-hush-demo.herokuapp.com/)

Hush-Hush is a web based personal password wallet solution that is used to manage credentials of your digital accounts securely. Not digital only, it can be used to save any secret information which is only accessible to the individual in control of the wallet. Wallet is protected with a username/password pair that you define while configuring the wallet.



### Built With 🔧


* [Flask](https://flask.palletsprojects.com/)
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com)


### Features ✨
- 100% data encryption at rest
- Interactive GUI
- Easy deployment
- Complete control of the wallet
- Export credentials
- Import credentials (see format [here](https://github.com/afraz-khan/hush-hush/tree/develop/setup/import-format))

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- DEPLOYMENT -->
## Deployment 🔼

Backend of the project is built with flask and python cryptography tools [cryptography](https://cryptography.io/), [pycryptodome](https://pycryptodome.readthedocs.io/). Frontend is built using reactjs and react project named `client`. Build of react project is used as the static assests folder to flask app. Project can be deployed same as any other flask app. See all deployment options [here](https://flask.palletsprojects.com/en/2.0.x/deploying/index.html).  
Find the deployment options below that are used to test this project so far.

* [Deploy on Linux Server](https://github.com/afraz-khan/hush-hush/blob/main/setup/deployment-options/DEPLOY_LINUX.md)
* [Deploy on Heroku](https://github.com/afraz-khan/hush-hush/blob/main/setup/deployment-options/DEPLOY_HEROKU.md)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage 🍱

- For each credentials object, you have to enter 3 items (`origin`, `username`, `password`).
  - `origin` should be the source like "dojo-bank", "facebook", "google account".
  - `username` should be actual username/email or any unique value that you setup for that particular account for identification.
- You can import credentials in bulk. use this [guide](https://github.com/afraz-khan/hush-hush/blob/main/setup/import-format/README.md).
- Each time you login to your wallet, user session is valid for 20 mins only. You will have to re-login after each session expires.

#### Demo 🌠
Demo Link: https://hush-hush-demo.herokuapp.com/  
Username: `demouser`  
Password: `Demopassword123$`

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap ⏭️

- [ ] Make wallet scalable
- [ ] Add more deployement options

See the [open issues](https://github.com/afraz-khan/hush-hush/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing ㊗️

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
## License 🔑

Distributed under the BSD License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact 👋

Twitter - [@afrazkhan_](https://twitter.com/afrazkhan_)  
Email: afrazkhan@pm.me  
Project Link: [https://github.com/afraz-khan/hush-hush](https://github.com/afraz-khan/hush-hush)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments 🙌

* [Choose an Open Source License](https://choosealicense.com)
* [PyCryptodome](https://pycryptodome.readthedocs.io/)
* [PyCryptography](https://cryptography.io/en/latest/)
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
