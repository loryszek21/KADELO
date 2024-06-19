const pool = require("../../db");
const { getUserId } = require("../users/controller");


const getShop = (req, res) => {
    const limit = req.query.limit || 10;
    pool.query(`SELECT * FROM course LIMIT $1`, [limit], (error, results) => {
        if (results.rows.length == 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};


const postitemShopById = async(req, res) => {
    const email = req.query.email ;
    const { id } = req.params;
    const orderId = `order_${id}_${Date.now()}`
    try {

        // Pobieranie danych kursu z bazy danych
        const courseQuery = await pool.query(`SELECT * FROM course WHERE course_id = $1`, [id]);
        if (courseQuery.rows.length == 0) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        const course = courseQuery.rows[0];
        const requestBody = {
            notifyUrl: "https://your.eshop.com/notify",
            customerIp: "127.0.0.1",
            merchantPosId: "481726",
            description: "RTV market",
            currencyCode: "PLN",
            redirectUri: "localhost:3000/contest",
            totalAmount: (course.course_price * 100).toString(), // Assuming course_price is in PLN and needs to be in grosz
            extOrderId: orderId,
            buyer: {
                email: "john.doe@example.com",
                phone: "654111654",
                firstName: "John",
                lastName: "Doe",
                language: "pl"
            },
            products: [
                {
                    name: course.course_name,
                    unitPrice: (course.course_price * 100).toString(), // Assuming course_price is in PLN and needs to be in grosz
                    quantity: "1"
                }
            ]
        };

        const externalApiResponse = await fetch("https://secure.snd.payu.com/api/v2_1/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 77a75b2c-db67-4fd0-a590-3414d7992092"
            },
            body: JSON.stringify(requestBody)
            
            



        });
    //     const getStatus = await fetch(`https://secure.snd.payu.com/api/v2_1/orders/${orderId}`)
    // console.log(getStatus)
    
    
    
    
        
        // console.log("test1")
        
        
        // console.log(requestBody)
        // console.log(body)

        if (!externalApiResponse.ok) {
            throw new Error(`External API error: ${externalApiResponse.statusText}`);
        }else{
          
            try{
                const userID = await getUserId(email)
                console.log(userID, id)
                pool.query(
                    `INSERT INTO user_purchased_course (user_id, course_id)VALUES(
                        ${userID}, ${id})`
                        
                    );
                }catch(error){
                    console.error("Error:", error)
                    res.status(500).json({ message: "Internal server error moj " });

                }
                
            }
        
    
        console.log(externalApiResponse) 

        res.status(200).json(externalApiResponse.url);


    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
    postitemShopById,
getShop,
}