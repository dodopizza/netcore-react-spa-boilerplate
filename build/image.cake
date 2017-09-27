#addin nuget:https://www.nuget.org/api/v2?package=Cake.Docker&version=0.7.7

//////////////////////////////////////////////////////////////////////
// ARGUMENTS
//////////////////////////////////////////////////////////////////////

var target = Argument("target", "Default");

//////////////////////////////////////////////////////////////////////
// TASKS
//////////////////////////////////////////////////////////////////////

// Command: .\build.ps1 -target "Build Application Build Image" -script "image.cake"
Task("Build Application Build Image")
    .Does(() => {
        var tags = new [] {
            "aurokk/build"
        };

        var settings = new DockerBuildSettings {
            File = "../images/Dockerfile.Build",
            ForceRm = true,
            Tag = tags
        };

        var context = "..";

        DockerBuild(settings, context);
    });

// Command: .\build.ps1 -target "Build Application Execution Image" -script "image.cake"
Task("Build Application Execution Image")
    .Does(() => {
        var tags = new [] {
            "aurokk/run"
        };

        var settings = new DockerBuildSettings {
            File = "../images/Dockerfile.Run",
            ForceRm = true,
            Tag = tags
        };

        var context = "..";

        DockerBuild(settings, context);
    });

// Command: .\build.ps1 -script "image.cake"
Task("Build Application Image")
    .Does(() => {
        var tags = new [] {
            "aurokk/app"
        };

        var settings = new DockerBuildSettings {
            File = "../images/Dockerfile.App",
            ForceRm = true,
            Tag = tags,
            NoCache = true
        };

        var context = "..";

        DockerBuild(settings, context);
    });

//////////////////////////////////////////////////////////////////////
// TASK TARGETS
//////////////////////////////////////////////////////////////////////

Task("Default")
    .IsDependentOn("Build Application Image");

//////////////////////////////////////////////////////////////////////
// EXECUTION
//////////////////////////////////////////////////////////////////////

RunTarget(target);