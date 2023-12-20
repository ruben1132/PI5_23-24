const sql = require('mssql');

// Configuration for the source SQL Server connection
const sourceConfig = {
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

async function copyAllTablesFromSourceToDestination() {
    try {
      // Create SQL Server pools for both source and destination databases
      const sourcePool = await sql.connect(sourceConfig);
      const destPool = await sql.connect(destConfig);
  
      // Query to get a list of tables in the source database
      const tableQuery = `
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME != 'dbo.__EFMigrationsHistory'
      `;
  
      // Retrieve list of tables from the source database
      const tablesResult = await sourcePool.request().query(tableQuery);
      const tables = tablesResult.recordset;
  
      // Iterate through tables and copy data to the destination
      for (const table of tables) {
        const tableName = table.TABLE_NAME;
  
        // Check if the table exists in the destination database
        const tableExistsResult = await destPool.request()
          .query(`SELECT COUNT(*) AS tableCount FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`);
  
        const tableExists = tableExistsResult.recordset[0].tableCount > 0;
  
        // If the table doesn't exist on the destination, create it
        if (!tableExists) {
          const createTableQuery = await sourcePool.request()
            .query(`SELECT * INTO ${tableName} FROM ${sourceConfig.database}.dbo.${tableName}`);
  
          console.log(`Table ${tableName} created on the destination.`);
        }
  
        // Query to select all data from the current table in the source database
        const selectQuery = `SELECT * FROM ${tableName}`;
  
        // Retrieve data from the source table
        const result = await sourcePool.request().query(selectQuery);
        const data = result.recordset;
  
        // Insert data into the corresponding table in the destination database
        for (const row of data) {
          const columns = Object.keys(row).join(', ');
          const values = Object.values(row).map(val => `'${val}'`).join(', ');
          const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
          await destPool.request().query(insertQuery);
        }
  
        console.log(`Data copied from ${tableName} in source to ${tableName} in destination.`);
      }
  
      console.log('Data migration completed.');
    } catch (err) {
      console.error('Error:', err.message);
    } finally {
      // Close the source and destination SQL Server connections
      sql.close();
    }
  }
  
  copyAllTablesFromSourceToDestination();