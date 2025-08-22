import * as productService from '../service/product.service.js'

export const getAllProduct = async (req, res) => {
    try {
        const { page, size, search } = req.query
        const result = await productService.getAllProduct({ page, size, search })

        if (!result.data || result.data.length === 0) {
            return res.status(200).json({ msg: "tidak ada data" });
        }

        res.status(200).json({
            status: 200,
            data: result.data,
            size: result.size,
            page: result.page,
            totalPage: result.totalPage,
            totalData: result.totalData
        })

    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const product = await productService.getProduct(req.role, req.userId)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.uuid, req.role, req.userId)
        if (!product) return res.status(404).json({ errors: [{ msg: error.message }] })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, link_picture, price } = req.body
        await productService.createProduct(req.userId, { name, link_picture, price })
        res.status(201).json({ msg: 'Product Created' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, price, link_picture } = req.body
        const updated = await productService.updateProduct(req.params.uuid, req.role, req.userId, { name, price, link_picture })
        if (!updated) return res.status(404).json({ errors: [{ msg: error.message }] })
        if (updated === 'FORBIDDEN') return res.status(403).json({ errors: [{ msg: error.message }] })
        res.status(200).json({ msg: 'Product updated successfully' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.deleteProduct(req.params.uuid, req.role, req.userId)
        if (!deleted) return res.status(404).json({ errors: [{ msg: error.message }] })
        if (deleted === 'FORBIDDEN') return res.status(403).json({ errors: [{ msg: error.message }] })
        res.status(200).json({ msg: 'Product deleted successfully!' })
    } catch (error) {
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
}