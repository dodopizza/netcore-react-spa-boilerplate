//////////////////////////////////////////////////////////////////////
// Arguments
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");

// Can be win10-x64 or debian.8-x64
var runtime = Argument("runtime", "win10-x64");

//////////////////////////////////////////////////////////////////////
// Variables
//////////////////////////////////////////////////////////////////////

// Currenct script directory
var scriptDir = Directory(".");

// Root directory
var rootDir = scriptDir + Directory("../..");

// Application directory
var applicationName = "IsomorphicSpa";
var applicationSourcesDir = rootDir + Directory($"src/{applicationName}");

// Publish directories
var publishDir = rootDir + Directory("dist");
var publishApplicationDir = publishDir + Directory("app");

//////////////////////////////////////////////////////////////////////
// Tasks
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() => {
        CleanDirectory(publishDir);
    });

Task("Publish Application")
    .IsDependentOn("Clean")
    .Does(() => {
        var settings = new DotNetCorePublishSettings
        {
            Configuration = configuration,
            OutputDirectory = publishApplicationDir,
            Runtime = runtime
        };

        DotNetCorePublish(applicationSourcesDir, settings);
    });

//////////////////////////////////////////////////////////////////////
// Target
//////////////////////////////////////////////////////////////////////

Task("Default")
    .IsDependentOn("Publish Application");

//////////////////////////////////////////////////////////////////////
// Execution
//////////////////////////////////////////////////////////////////////

RunTarget(target);