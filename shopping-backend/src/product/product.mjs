class Product{
    products = []

    add = (req, res) => {
        this.products.push({
            id : 'Product-' + (new Date()).getTime(),
            ...req.body
        })
        res.send({
            bSuccess : true,
            message : `Product is added!!` 
        })
    }

    read = (req, res) => {
        res.send(this.products)
    }

    find = (req, res) => {
        res.send(this.products.find(product => product.id === req.params.id))
    }

    remove = (req, res) => {
        this.products = this.products.filter(product => product.id !== req.params.id)
        res.send({
            bSuccess : true,
            message  : 'Product is removed !'
        })
    }

    update = (req, res) => {
        const index = this.products.findIndex(product => product.id === req.params.id)
        this.products[index] = {
            id : req.params.id,
            ...req.body
        }
        res.send({
            bSuccess : true,
            message : 'Product is updated!!'
        })

    }
}

export default Product