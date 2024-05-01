const pool = require('../db/db')

module.exports.place_order = async (req, res) => {
    try {
        const getProductList = await pool.query("select * from _cart where customer_id = $1", [
            req.user_id
        ])

        if (getProductList.rowCount == 0) {
            return res.status(201).json({ "msg": "Please Add item in cart", data: 0 })
        } else {
            getProductList.forEach(([key, value]) => {
                const storeMultipleOrder = pool.query("Insert into _customer_orders(customer_id,due_amount,qty,order_status) VALUES ($1,$2,$3,$4)", [
                    req.user_id,
                    value.p_price,
                    value.qty,
                    'Pending'
                ])
            });

            const getOrderId = await pool.query("select order_id from _customer_orders where customer_id = $1", [
                req.user_id
            ])

            getOrderId.forEach(([key, value]) => {
                const storeInOrders = pool.query("Insert into Orders(Order_id,customer_id) VALUES ($1,$2)", [
                    value.order_id,
                    req.user_id
                ])
            })


            return res.status(200).json({ msg: "Order Place Successfully", data: 1 })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}