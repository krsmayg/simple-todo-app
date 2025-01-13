using Microsoft.EntityFrameworkCore;
using todo_api.Models;
namespace todo_api.Data
{
    public class ApiContext: DbContext
    {
        public DbSet<Todo>Todos { get; set; }


        public ApiContext(DbContextOptions<ApiContext> options) :base(options){ 
        
        }

    }
}
 