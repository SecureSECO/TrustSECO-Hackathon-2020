import pymongo, pprint, sys, os

client = pymongo.MongoClient("mongodb+srv://SecureSECO-User:B0SzNryTs9KVXzcd@secureseco-cluster1.ojoox.mongodb.net/SecureSECO-db?retryWrites=true&w=majority")
db = client.test

db = client["SecureSECO-db"]
collection = db["SecureSECO-collection"]

#print 'Argument List:', str(sys.argv)

packageName = str(sys.argv[1])

response = collection.find({'id':packageName})

versionsTrust = []

try:
    for x in response[0]['versions']:
    #    print(x['versionNumber'] + " " + str(x['trustScore']))
        versionsTrust.append([x['versionNumber'], x['trustScore']])
except:
    print("Sorry, npm package not found. Please go back to enjoying Odyssey!")
    exit()

versionsTrustSorted = sorted(versionsTrust, key=lambda tup: tup[1])

print("The most recent version of package \"" +packageName +"\" " + versionsTrust[-1][0] + " has trust level " + str(versionsTrust[-1][1])+ ". Now installing version " + versionsTrustSorted[-1][0] + " with trust level " +str(versionsTrustSorted[-1][1]) +"." )

osCommand = "npm install " + packageName + "@" + versionsTrustSorted[-1][0] + " --dry-run"

print(osCommand)
os.system(osCommand)

print("Script ended.")