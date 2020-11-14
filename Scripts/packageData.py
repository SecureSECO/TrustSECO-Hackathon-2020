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
  
  def addVersion(versionNumber, dependencies=[], devDependencies = []):
    newVersion = Version(versionNumber, dependencies = dependencies, devDependencies = devDependencies)
    versions.append(newVersion)
  
  def toJSON():
    return ""
  

class Version:
  def __init__(self, versionNumber, dependencies =[], devDependencies = []):
    self.versionNumber = versionNumber
    self.dependencies = []
    self.devDependencies = []
  
  def addDependency(packageName, version):
    dependencies.append(Dependency(packageName,Version))

class Dependency:
  def __init__(self, packageName, version):
    self.packageName = packageName
    self.version = version