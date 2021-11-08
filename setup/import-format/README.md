You can import credentials data in csv file fromat.

### Format
- First line of the file is heading. Its value would always be `origin,username,password`.
- Each other line except first line is treated as a unique credentials record.
- Provide values for a single credentials record on a single line and order should be with respect to heading as given in first bullet point.
- Try to avoid any space or single/double quotes around values.
	- `"gmail","myusername","mypassword"` ❌
	- `gmail,myusername  , mypassword` ❌
	- `gmail,myusername,mypassword`✅

---

See a sample import csv file [here](https://github.com/afraz-khan/hush-hush/blob/develop/setup/import-format/sample-import-data.csv)