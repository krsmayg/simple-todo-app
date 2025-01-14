using Microsoft.EntityFrameworkCore;
using todo_api.Data;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//builder.Services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("ToDoDb")); //for test

builder.Services.AddDbContext<ApiContext>(opt => opt.UseSqlServer("Server=LAPTOP-V38UPEKT\\SQLEXPRESS;Database=ToDoDB;Trusted_Connection=True;TrustServerCertificate=true;"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy => policy.WithOrigins("http://localhost:5173")
                         .AllowAnyMethod()
                         .AllowAnyHeader());
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowLocalhost");

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
