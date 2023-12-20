const sql = require('mssql');
const fs = require('fs');

// Configuration for SQL Server connection
const config = {
  user: 'sa',
  password: '+PT+Lete2Q==Xm0a5',
  server: 'vsgate-s1.dei.isep.ipp.pt',
  database: 'mptdb',
  port: 11179, // Replace with your specific port number
  options: {
    encrypt: true, // For Azure users
    trustServerCertificate: true, // For self-signed certificates
  },
};

(async () => {
  try {
    // Create a SQL Server pool
    const pool = await sql.connect(config);

    // Get the list of tables in the database
    const tableQuery = `
      SELECT table_name
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
    `;
    const tablesResult = await pool.request().query(tableQuery);

    // Iterate through each table and export data to a CSV file
    for (const table of tablesResult.recordset) {
      const tableName = table.table_name;

      // Query to select data from a specific table
      const selectQuery = `SELECT * FROM ${tableName}`;
      const tableResult = await pool.request().query(selectQuery);

      // Convert table data to CSV format
      const csvData = tableResult.recordset.map((row) =>
        Object.values(row).join(',')
      );
      const csvContent = csvData.join('\n');

      // Write table data to a CSV file
      fs.writeFileSync(`${tableName}.csv`, csvContent);
      console.log(`Exported ${tableName}.csv`);
    }

    console.log('Export completed.');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    // Close the SQL Server connection
    sql.close();
  }
})();
