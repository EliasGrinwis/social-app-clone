require("dotenv").config();

console.log("Postgres URL:", process.env.POSTGRES_URL);

const {db} = require("@vercel/postgres");
const {posts} = require("../lib/placeholder-data");

async function seedPosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "posts" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS posts (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description VARCHAR(255) NOT NULL,
          likes INT DEFAULT 0,
          image TEXT,
          created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          userName VARCHAR(255) NOT NULL,
          userImage VARCHAR(255) NOT NULL,
          userEmail VARCHAR(255) NOT NULL,
        );
      `;

    console.log(`Created "posts" table`);

    // Insert data into the "posts" table
    const insertedPosts = await Promise.all(
      posts.map(async (post) => {
        return client.sql`
            INSERT INTO posts (id, title, description, likes, image, created, updated, userName, userImage, userEmail)
            VALUES (${post.id}, ${post.title}, ${post.description}, ${post.likes}, ${post.image}, ${post.created}, ${post.updated}, ${post.userName}, ${post.userImage} ${post.userEmail})
            ON CONFLICT (id) DO NOTHING;
          `;
      })
    );

    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
      createTable,
      users: insertedPosts,
    };
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedPosts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
