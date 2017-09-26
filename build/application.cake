#addin nuget:https://www.nuget.org/api/v2?package=Cake.Npm&version=0.11.0

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");
var configuration = Argument("configuration", "Release");

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

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

Task("Clean")
    .Does(() => {
        CleanDirectory(publishDir);
    });

Task("Npm Install")
    .Does(() => {
        var settings = new NpmInstallSettings {
            WorkingDirectory = solutionDir,
            LogLevel = NpmLogLevel.Warn
        };

        NpmInstall(settings);
    });

Task("Run Client Unit Tests")
    .Does(() => {
        var settings = new NpmRunScriptSettings{
            WorkingDirectory = solutionDir,
            LogLevel = NpmLogLevel.Warn,
            ScriptName = "test"
        };

        NpmRunScript(settings);
    });

Task("Run Backend Unit Tests")
    .Does(() => {
        var backendTestsSourcesDir = solutionDir + Directory("tests/IsomorphicSpaUnitTests");
        var settings = new DotNetCoreTestSettings
        {
            Configuration = configuration
        };

        DotNetCoreTest(backendTestsSourcesDir, settings);
    });

Task("Publish Application")
    .Does(() => {
        var applicationSourcesDir = solutionDir + Directory("src/IsomorphicSpa");
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

Task("Default")
    .IsDependentOn("Clean")
    .IsDependentOn("Npm Install")
    .IsDependentOn("Run Client Unit Tests")
    .IsDependentOn("Run Backend Unit Tests")
    .IsDependentOn("Publish Application");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);