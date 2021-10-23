import csv

# open the file in the write mode
f = open('csv_data.csv', 'w')

header = ['origin', 'username', 'password']

# create the csv writer
writer = csv.writer(f)

# write a row to the csv file
writer.writerow(header)

for i in range(3,15):
	writer.writerow(['jal{}'.format(i),'asdsd','asdsdsd'])

# close the file
f.close()
