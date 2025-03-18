using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using TransactionsApp.Server.Models;

namespace TransactionsApp.Server.Data
{
    public class TransactionRepository
    {
        private readonly string _connectionString;

        public TransactionRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuration), "Database connection string cannot be null");
        }

        private IDbConnection CreateConnection() => new MySqlConnection(_connectionString);

        public async Task<IEnumerable<Transaction>> GetAllTransactions()
        {
            using var connection = CreateConnection();
            var sql = "SELECT TransactionID, AccountID, TransactionAmount, TransactionCurrencyCode, " +
                      "COALESCE(LocalHour, '2000-01-01 00:00:00') AS LocalHour, " + 
                      "TransactionScenario, TransactionType FROM transactions";

            return await connection.QueryAsync<Transaction>(sql);
        }

        public async Task<Transaction?> GetTransactionById(int id)
        {
            using var connection = CreateConnection();
            return await connection.QueryFirstOrDefaultAsync<Transaction>(
                "SELECT * FROM transactions WHERE TransactionID = @id",
                new { id });
        }

        public async Task<int> AddTransaction(Transaction transaction)
        {
            using var connection = CreateConnection();
            string query = @"
                INSERT INTO transactions (
                    AccountID, TransactionAmount, TransactionCurrencyCode, LocalHour, TransactionScenario,
                    TransactionType, TransactionIPaddress, IpState, IpPostalCode, IpCountry, IsProxyIP,
                    BrowserLanguage, PaymentInstrumentType, CardType, PaymentBillingPostalCode, PaymentBillingState,
                    PaymentBillingCountryCode, ShippingPostalCode, ShippingState, ShippingCountry,
                    CvvVerifyResult, DigitalItemCount, PhysicalItemCount, TransactionDateTime)
                VALUES (
                    @AccountID, @TransactionAmount, @TransactionCurrencyCode, @LocalHour, @TransactionScenario,
                    @TransactionType, @TransactionIPaddress, @IpState, @IpPostalCode, @IpCountry, @IsProxyIP,
                    @BrowserLanguage, @PaymentInstrumentType, @CardType, @PaymentBillingPostalCode, @PaymentBillingState,
                    @PaymentBillingCountryCode, @ShippingPostalCode, @ShippingState, @ShippingCountry,
                    @CvvVerifyResult, @DigitalItemCount, @PhysicalItemCount, @TransactionDateTime);
                SELECT LAST_INSERT_ID();";

            return await connection.ExecuteScalarAsync<int>(query, transaction);
        }

        public async Task<bool> UpdateTransaction(int id, Transaction transaction)
        {
            using var connection = CreateConnection();
            string query = @"
                UPDATE transactions SET
                    AccountID = @AccountID, TransactionAmount = @TransactionAmount,
                    TransactionCurrencyCode = @TransactionCurrencyCode, LocalHour = @LocalHour,
                    TransactionScenario = @TransactionScenario, TransactionType = @TransactionType,
                    TransactionIPaddress = @TransactionIPaddress, IpState = @IpState, IpPostalCode = @IpPostalCode,
                    IpCountry = @IpCountry, IsProxyIP = @IsProxyIP, BrowserLanguage = @BrowserLanguage,
                    PaymentInstrumentType = @PaymentInstrumentType, CardType = @CardType,
                    PaymentBillingPostalCode = @PaymentBillingPostalCode, PaymentBillingState = @PaymentBillingState,
                    PaymentBillingCountryCode = @PaymentBillingCountryCode, ShippingPostalCode = @ShippingPostalCode,
                    ShippingState = @ShippingState, ShippingCountry = @ShippingCountry,
                    CvvVerifyResult = @CvvVerifyResult, DigitalItemCount = @DigitalItemCount,
                    PhysicalItemCount = @PhysicalItemCount, TransactionDateTime = @TransactionDateTime
                WHERE TransactionID = @TransactionID";

            transaction.TransactionID = id;
            int rowsAffected = await connection.ExecuteAsync(query, transaction);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteTransaction(int id)
        {
            using var connection = CreateConnection();
            int rowsAffected = await connection.ExecuteAsync(
                "DELETE FROM transactions WHERE TransactionID = @id", new { id });
            return rowsAffected > 0;
        }
    }
}
