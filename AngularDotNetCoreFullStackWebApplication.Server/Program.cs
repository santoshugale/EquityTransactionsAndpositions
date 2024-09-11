using AngularDotNetCoreFullStackWebApplication.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalhostAngularApp",
                              policy =>
                              {
                                  //policy.WithOrigins("http://localhost:4200/",
                                  //                    "https://localhost:4200/")
                                  // TODO - Add the required origin, method and header
                                  policy.AllowAnyOrigin()
                                  .AllowAnyHeader()
                                  .AllowAnyMethod();
                              });
        });

        // Add services to the container.
        // TODO - to use sql lite or sql server

        builder.Services.AddControllers();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add database context
        builder.Services.AddDbContext<TransactionContext>((options) =>
        {
            options.UseInMemoryDatabase("Equity");
        });
        builder.Services.AddDbContext<PositionsContext>((options) =>
        {
            options.UseInMemoryDatabase("Equity");
        });

        // use sql server database 
        // builder.Services.AddDbContext<TransactionContext>((options) =>
        // {
        //     options.UseSqlServer(builder.Configuration.GetConnectionString("EquityInvestment"));
        // });
        // builder.Services.AddDbContext<PositionsContext>((options) =>
        // {
        //     options.UseSqlServer(builder.Configuration.GetConnectionString("EquityInvestment"));
        // });


        var app = builder.Build();

        app.UseDefaultFiles();
        app.UseStaticFiles();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors("AllowLocalhostAngularApp");

        app.UseAuthorization();

        app.MapControllers();

        app.MapFallbackToFile("/index.html");

        app.Run();
    }
}