const Database = require('better-sqlite3');
const crypto = require('crypto');

const db = new Database('data/etr_blog.sqlite');
const programs = [
  { title: "Reading hubs", desc: "Community spaces fostering a culture of reading and collaborative learning.", impactLabel: "Hubs Established" },
  { title: "Reading camps", desc: "Intensive, fun-filled camps designed to improve literacy skills during holidays.", impactLabel: "Students Attended" },
  { title: "Reading competitions", desc: "Engaging contests to motivate students and reward reading excellence.", impactLabel: "Participants" },
  { title: "Donation of supplementary reading materials", desc: "Providing essential books and learning materials to under-resourced schools.", impactLabel: "Books Donated" }
];

const insert = db.prepare(`INSERT INTO programs (id, title, description, milestone, image, impactNumber, impactLabel, about, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`);

for (const p of programs) {
  insert.run(crypto.randomUUID(), p.title, p.desc, 'Planning', '', 0, p.impactLabel, p.desc);
}
console.log('Inserted programs successfully.');
