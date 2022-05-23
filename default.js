const defaults = {};

defaults.roleCustomer = 2;
defaults.roleStaff = 1;
defaults.roleDriver = 3;
defaults.minimumAge = 15;
defaults.maximumAge = 100;
defaults.image = 'https://visualpharm.com/assets/30/User-595b40b85ba036ed117da56f.svg';
defaults.codeLength = 6;
defaults.codeValid = 300000; //ms
defaults.passwordLength = 6;
defaults.noDriver = 1;
defaults.hasDriver = 2;
defaults.canceled = 3;
defaults.finished = 4;

module.exports = defaults;