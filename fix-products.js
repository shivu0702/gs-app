const mysql = require("mysql2/promise");

async function fix() {
  const c = await mysql.createConnection({
    host: "sql.freedb.tech",
    user: "freedb_freedb_myuser",
    password: "v#E!yUZWqHcaF37",
    database: "freedb_myapp_db",
    port: 3306,
  });

  await c.execute("DELETE FROM products");

  await c.execute(
    `INSERT INTO products (name, price, image) VALUES 
      ('Laptop', 45999.00, 'laptop.jpg'),
      ('Headphones', 1999.00, 'headphones.jpg'),
      ('Phone', 29999.00, 'phone.jpg'),
      ('Camera', 34999.00, 'camera.jpg'),
      ('Smartwatch', 8999.00, 'smartwatch.jpg'),
      ('Speaker', 4999.00, 'speaker.jpg')`
  );

  const [rows] = await c.execute("SELECT * FROM products");
  console.log("Products now:", rows);
  process.exit(0);
}

fix();
