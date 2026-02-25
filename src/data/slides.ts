export interface SlideKeyPoint {
  label: string;
  value: string;
}

export interface SlideTech {
  name: string;
  color: string;
}

export interface Slide {
  id: number;
  title: string;
  summary: string;
  color: string;
  icon: string;
  deepDive: string;
  aiInsight: string;
  chatSuggestions: string[];
  // Rich content fields
  subtitle: string;
  description: string;
  keyPoints: string[];
  stats: SlideKeyPoint[];
  techStack: SlideTech[];
  imageUrl: string;
  diagramAlt: string;
  realWorldExample: string;
  codeSnippet?: string;
  codeLanguage?: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "Introduction to Backend",
    summary: "The engine room of the web",
    subtitle: "What powers every app you use",
    color: "#1d4ed8",
    icon: "Server",
    description: "The backend is the hidden engine of every app — it handles logic, databases, security, and APIs while users only see the frontend.",
    keyPoints: [
      "Handles business logic, data & security",
      "Communicates with databases via APIs",
      "Manages authentication & user permissions",
      "Scales to handle millions of requests",
    ],
    stats: [
      { label: "Languages", value: "10+" },
      { label: "Avg Response", value: "<200ms" },
      { label: "Uptime Goal", value: "99.99%" },
      { label: "Data Processed", value: "Petabytes/day" },
    ],
    techStack: [
      { name: "Node.js", color: "#16a34a" },
      { name: "Python", color: "#2563eb" },
      { name: "Java", color: "#dc2626" },
      { name: "Go", color: "#0891b2" },
      { name: "AWS", color: "#d97706" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?w=600&q=80",
    diagramAlt: "Backend architecture — client, server, and database layers",
    realWorldExample: "When you tap 'Order' on a food delivery app, the backend validates your payment, checks restaurant availability, assigns a driver, sends push notifications, and logs everything — all within 2 seconds.",
    deepDive: "The backend is the invisible powerhouse behind every web application. While users interact with the frontend, the backend handles all the heavy lifting: processing requests, managing databases, enforcing business logic, and ensuring security.\n\nA backend system typically consists of a server, an application layer, and a database. The server receives requests from clients, the application layer processes them using logic (written in languages like Node.js, Python, or Java), and the database stores and retrieves persistent data.\n\nModern backends are often designed as microservices — small, independently deployable components that each handle a specific function. This architecture improves scalability, fault tolerance, and development velocity.\n\nKey concepts include REST & GraphQL APIs, authentication & authorization, caching strategies (Redis, CDN), message queues (RabbitMQ, Kafka), and cloud infrastructure (AWS, GCP, Azure).",
    aiInsight: "The backend is like a restaurant kitchen — guests never see it, but it's where all the magic happens. Every button click triggers server logic, database queries, and a response — all in milliseconds.",
    chatSuggestions: ["What languages are used for backend?", "What is a REST API?", "How does backend differ from frontend?"],
  },
  {
    id: 2,
    title: "Server",
    summary: "High-power computers hosting apps",
    subtitle: "The muscle behind your applications",
    color: "#7c3aed",
    icon: "HardDrive",
    description: "A server is a computer that runs 24/7, listens for requests from users, and sends back the right response — data, files, or results.",
    keyPoints: [
      "Web Servers serve files — Nginx, Apache",
      "App Servers run logic — Node.js, Gunicorn",
      "Load Balancers spread traffic across servers",
      "Cloud servers (AWS, GCP) scale on demand",
    ],
    stats: [
      { label: "CPU Cores", value: "Up to 128" },
      { label: "RAM", value: "Up to 12TB" },
      { label: "Network", value: "100 Gbps" },
      { label: "Storage", value: "Petabytes" },
    ],
    techStack: [
      { name: "Nginx", color: "#16a34a" },
      { name: "Apache", color: "#dc2626" },
      { name: "Docker", color: "#2563eb" },
      { name: "Kubernetes", color: "#0891b2" },
      { name: "Linux", color: "#d97706" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80",
    diagramAlt: "Data center rack servers running 24/7",
    realWorldExample: "Netflix runs on over 100,000 servers across AWS, serving 250 million users. When you hit play, a server selects the nearest edge location, authenticates your account, and streams the video — all in under 3 seconds.",
    deepDive: "A server is a computer program or device that provides functionality for other programs or devices, called clients. This architecture is called the client-server model.\n\nPhysically, servers are high-performance machines with large amounts of RAM, fast multi-core processors, and redundant storage. They run 24/7 in temperature-controlled data centers with backup power and internet connectivity.\n\nTypes of servers include:\n• Web Servers – Serve HTML, CSS, JS files (Nginx, Apache)\n• Application Servers – Run business logic (Node.js, Tomcat)\n• Database Servers – Store and manage data (PostgreSQL, MySQL)\n• File Servers – Manage file storage (S3, FTP)\n• Mail Servers – Handle email (Postfix, Exchange)\n\nCloud computing has virtualized servers through VMs and containers (Docker/Kubernetes), allowing developers to spin up or scale servers on demand without owning physical hardware.",
    aiInsight: "A server is like a 24/7 post office — it waits for requests, processes them, and sends back the right response. Unlike your laptop, servers never sleep.",
    chatSuggestions: ["What is Nginx?", "Difference between server and cloud?", "How does Docker relate to servers?"],
  },
  {
    id: 3,
    title: "APIs",
    summary: "Bridges between software",
    subtitle: "The language apps use to talk to each other",
    color: "#059669",
    icon: "Zap",
    description: "An API is a contract between systems — it defines how apps talk to each other to exchange data in a structured, secure way.",
    keyPoints: [
      "REST: Uses HTTP verbs — GET, POST, PUT, DELETE",
      "GraphQL: Client asks for exactly what it needs",
      "Webhooks: Server calls your URL when events happen",
      "APIs are secured with keys, JWT tokens & HTTPS",
    ],
    stats: [
      { label: "APIs Worldwide", value: "24,000+" },
      { label: "Daily API Calls", value: "Trillions" },
      { label: "Avg Latency", value: "<100ms" },
      { label: "JSON Usage", value: "90%+" },
    ],
    techStack: [
      { name: "REST", color: "#059669" },
      { name: "GraphQL", color: "#e11d48" },
      { name: "gRPC", color: "#2563eb" },
      { name: "Swagger", color: "#16a34a" },
      { name: "Postman", color: "#d97706" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
    diagramAlt: "API endpoints connecting different applications and services",
    realWorldExample: "Google Maps API is called 25 million times per day by apps like Uber, Airbnb, and Snapchat. When you request a route in Uber, their app calls Google Maps API, payment API, driver-matching API, and push notification API — all in one tap.",
    codeSnippet: "GET /api/users/42\nAuthorization: Bearer eyJhbG...\n\n200 OK\n{\n  \"id\": 42,\n  \"name\": \"Sarah Ahmed\",\n  \"email\": \"sarah@example.com\"\n}",
    codeLanguage: "http",
    deepDive: "An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate. It defines the methods and data formats that programs can use to request and exchange information.\n\nREST (Representational State Transfer) is the most common API architecture. It uses HTTP methods:\n• GET – Retrieve data\n• POST – Create new data\n• PUT/PATCH – Update data\n• DELETE – Remove data\n\nGraphQL is an alternative that lets clients request exactly the data they need — nothing more, nothing less.\n\nAPIs are secured using API keys, OAuth 2.0 tokens, and JWT (JSON Web Tokens). Rate limiting prevents abuse.\n\nReal-world examples: When you log into a website using Google, it calls Google's OAuth API. When you see a weather widget, it fetches from a weather API. Payment processors like Stripe expose APIs for charging cards.",
    aiInsight: "An API is like a waiter — you tell it what you want, it goes to the kitchen (server), and brings back your data. You never deal with the kitchen directly.",
    chatSuggestions: ["What is REST vs GraphQL?", "How is an API secured?", "What is a webhook?"],
  },
  {
    id: 4,
    title: "Database",
    summary: "Digital filing cabinets",
    subtitle: "Where your app's memory lives",
    color: "#d97706",
    icon: "Database",
    description: "A database stores everything your app needs to remember — users, posts, orders — either in structured SQL tables or flexible NoSQL collections.",
    keyPoints: [
      "SQL (PostgreSQL, MySQL): Structured, great for relations",
      "NoSQL (MongoDB): Flexible schema, great for documents",
      "Redis: In-memory, ultra-fast caching (<1ms reads)",
      "Indexing speeds up queries by 100-1000x",
    ],
    stats: [
      { label: "SQL Tables", value: "Structured" },
      { label: "NoSQL Docs", value: "Flexible" },
      { label: "Redis Speed", value: "<1ms" },
      { label: "Postgres Scale", value: "Billions rows" },
    ],
    techStack: [
      { name: "PostgreSQL", color: "#2563eb" },
      { name: "MongoDB", color: "#16a34a" },
      { name: "Redis", color: "#dc2626" },
      { name: "MySQL", color: "#d97706" },
      { name: "Prisma ORM", color: "#7c3aed" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    diagramAlt: "Database tables and structured data storage visualization",
    realWorldExample: "Instagram's database handles 500 million daily active users, 100M+ photos uploaded per day. They use PostgreSQL for user data, Cassandra for activity feeds, Redis for caching hot posts, and S3 for photo storage.",
    codeSnippet: "SELECT u.name, COUNT(o.id) as orders\nFROM users u\nJOIN orders o ON u.id = o.user_id\nWHERE u.created_at > '2025-01-01'\nGROUP BY u.name\nORDER BY orders DESC\nLIMIT 10;",
    codeLanguage: "sql",
    deepDive: "A database is an organized collection of structured information or data, stored and accessed electronically. Databases are managed by Database Management Systems (DBMS).\n\nRelational Databases (SQL) store data in tables with rows and columns. They use SQL for queries. Examples: PostgreSQL, MySQL, SQLite. They enforce ACID properties: Atomicity, Consistency, Isolation, Durability.\n\nNon-Relational Databases (NoSQL) store data in flexible formats:\n• Document stores (MongoDB) – JSON-like documents\n• Key-Value stores (Redis) – Ultra-fast lookups\n• Column stores (Cassandra) – Optimized for analytics\n• Graph databases (Neo4j) – Relationship mapping\n\nDatabase optimization involves indexing, query optimization, connection pooling, and sharding (distributing data across multiple servers) for horizontal scaling.\n\nORMs like Prisma, Sequelize, and TypeORM let developers interact with databases using their programming language instead of raw SQL.",
    aiInsight: "A database is like a filing cabinet — SQL is very organized like a spreadsheet, NoSQL is flexible like folders where anything can go in any shape.",
    chatSuggestions: ["SQL vs NoSQL — when to use which?", "What is database indexing?", "What is an ORM?"],
  },
  {
    id: 5,
    title: "Authentication",
    summary: "Locks and keys for data",
    subtitle: "Proving who you are — and what you can access",
    color: "#dc2626",
    icon: "Lock",
    description: "Authentication checks who you are; Authorization checks what you can do — together they protect every user's data and account.",
    keyPoints: [
      "Passwords hashed with bcrypt — never stored as plain text",
      "JWT: Signed token carries user identity, no DB lookup needed",
      "OAuth 2.0: 'Login with Google' — delegate auth to a provider",
      "MFA blocks 99.9% of automated attacks",
    ],
    stats: [
      { label: "Breaches/Year", value: "5B+ records" },
      { label: "JWT Expiry", value: "15-60 min" },
      { label: "bcrypt Rounds", value: "10-12" },
      { label: "MFA Reduction", value: "99.9% attacks" },
    ],
    techStack: [
      { name: "JWT", color: "#d97706" },
      { name: "OAuth 2.0", color: "#2563eb" },
      { name: "Auth0", color: "#dc2626" },
      { name: "bcrypt", color: "#7c3aed" },
      { name: "Supabase", color: "#16a34a" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80",
    diagramAlt: "Digital security lock protecting user authentication and data",
    realWorldExample: "When you log into GitHub with Google (OAuth), GitHub never sees your Google password. Google authenticates you, issues a token, and GitHub uses that token to identify you. Your password stays safe with Google.",
    codeSnippet: "// Verify JWT token middleware\nconst verifyToken = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Unauthorized' });\n  \n  const decoded = jwt.verify(token, process.env.JWT_SECRET);\n  req.user = decoded;\n  next();\n};",
    codeLanguage: "javascript",
    deepDive: "Authentication is the process of verifying who someone is. Authorization is determining what they are allowed to do. These two concepts are the foundation of application security.\n\nAuthentication methods:\n• Username/Password – Traditional, requires hashing (bcrypt, Argon2)\n• OAuth 2.0 – Delegated authorization (Login with Google)\n• JWT (JSON Web Tokens) – Stateless tokens containing user claims\n• Session Cookies – Server-side sessions mapped to a session ID\n• MFA – Multi-Factor Authentication adds a second layer\n• Biometrics – Fingerprint, Face ID\n\nSecurity best practices:\n• Never store plain-text passwords\n• Use HTTPS everywhere (TLS/SSL)\n• Implement rate limiting and account lockouts\n• Use CORS policies to restrict API access\n• Sanitize all inputs to prevent SQL injection and XSS\n• Store secrets in environment variables, never in code\n\nModern auth is often handled by services like Auth0, Firebase Auth, or Supabase.",
    aiInsight: "Auth is like a club bouncer — they check your ID (credentials) to let you in. Authorization is the VIP list — even inside, not everyone can access every area.",
    chatSuggestions: ["What is JWT?", "OAuth vs session auth?", "How to store passwords safely?"],
  },
  {
    id: 6,
    title: "Node.js / Express",
    summary: "Tools to build the logic",
    subtitle: "JavaScript's takeover of the server side",
    color: "#16a34a",
    icon: "Code2",
    description: "Node.js runs JavaScript on the server and handles thousands of requests at once. Express is the lightweight framework built on top of it for building APIs.",
    keyPoints: [
      "Event Loop: Single-threaded, handles thousands of async tasks",
      "npm: 2.5M+ packages — world's largest code ecosystem",
      "Express: Minimal framework for routing & middleware",
      "Async/Await: Clean non-blocking code without callbacks",
    ],
    stats: [
      { label: "npm Packages", value: "2.5M+" },
      { label: "Weekly Downloads", value: "50M+" },
      { label: "Companies Using", value: "LinkedIn, Netflix" },
      { label: "Req/sec", value: "50,000+" },
    ],
    techStack: [
      { name: "Node.js", color: "#16a34a" },
      { name: "Express", color: "#374151" },
      { name: "NestJS", color: "#dc2626" },
      { name: "Fastify", color: "#d97706" },
      { name: "TypeScript", color: "#2563eb" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&q=80",
    diagramAlt: "Node.js JavaScript code running in a terminal editor",
    realWorldExample: "LinkedIn migrated their mobile servers from Ruby to Node.js in 2012 — their server count dropped from 30 to 3, while handling 2x the traffic. Walmart saw 98% cost reduction in hardware during Black Friday using Node.js.",
    codeSnippet: "const express = require('express');\nconst app = express();\n\n// Middleware\napp.use(express.json());\napp.use(authMiddleware);\n\n// Route\napp.get('/api/users/:id', async (req, res) => {\n  const user = await User.findById(req.params.id);\n  res.json(user);\n});\n\napp.listen(3000, () => console.log('Server running'));",
    codeLanguage: "javascript",
    deepDive: "Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows JavaScript — traditionally a browser-only language — to run on the server side. It uses an event-driven, non-blocking I/O model that makes it highly efficient for I/O-heavy applications.\n\nWhy Node.js?\n• Same language (JavaScript) for frontend and backend\n• Massive ecosystem (npm has 2M+ packages)\n• Excellent for real-time apps (chat, notifications)\n• Fast for I/O-heavy, not CPU-heavy workloads\n\nExpress.js is a minimal, unopinionated web framework for Node.js. It provides routing, middleware, and request/response handling with very little boilerplate.\n\nModern alternatives include Fastify (faster), NestJS (structured, TypeScript-first), and Hono (edge-ready). For Python: Django, FastAPI. For Java: Spring Boot.",
    aiInsight: "Node.js is like one efficient waiter handling 1000 tables — while one table's food is cooking, they take another order. Express is their notepad that keeps everything organized.",
    chatSuggestions: ["What is middleware in Express?", "Node.js vs Python for backend?", "What is npm?"],
  },
  {
    id: 7,
    title: "Request-Response Cycle",
    summary: "The internet's order & delivery cycle",
    subtitle: "The 8-step journey of every web request",
    color: "#0891b2",
    icon: "ArrowLeftRight",
    description: "Every web interaction — clicking a button, loading a page — follows the same cycle: browser sends a request, server processes it, and sends back a response.",
    keyPoints: [
      "DNS lookup converts domain name to an IP address",
      "TCP + TLS handshake establishes a secure connection",
      "Browser sends HTTP request with method, headers & body",
      "Server responds with a status code + data",
    ],
    stats: [
      { label: "HTTP/2 Speed", value: "2-3x faster" },
      { label: "DNS TTL", value: "300s typical" },
      { label: "TTFB Goal", value: "<200ms" },
      { label: "Status Codes", value: "60+ defined" },
    ],
    techStack: [
      { name: "HTTP/2", color: "#0891b2" },
      { name: "TLS 1.3", color: "#16a34a" },
      { name: "DNS", color: "#d97706" },
      { name: "TCP/IP", color: "#7c3aed" },
      { name: "QUIC", color: "#dc2626" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    diagramAlt: "HTTP request and response flowing through a network",
    realWorldExample: "When you Google something, your browser performs a DNS lookup (~10ms), TCP+TLS handshake (~50ms), sends the HTTP request, Google's servers search their index across thousands of machines, and return results — all in under 200ms.",
    deepDive: "The HTTP Request-Response cycle is the fundamental communication pattern of the web. Every interaction — loading a page, submitting a form, fetching data — follows this cycle.\n\nThe cycle step by step:\n1. DNS Lookup – Browser converts domain name to IP address\n2. TCP Handshake – Client and server establish a connection\n3. TLS Handshake – Encrypted tunnel is established (HTTPS)\n4. HTTP Request – Client sends request with method, headers, body\n5. Server Processing – App receives request, runs logic, queries DB\n6. HTTP Response – Server sends back status code, headers, body\n7. Rendering – Browser parses HTML/CSS/JS and renders the page\n8. Connection Close/Keep-Alive – Connection is closed or reused\n\nHTTP Status Codes:\n• 2xx – Success (200 OK, 201 Created)\n• 3xx – Redirect (301 Moved, 304 Not Modified)\n• 4xx – Client Error (400 Bad Request, 401 Unauthorized, 404 Not Found)\n• 5xx – Server Error (500 Internal Server Error, 503 Service Unavailable)\n\nHTTP/2 and HTTP/3 improve performance with multiplexing and the QUIC protocol.",
    aiInsight: "The request-response cycle is like a drive-through — you place your order (request), the kitchen processes it (server logic), and hands you the bag (response). Status 200 means ready, 404 means we don't have that.",
    chatSuggestions: ["What is DNS?", "What are HTTP headers?", "How does HTTPS work?"],
  },
  {
    id: 8,
    title: "Real-Time Systems",
    summary: "Live, instant communication like WebSockets",
    subtitle: "When milliseconds matter — bidirectional live data",
    color: "#9333ea",
    icon: "Radio",
    description: "Real-time systems let the server push data to users instantly — no waiting, no refreshing — powering live chat, notifications, and multiplayer apps.",
    keyPoints: [
      "WebSockets: Persistent connection — server & client talk anytime",
      "Socket.IO: WebSockets with rooms, fallbacks & auto-reconnect",
      "SSE: One-way server push, good for live feeds & notifications",
      "Redis Pub/Sub: Syncs real-time messages across multiple servers",
    ],
    stats: [
      { label: "WS Latency", value: "<10ms" },
      { label: "Slack Messages", value: "1B+/day" },
      { label: "WebRTC Users", value: "Billions" },
      { label: "Kafka Speed", value: "1M msg/sec" },
    ],
    techStack: [
      { name: "Socket.IO", color: "#9333ea" },
      { name: "WebRTC", color: "#0891b2" },
      { name: "Redis Pub/Sub", color: "#dc2626" },
      { name: "Kafka", color: "#d97706" },
      { name: "MQTT", color: "#16a34a" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80",
    diagramAlt: "Real-time chat and live communication via WebSockets",
    realWorldExample: "Figma's multiplayer design tool uses WebSockets to sync cursor positions, selections, and edits across thousands of collaborators in real time. When you move your cursor, everyone else sees it within 50ms.",
    codeSnippet: "// WebSocket server with Socket.IO\nio.on('connection', (socket) => {\n  console.log('User connected:', socket.id);\n  \n  socket.on('send-message', (data) => {\n    // Broadcast to everyone in the room\n    io.to(data.room).emit('new-message', {\n      user: data.user,\n      text: data.text,\n      time: new Date()\n    });\n  });\n  \n  socket.on('disconnect', () => {\n    io.emit('user-left', socket.id);\n  });\n});",
    codeLanguage: "javascript",
    deepDive: "Real-time systems enable instantaneous, bidirectional communication between clients and servers — without the client needing to repeatedly ask 'any updates?' (polling).\n\nWebSockets establish a persistent, full-duplex connection over a single TCP connection. Once opened, both the client and server can push messages at any time.\n\nUse cases:\n• Live chat applications (WhatsApp Web, Slack)\n• Collaborative editing (Google Docs)\n• Live sports scores and stock tickers\n• Multiplayer games\n• Real-time notifications\n• Live dashboards and monitoring\n\nTechnologies:\n• Socket.IO – Popular Node.js WebSocket library with fallbacks\n• Server-Sent Events (SSE) – One-way server to client stream\n• WebRTC – Peer-to-peer real-time (video calls, Zoom)\n• MQTT – Lightweight protocol for IoT devices\n• Apache Kafka – High-throughput event streaming\n\nScaling real-time: Multiple server instances need shared state. Redis Pub/Sub or message brokers coordinate WebSocket messages across servers.",
    aiInsight: "Regular HTTP is like sending letters — you write and wait for a reply. WebSockets are like a phone call — once connected, both sides can talk instantly without hanging up.",
    chatSuggestions: ["WebSockets vs HTTP polling?", "How does Socket.IO work?", "What is WebRTC?"],
  },
];
