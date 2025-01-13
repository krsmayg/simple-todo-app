using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_api.Models;
using todo_api.Data;

namespace todo_api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ApiContext _context;
        public TodoController(ApiContext context) { 
            _context = context;
        }


        [HttpGet("/GetAll")]
        public JsonResult GetAll() { 
            var res = _context.Todos.ToList();

            return new JsonResult(Ok(res));
        }

        [HttpPost]
        public JsonResult CreateEdit(Todo newTodo)
        {
            if (newTodo.Id == 0)
            {
                _context.Todos.Add(newTodo);
            }
            else {
                var todoInDb = _context.Todos.Find(newTodo.Id);
                if (todoInDb == null)
                {
                    return new JsonResult(NotFound());
                }
                _context.Entry(todoInDb).CurrentValues.SetValues(newTodo);
            }
            _context.SaveChanges(); 
            return new JsonResult(Ok(newTodo)); 
        }

        [HttpDelete]
        public JsonResult Delete(int id)
        {
            var todoInDb = _context.Todos.Find(id);
            if (todoInDb == null)
            {
                return new JsonResult(NotFound());
            }
            _context.Todos.Remove(todoInDb);
            _context.SaveChanges();
            return new JsonResult(NoContent());
        }

    }
}
