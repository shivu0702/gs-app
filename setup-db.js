const mysql = require("mysql2/promise");

async function setup() {
  try {
    const connection = await mysql.createConnection({
      host: "sql.freedb.tech",
      user: "freedb_freedb_myuser",
      password: "v#E!yUZWqHcaF37",
      database: "freedb_myapp_db",
      port: 3306,
    });

    console.log("Setting up database 'freedb_myapp_db'...");
    
    await connection.query("USE freedb_myapp_db");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(255) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);

    const [rows] = await connection.query("SELECT * FROM products");
    if (rows.length === 0) {
      console.log("Inserting dummy products...");
      await connection.query(`
        INSERT INTO products (name, price, image) VALUES 
        ('Premium T-Shirt', 499.00, 'tshirt.jpg'),
        ('Denim Jeans', 1299.00, 'jeans.jpg'),
        ('Sneakers', 1999.00, 'sneaker.jpg')
      `);
    }

    console.log("✅ Database setup complete!");
    process.exit(0);
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

setup();
