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
- 100% data encryption
- Interactive GUI
- Easily deployable
- Complete control of the wallet
- Save new credentials
- Search for saved origins _(**origin** is the name/source of a particular digital account)_
- Export all credentials
- Import credentials (see format here)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Backend of the project is built with flask and some well-known python cryptography tools like [cryptography](https://cryptography.io/), [pycryptodome](https://pycryptodome.readthedocs.io/) while frontend is built using reactjs. This project can be deployed same as any other flask app. See all deployment options [here](https://flask.palletsprojects.com/en/2.0.x/deploying/index.html). Frontend code resides in the folder named `client`.

> I recommend that choose a server where you want to deploy your password wallet and don't use the server for any other purposes but to be used as your password wallet only. Apply desired network firewalls on the server and you are all set.  
So far, I have deployed & tested this project on heroku as well as on windows/linux severs (aws, azure). I will explain both of these methods of deployment for this project.

### Prerequisites
Make sure 
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [] Add Additional Templates w/ Examples
- [] Add "components" document to easily copy & paste sections of the readme
- [] Multi-language Support
    - [] Chinese
    - [] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

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

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

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
