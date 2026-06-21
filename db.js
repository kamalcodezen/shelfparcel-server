const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_DB_URL;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function getDb() {
    // যদি গ্লোবাল কানেকশন অলরেডি থাকে, তবে নতুন করে কানেক্ট করবে না (Serverless Optimization)
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
    }
    const connectedClient = await global._mongoClientPromise;

    // ডাটাবেজের নাম এখানে সেট করা হলো
    return connectedClient.db("shelf_parcel");
}

module.exports = { getDb };