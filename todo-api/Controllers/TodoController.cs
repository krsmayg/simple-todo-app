using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_api.Models;
using todo_api.Data;

namespace todo_api.Controllers
{
    [Route("api/todos/")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ApiContext _context;
        public TodoController(ApiContext context) { 
            _context = context;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Todo>> GetAll() { 
            var res = _context.Todos.ToList();

            return Ok(res);
        }

        [HttpPost]
        public ActionResult<Todo> CreateEdit([FromBody] Todo newTodo)
        {
            if (newTodo.Id == 0)
            {
                _context.Todos.Add(newTodo);
            }
            else {
                var todoInDb = _context.Todos.Find(newTodo.Id);
                if (todoInDb == null)
                {
                    return NotFound();
                }
                _context.Entry(todoInDb).CurrentValues.SetValues(newTodo);
            }
            _context.SaveChanges(); 
            return Ok(newTodo); 
        }

        [HttpDelete]
        public ActionResult<Todo> Delete(int id)
        {
            var todoInDb = _context.Todos.Find(id);
            if (todoInDb == null)
            {
                return NotFound();
            }
            _context.Todos.Remove(todoInDb);
            _context.SaveChanges();
            return NoContent();
        }

    }
}
