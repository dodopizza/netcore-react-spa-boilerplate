#addin nuget:https://www.nuget.org/api/v2?package=Cake.Npm&version=0.11.0
#addin nuget:https://www.nuget.org/api/v2?package=Cake.Yarn&version=0.3.5

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Debug");

// Can be win10-x64 or debian.8-x64
var runtime = Argument("runtime", "win10-x64");

//////////////////////////////////////////////////////////////////////
// VARIABLES
//////////////////////////////////////////////////////////////////////

// Current script directory
var scriptDir = Directory(".");

// Root directory
var solutionDir = scriptDir + Directory("..");

// Publish directories
var publishDir = solutionDir + Directory("dist");
var publishApplicationDir = publishDir + Directory("app");

// Application directory
var applicationSourcesDir = solutionDir + Directory("src/IsomorphicSpa");

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() => {
        CleanDirectory(publishDir);
    });

Task("Yarn Install")
    .Does(() => {
        Console.WriteLine(applicationSourcesDir);

        Yarn
            .FromPath(applicationSourcesDir)
            .Install();
    });

Task("Run Client Unit Tests")
    .Does(() => {
        Yarn
            .FromPath(applicationSourcesDir)
            .RunScript("test");
    });

Task("Run Backend Unit Tests")
    .Does(() => {
        var backendTestsSourcesDir = solutionDir + Directory("src/IsomorphicSpaUnitTests");
        var settings = new DotNetCoreTestSettings
        {
            Configuration = configuration
        };

        DotNetCoreTest(backendTestsSourcesDir, settings);
    });

Task("Build Client Side")
    .Does(() => {
        var scriptName = configuration == "Release"
            ? "build:prod"
            : "build";

        Yarn
            .FromPath(applicationSourcesDir)
            .RunScript(scriptName);
    });

Task("Publish Application")
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
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

// Win Command: .\build.ps1 -script '"application.cake"'
// Unix Command: ./build.sh --script '"application.cake"'
Task("Default")
    .IsDependentOn("Clean")
    .IsDependentOn("Yarn Install")
    .IsDependentOn("Run Client Unit Tests")
    .IsDependentOn("Run Backend Unit Tests")
    .IsDependentOn("Build Client Side")
    .IsDependentOn("Publish Application");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);