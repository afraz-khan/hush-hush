#!/bin/bash

echo -e '\n\n     ****** HUSH-HUSH Password Wallet Installation *****\n\n'

password_rules=(
	'- length should be at least 6' '- length should be not be greater than 8' 
	'- Password should have at least one numeral' '- Password should have at least one uppercase letter' 
	'- Password should have at least one lowercase letter' '- Password should have at least one of the symbols $@#'
	)
script_loc='./setup.sh'

# 1. INSTALL DEPENDENCIES ---------------------------------------------------------------

echo -e '\n\n3. Installing code dependencies.\n===================================\n'

echo -e '\n- Python dependencies\n'
echo $(python3 -m pip install -r requirements.txt)

echo -e '\n- Node dependencies\n'
echo $(cd client && npm i)

# 2. SET ENVIRONMENT VARIABLES --------------------------------------------------------

echo -e '\n\n1. Set wallet login credenitals.\n===================================\n'

output_success=false

read -p 'Enter username: ' username
echo -e '\n\n------ PASSWORD RULES\n'
	for t in "${password_rules[@]}"; do
		echo $t
	done
	echo -e

set_password(){
	read -sp 'Enter password: ' password
	echo -e
	read -sp 'Confirm password: ' password_confirm

	if [ $password = $password_confirm ]; then
		env_keys_output=`python3 setup/generate_env_keys.py $username $password`
	
		case $env_keys_output in 
			0)
			output_success=true
			;;
			2)
			echo -e "\n\nxxxxxxxxxxxxxxxxxxxx ERROR: Password is invalid. Please read the password"
			echo -e "                            checks above and re-enter the password.\n"
			;;
			1)
			echo -e "\n\n\n\n\nxxxxxxxxxxxxxxxxxxxx ERROR: Something went wrong, running script again.\n"
			exec $script_loc
			;;
			*)
			echo -e "\n\nxxxxxxxxxxxxxxxxxxxx ERROR: Something is wrong, try to run script again.\n"
			exit 1
		esac
	else 
		echo -e "\n\nxxxxxxxxxxxxxxxxxxxx ERROR: Passwords don't match.\n"
	fi
}

while [ $output_success = false ]
do
	set_password
done

echo -e '\n\n\n2. Set your final server url i.e. (https://www.exmaple.com, example.com, 12.44.555.33).\n===================================\n'
echo -e '----- IMPORTANT\n- Remove trailing forward slash(/) from the url.\n\n'
read -p 'Enter server url: ' server_url

echo $(python3 setup/set_server_url.py $server_url)
echo -e '\n\n     ***** Environment is set up successfully *****'
# 3. CREATE REACT BUILD ---------------------------------------------------------------

echo -e '\n- Create React Build\n===================================\n'
echo -e 'executing.....'
echo $(cd client && npm run build)

echo -e '\n\n Done :)'