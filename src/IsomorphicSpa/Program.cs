using System;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Serilog;
using Serilog.Events;

namespace IsomorphicSpa
{
    public class Program
    {
        public static int Main(string[] args)
        {
            ConfigureLogger();

            try {
                Log.Information("Starting web host...");
                BuildWebHost(args).Run();
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Web host terminated unexpectedly...");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static void ConfigureLogger() {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();
        }

        public static IWebHost BuildWebHost(string[] args) {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .UseSerilog()
                .Build();

            return host;
        }
    }
}