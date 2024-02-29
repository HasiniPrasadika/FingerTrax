const cloudinary = require ("cloudinary");
          
cloudinary.config({ 
  cloud_name: 'dzofgskjr', 
  api_key: '576169362447519', 
  api_secret: 'RscN8yH2tZhNRsg2wzuttAjTUBs' 
});

module.exports = cloudinary;