from pymongo import MongoClient
import asyncio
# from main import *
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string

# printResult(packageTreeData)
async def connectToMongo():
  client = MongoClient("mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-VotingDB?retryWrites=true&w=majority")
  db = client["SecureSECO-db"]
  collection = db["SecureSECO-collection"]


def findComponent(componentName, version, collection):
  collection.find_one({"ComponentName": componentName, "Version": version})

async def addFile(jsonFile):
  client = MongoClient("mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-VotingDB?retryWrites=true&w=majority")
  db = client["SecureSECO-db"]
  collection = db["SecureSECO-collection"]
  await collection.insert_one(jsonFile)
  print("pushed?")


# # Issue the serverStatus command and print the results
# serverStatusResult=db.command("serverStatus")
# pprint(serverStatusResult)