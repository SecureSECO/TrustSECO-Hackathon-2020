async function getAllComponents(collection){
	return await collection.find();
}

async function FindComponent( varComponentName, varVersion, collection){
	return await collection.find(
			       	   {
					ComponentName:varComponentName,
	   		    		Version:varVersion
				    });
}

async function AddVote(varComponentName, varVersion, varTrustScore, varUserID,collection){
	await collection.insertOne(
			       	   {
					ComponentName:varComponentName,
	   		    		Version:varVersion ,
				     	TrustScore:varTrustScore, 
				    	UserID:varUserID
				    });
}

async function main(){
	const MongoClient = require('mongodb').MongoClient;
	const uri = "mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-VotingDB?retryWrites=true&w=majority";
	const client = new MongoClient(uri, { useUnifiedTopology: true });
	await client.connect();
	const collection = client.db("SecureSECO-db").collection("SecureSECO-collection");

        //insert a vote
        await AddVote("C5","7.0" ,"2", "1001",collection);

        //find all votes for a component
	results = await FindComponent("C5","7.0",collection);
	await results.forEach(element => { console.log(element); }); 

	await console.log("----------------------------------------------");

        //get all votes for all components
	results = await getAllComponents(collection);
	await results.forEach(element => { console.log(element); }); 

	await console.log("----------------------------------------------");


        client.close();
}

main().catch(console.error);


