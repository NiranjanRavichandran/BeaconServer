var Schema = {
  users: {
    product_name: {type: 'string', nullable: false, primary: true},
    price: {type: 'number', maxlength: 50, nullable: true},
    discount: {type: 'number', maxlength: 100, nullable: false},
    image: {type: 'string', maxlength: 50, nullable: false},
    region: {type: 'string', maxlength: 200, nullable: true}
  }
};

module.exports = Schema
