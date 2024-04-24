const pooldb = require('../db/db')

module.exports.product_list = async (req, res) => {
    try {
        const productlist = await pooldb.query("select * from _products where status = '1'");

        if (productlist.rows.length == 0) {
            return res.status(400).json({ msg: "Product Not available" });
        } else {
            return res.status(200).json({ product_list: productlist.rows })
        }
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}