const styleConfig = {
  addAccount: {
    passwordEyeHeight: '65%',
    tooltip: {
      origin: {
        tooltipTitle:
          'Origin of a digital account, e.g. "Microsift", "JJ Bank Account", "My Laptop Password"',
        width: '320px',
        text: 'origin is case-insensitive',
      },
      username: {
        tooltipTitle:
          'Username you set up for your prefered digital account, e.g. "john432", "lokik3kded"',
        width: '300px',
        text: 'origin is case-sensitive',
      },
    },
  },
  csvExport: {
    headers: [
      { label: 'Origin', key: 'origin' },
      { label: 'Username', key: 'username' },
      { label: 'Password', key: 'password' },
    ],
    fileName: 'credentials.csv',
  },
  csvImport: {
    tooltip: {
      tooltipTitle:
        'Each line in the CSV file must follow below format. ' +
        'Values should be comma separated in given order, "[origin], [username], [password]"',
      width: '315px',
      text: 'CSV file format',
    },
    fileTypesAllowed: ['text/csv'],
  },
  server: '',
};

export default styleConfig;
