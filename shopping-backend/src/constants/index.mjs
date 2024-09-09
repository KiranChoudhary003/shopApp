import Product from "../product/product.mjs";

export const constants = {
    Product:{
            add : '/api/product/add',
            find : '/api/product/find/:id',
            read : '/api/product/read',
            update : '/api/product/update/:id',
            remove : '/api/product/remove/:id'
        }
 }
