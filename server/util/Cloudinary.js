const cloudinary = require ("cloudinary").v2;
          
cloudinary.config({ 
  cloud_name: 'dzofgskjr', 
  api_key: '576169362447519', 
  api_secret: 'RscN8yH2tZhNRsg2wzuttAjTUBs' 
});

module.exports = cloudinary;