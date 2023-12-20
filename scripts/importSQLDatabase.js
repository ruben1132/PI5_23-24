const sql = require('mssql');
const fs = require('fs');
const path = require('path');

// Configuration for the destination SQL Server connection
const destConfig = {
    user: 'sa',
    password: 'NWlBZOjXLA==Xm0a5',
    server: 'vsgate-s1.dei.isep.ipp.pt',
    database: 'mptdb',
    port: 11264, // Replace with your specific port number
    options: {
      encrypt: true, // For Azure users
      trustServerCertificate: true, // For self-signed certificates
    },
};

async function importCSVFiles() {
  try {
    // Create a SQL Server pool for the destination database
    const destPool = await sql.connect(destConfig);

    // Get the directory path where the script is located
    const scriptDir = path.dirname(__filename);

    // Get a list of files in the directory
    const files = fs.readdirSync(scriptDir);

    // Iterate through each CSV file for import
    for (const file of files) {
      if (path.extname(file) === '.csv') {
        const tableName = path.basename(file, '.csv'); // Use the filename (without extension) as the table name

        // Read the CSV file
        const csvData = fs.readFileSync(path.join(scriptDir, file), 'utf8');

        // Split the CSV data into rows
        const rows = csvData.split('\n');

        // Get column names from the first row
        const columns = rows[0].split(',');

        // Create a table in the destination database
        const tableCreationQuery = `CREATE TABLE ${tableName} (${columns.map(column => `[${column.trim()}] NVARCHAR(MAX)`).join(', ')});`;
        await destPool.request().query(tableCreationQuery);

        // Insert data into the newly created table
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',');
          const insertQuery = `INSERT INTO ${tableName} (${columns.map(column => `[${column.trim()}]`).join(', ')}) VALUES (${values.map(value => `'${value.trim()}'`).join(', ')});`;
          await destPool.request().query(insertQuery);
        }

        console.log(`Imported ${file} into ${tableName}`);
      }
    }

    console.log('Import process completed.');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    // Close the destination SQL Server connection
    sql.close();
  }
}

importCSVFiles();
