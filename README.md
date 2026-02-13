CLIENT (Next.js / Mobile)
        │
        ▼
   API Gateway (Nginx)
        │
 ┌────────────┬────────────┬───────────┬──────────┬─────────────┐
 ▼            ▼            ▼           ▼          ▼
Auth      Product        Cart        Order    Notification
(Spring)  (Node.js)      (.NET)      (Node)    (Node.js)
 │           │             │           │          │
 ▼           ▼             ▼           ▼          ▼
MySQL     MongoDB       PostgreSQL  PostgreSQL   Redis


Project Structure

creative-microservices/
│
├── api-gateway/
├── auth-service/
├── product-service/
├── cart-service/
├── order-service/
├── notification-service/
├── docker-compose.yml
└── README.md


