require('dotenv').config();
const Airtable = require('airtable-node');

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
    .base('appUreaje3Uqt5867')
    .table('products');

async function processProduct (id) {
    try {
        const record = await airtable.retrieve(id);
        const {fields:{name, description, price}} = record;
        const imageUrl = record.fields.image[0].url;

        return (
            {
                statusCode: 200,
                body: JSON.stringify({
                    id,
                    name,
                    description,
                    price,
                    imageUrl,
                })
            })
    } catch (error) {
        return ({
            statusCode: 500,
            body: `Server Error: ${error}`
        })
    }
}

async function processProductList() {
    try {
        const {records} = await airtable.list();
        const products = records.map((record) => {
            return {id: record.id,
                name: record.fields.name,
                price: record.fields.price,
                imageUrl: record.fields.image[0].url,
            }
        })
        return (
            {
                statusCode: 200,
                body: JSON.stringify(products)
            })
    } catch (error) {
        return ({
            statusCode: 500,
            body: `Server Error: ${error}`
        })
    }
}

exports.handler = async(event,context) => {
    const {id} = event.queryStringParameters;

    if (id) {
        return await processProduct(id)
    }

    return await processProductList();
}
