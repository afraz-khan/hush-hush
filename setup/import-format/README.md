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

You can import credentials data in csv file fromat.

### Format
- First line of the file is heading. Its value would always be `origin,username,password`.
- Each other line except first line is treated as a unique credentials record.
- Provide values for a single credentials record on a single line.
- Values should be comma separated and order should be with respect to the heading as given in first bullet point.
- Try to avoid any space or single/double quotes around values.
	- `"gmail","myusername","mypassword"` ❌
	- `gmail,myusername  , mypassword` ❌
	- `gmail,myusername,mypassword`✅

---

Download the sample import csv file [here](https://github.com/afraz-khan/hush-hush/blob/develop/setup/import-format/sample-import-data.csv)

![import-format](https://github.com/afraz-khan/hush-hush/blob/develop/setup/import-format/import-sc.png)
