from pymongo import MongoClient
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
# from main import *
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string

# printResult(packageTreeData)

uri="mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-VotingDB?retryWrites=true&w=majority"
  # client = MongoClient(uri)
client = AsyncIOMotorClient(uri)
db = client["SecureSECO-db"]
collection = db["SecureSECO-collection"]


def findComponent(componentName, version, collection):
  collection.find_one({"ComponentName": componentName, "Version": version})

async def getOne():
  document = await collection.find_one()
  pprint.pprint(document)

def addFile(jsonFile):
  result = collection.insert_one(jsonFile)
  print(f"result: {repr(result)}")

async def addFileAsync(jsonFile):
  result = collection.insert_one(jsonFile)
  print(f"result: {repr(result)}")
  return repr(result)



# # Issue the serverStatus command and print the results
# serverStatusResult=db.command("serverStatus")
# pprint(serverStatusResult)