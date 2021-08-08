# hush-hush
Personal password wallet.
### Structure
A json file is used as main cipher repository. This file has a long cipher text having information of all credentials objects. Cipher text is saved in form of bytes.
Every credentials object is structured as follows in the cipher text:
```
{
	{origin}: [ {username}, {password} ]
}
```
`origin` can be anything just to denote the source of the credentials object i.e. google, microsoft, heroku.com, "My dash bank".
### Configuration
- #### Cipher Filename ENV
	Since cipher text is saved in a json file. You have to setup an environment variable with the name of that file. It can be any name but extension must be **_.json_**.
- #### Cipher Secret ENV
	Cipher is symmetricly encrypted with a **secret key**. Everytime, some operation has to be performed on cipher, first it is decrypted with same secret key, operations is performed and then encrypted back using the secret key. 
You have to setup an environment variable for that secret called **secret**.
	> NOTE: Since secret key would be most probably in bytes form so as of yet, i never found a way to store bytes as env var, so use this method here to convert secret to base64 encoded string, get the string value without **_b' '_**(it is attached with bytes values) and set that string value in the **secret** env var.
- #### `[username, password]` Array Encryption ENVs
	As per the structure of a credentials object [here](###structure), `[username, password]` array is encrypted asymmetrically, so we will encrypt an array object with a **_public key_** and decrypt with respective **_private key_**. 