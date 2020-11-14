from datetime import datetime
from numpy import random
import math

class SourceRank:
  def __init__(self, id, basic_info_present = 0, repository_present = 0, readme_present = 0, license_present = 0, versions_present = 0, follows_semver = 0, recent_release = 0, not_brand_new = 0, one_point_oh = 0, dependent_projects = 0, dependent_repositories = 0, stars = 0, contributors = 0, subscribers = 0, all_prereleases = 0, any_outdated_dependencies = 0, is_deprecated = 0, is_unmaintained = 0, is_removed = 0):
    self.basic_info_present = basic_info_present
    self.repository_present = repository_present
    self.readme_present = readme_present
    self.license_present = license_present
    self.versions_present = versions_present
    self.follows_semver = follows_semver
    self.recent_release = recent_release
    self.not_brand_new = not_brand_new
    self.one_point_oh = one_point_oh
    self.dependent_projects = dependent_projects
    self.dependent_repositories = dependent_repositories
    self.stars = stars
    self.contributors = contributors
    self.subscribers = subscribers
    self.all_prereleases = all_prereleases
    self.any_outdated_dependencies = any_outdated_dependencies
    self.is_deprecated = is_deprecated
    self.is_unmaintained = is_unmaintained
    self.is_removed = is_removed
    self.trustScore = 0

  def toJSON(self):
    return {
		  "basic_info_present": self.basic_info_present,
		  "repository_present": self.repository_present,
		  "readme_present": self.readme_present,
		  "license_present": self.license_present,
		  "versions_present": self.versions_present,
		  "follows_semver": self.follows_semver,
		  "recent_release": self.recent_release,
		  "not_brand_new": self.not_brand_new,
		  "one_point_oh": self.one_point_oh,
  		"dependent_projects": self.dependent_projects,
	  	"dependent_repositories": self.dependent_repositories,
		  "stars": self.stars,
  		"contributors": self.contributors,
	  	"subscribers": self.subscribers,
		  "all_prereleases": self.all_prereleases,
  		"any_outdated_dependencies": self.any_outdated_dependencies,
	  	"is_deprecated": self.is_deprecated,
		  "is_unmaintained": self.is_unmaintained,
		  "is_removed": self.is_removed,
	    "trustScore": self.trustScore
    }

class Package:
  def __init__(self, id):
    self.id = id
    #Add timestamp for future miracles
    self.packageName = ""
    self.versions = []
    self.description = ""
    self.repository = ""
    self.readme = ""
    self.homepage = ""
    self.sourceRank = ""
    self.trustScore = 0
    self.crawlTimestamp = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
  
  def addVersion(versionNumber, dependencies=[], devDependencies = []):
    newVersion = Version(versionNumber, dependencies = dependencies, devDependencies = devDependencies)
    versions.append(newVersion)
  
  def toJSON(self):
    return {
      "id": self.id,
      "crawlTimestamp": self.crawlTimestamp,
      "packageName": self.packageName,
  		"description": self.description,
	  	"repository": self.repository,
		  "readme": self.readme,
  		"homepage": self.homepage,
		  "trustScore": self.trustScore,
      "sourceRank": self.sourceRank.toJSON(),
      "versions": [vers.toJSON() for vers in self.versions]
    }
  

class Version:
  def __init__(self, versionNumber, dependencies =[], devDependencies = [], currentTrust = 0, timestamp = ""):
    self.versionNumber = versionNumber
    self.dependencies = []
    self.devDependencies = []
    self.timestamp = timestamp
    self.trustScore = self.calculateTrustScore(currentTrust)
  
  def addDependency(packageName, version):
    dependencies.append(Dependency(packageName,Version))

  def calculateTrustScore(self, currentTrust):
    randomFactor = random.normal(loc=9.0, scale = 2.0)/10
    now = datetime.now()
    versionDate = datetime.strptime(self.timestamp, "%Y-%m-%dT%H:%M:%S.%fZ")
    monthsOld = abs((now - versionDate).days)/30
    logfactor = math.log(monthsOld,10) #log/base
    dateFactor = min(max(logfactor, 0.3),1.1)
    return round(currentTrust * dateFactor * randomFactor)


  def toJSON(self):
    return {
      "versionNumber": self.versionNumber,
      "timestamp": self.timestamp,
      "trustScore": self.trustScore,
      "dependencies": [dep.toJSON() for dep in self.dependencies]
    }

class Dependency:
  def __init__(self, packageName, version):
    self.packageName = packageName
    self.version = version
  def toJSON(self):
      return {
        "packageName": self.packageName,
        "version": self.version
      }