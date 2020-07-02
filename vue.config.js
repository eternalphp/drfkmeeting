"use strict";
const name = "多福"; // page title

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= name
        return args
      })
  }
};
