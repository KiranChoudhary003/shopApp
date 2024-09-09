import { constants } from "../constants/index.mjs"
import Product from "../product/product.mjs"
import express from 'express'

const router = express.Router()
const product = new Product()

router.post(constants.Product.add, product.add)
router.get(constants.Product.find, product.find)
router.delete(constants.Product.remove, product.remove)
router.get(constants.Product.read, product.read)
router.put(constants.Product.update, product.update)


export default router
