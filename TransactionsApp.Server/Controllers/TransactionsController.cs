using Microsoft.AspNetCore.Mvc;
using TransactionsApp.Server.Data;
using TransactionsApp.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TransactionsApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionRepository _repository;

        public TransactionsController(TransactionRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetAllTransactions()
        {
            return Ok(await _repository.GetAllTransactions());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransactionById(int id)
        {
            var transaction = await _repository.GetTransactionById(id);
            if (transaction == null) return NotFound();
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<ActionResult<int>> AddTransaction(Transaction transaction)
        {
            var newId = await _repository.AddTransaction(transaction);
            return CreatedAtAction(nameof(GetTransactionById), new { id = newId }, transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction transaction)
        {
            var updated = await _repository.UpdateTransaction(id, transaction);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var deleted = await _repository.DeleteTransaction(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
