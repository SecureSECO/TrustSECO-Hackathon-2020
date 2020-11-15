import requests, json, copy
from packageData import *
from mongo import *
import asyncio
import urllib
import time

#STATICS
dataSources = {
  "npm": "https://registry.npmjs.com/$packagename$",
  "libraries_io": "https://libraries.io/api/NPM/$packagename$/sourcerank?api_key=f87a16fb5936785010e56788e6ba69ed"
  }
  #TODO remove private API key

#Helper Functions
def printResult(results):
  for result in results:
    print("=======================")
    print(f"Package: {result.id} --- RANK: {result.sourceRank.trustScore}")
    print(f"description: {result.description}")
    print(f"JSON: {json.dumps(result.toJSON(), indent=2)}")
    for v in result.versions:
      print(f"Version: {v.versionNumber}")
      for d in v.dependencies:
        print(f"-{d.packageName}: {d.version}")

def calculateRank(d):
  rank = d.basic_info_present + d.repository_present + d.readme_present + d.license_present + d.versions_present + d.follows_semver + d.recent_release + d.not_brand_new + d.one_point_oh + d.dependent_projects + d.dependent_repositories + d.stars + d.contributors + d.subscribers + d.all_prereleases + d.all_prereleases + d.any_outdated_dependencies + d.is_deprecated + d.is_unmaintained + d.is_removed
  return rank

#Step 1
def initializeAnalysisOfTree(rootPackage):
  jobStack.append(rootPackage)
  dependencyResults = []

  loop = asyncio.new_event_loop()
  asyncio.set_event_loop(loop)

  while jobStack:
    result = popAndAnalyze()
    time.sleep(1)
    loop.run_until_complete(addFileAsync(result.toJSON()))

  
  #   dependencyResults.append(popAndAnalyze())
  # return dependencyResults


def popAndAnalyze():
  currentPackage = jobStack.pop()
  # print("analyzing ", currentPackage)
  result = analyzePackage(currentPackage)
  jobsDone.append(currentPackage)
  return result

def analyzePackage(packageID):
  print("Analyzing ", packageID)
  packageID =  urllib.parse.quote(packageID, safe='~()*!.\'')
  package = Package(packageID)
  package.sourceRank = getSourceRank(packageID)
  package.trustScore = package.sourceRank.trustScore
  package = getDependencyTreeData(package)
  return package

#Step 2
def getDependencyTreeData(package):
  API = dataSources["npm"]
  sourceUrl = API.replace("$packagename$", package.id)
  response = requests.get(sourceUrl).json()
  versions = []
  package.packageName = response.get('name','')
  package.description = response.get('description','')
  package.repository = response.get('repository','')
  package.readme = response.get('readme','')
  package.homepage = response.get('homepage','') 
  try:
    for i in response['versions']:
      try:
        version = Version(i, 
          timestamp = response['time'][i],
          currentTrust = package.trustScore)
        version.dependencies = getDependenciesFromVersion(response['versions'][i])
        versions.append(version)
      except KeyError : ""
  except KeyError : ""
  if "error" in response:
      print("Sorry, not found")
  package.versions = versions
  return package

#Step 3
def getDependenciesFromVersion(versionData):
  depList = []
  try:
    for (package, vers) in versionData['dependencies'].items():
      depList.append(Dependency(package, vers))
      addJob(package)
  except: ""
  return depList

#Step 4 crawl Dependencies      
jobsDone =  []
jobStack = []
def addJob(packageName):
  if packageName not in jobStack:
    if packageName not in jobsDone:
      jobStack.append(packageName)

#step 5
def getSourceRank(packageID):
  # print("getSourceRank: ", packageID)
  API = dataSources["libraries_io"]
  sourceUrl = API.replace("$packagename$", packageID)
  # print("sourcerank: ", packageID)
  print("url: ",sourceUrl)
  response = requests.get(sourceUrl).json()
  sourceRank = SourceRank(packageID)
  sourceRank.basic_info_present = response["basic_info_present"]
  sourceRank.repository_present = response["repository_present"]
  sourceRank.readme_present = response["readme_present"]
  sourceRank.license_present = response["license_present"]
  sourceRank.versions_present = response["versions_present"]
  sourceRank.follows_semver = response["follows_semver"]
  sourceRank.recent_release = response["recent_release"]
  sourceRank.not_brand_new = response["not_brand_new"]
  sourceRank.one_point_oh = response["one_point_oh"]
  sourceRank.dependent_projects = response["dependent_projects"]
  sourceRank.dependent_repositories = response["dependent_repositories"]
  sourceRank.stars = response["stars"]
  sourceRank.contributors = response["contributors"]
  sourceRank.subscribers = response["subscribers"]
  sourceRank.all_prereleases = response["all_prereleases"]
  sourceRank.any_outdated_dependencies = response["any_outdated_dependencies"]
  sourceRank.is_deprecated = response["is_deprecated"]
  sourceRank.is_unmaintained = response["is_unmaintained"]
  sourceRank.is_removed = response["is_removed"]
  sourceRank.trustScore = calculateRank(sourceRank)
  return sourceRank
  
#############
###EXECUTE###
#############
# packageTreeData = initializeAnalysisOfTree("@ungap/promise-all-settled")
packageTreeData = initializeAnalysisOfTree("react")
# packageTreeData = initializeAnalysisOfTree("loose-envify")(allResults)
# printResult(packageTreeData)

# for result in packageTreeData:
#   loop = asyncio.new_event_loop()
#   asyncio.set_event_loop(loop)
#   loop.run_until_complete(addFileAsync(result.toJSON()))
  

# result = packageTreeData[0]
# print(f"Pushin package to MongoDB: {result.id} --- RANK: {result.sourceRank.trustScore}")
# addFile(result.toJSON())
# print("file pushed to MONGODB")