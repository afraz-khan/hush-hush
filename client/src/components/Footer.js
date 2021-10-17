import github from '../images/github.png';

function Footer() {
  return (
    <footer>
      @2021 hush-hush | A Password Wallet
      <ul>
        <li>
          <a id='github-icon' href='https://github.com/afraz-khan'>
            <span>Github Project |</span>
            <img className='social-icon' src={github} alt='github link' />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
