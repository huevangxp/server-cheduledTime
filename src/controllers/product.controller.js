const axios = require('axios')

exports.getCountProduct = async (req, res) =>{
    try {
        const {count} = req.query
        console.log(count)
        if(!count){
            return res.status(400).json({message:"INVALID COUNT DATA"})
        }
        const {data} = await axios.get(`https://api.olaa.la/api/store/products?count=${count}`)
        if(!data){
            return res.status(404).json({message:'PRODUCT DATA INVALID'})
        }
        
        return res.status(200).json({data: data})
    } catch (error) {
        return res.status(500).json({message:'SERVER ERROR', error:error.message})
    }
}

exports.getProductDetail = async (req, res) =>{
    try {

        const {id} = req.params
        if(!id){
            return res.status(400).json({message:'INVALID PRODUCT ID'})
        }

        const {data} = await axios.get(`https://api.olaa.la/api/store/products/detail?productId=${id}`)
        if(!data){
            return res.status(404).json({message:'PRODUCT DATA INVALID'})
        }
        
        return res.status(200).json({data: data})
    } catch (error) {
        return res.status(500).json({message:'SERVER ERROR', error:error.message})
    }
}