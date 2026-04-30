1. Database Schema (SQLITE3 via TypeORM)
Define a Post entity with the following fields:

id: Primary Key (UUID).

title: String.

slug: String (Unique, for SEO-friendly URLs).

author: String.

summary: Text (Short excerpt for the feed).

content: LongText (To store the Base64/HTML string).

thumbnail: LongText (Base64 WebP).

createdAt: Timestamp.

2. Public Endpoints (Read-Only)
GET /posts: Returns an array of posts. Use a Projection to exclude the content field. This keeps the feed light.

Fields: id, title, slug, author, thumbnail, summary, createdAt.

GET /posts/:slug: Returns the full post object including the content field for the individual post view.

3. Administrative Endpoints (Protected)
POST /posts: Create a new post.

PUT /posts/:id: Update an existing post.

DELETE /posts/:id: Remove a post.