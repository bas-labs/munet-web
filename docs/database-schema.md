# MUNET Database Schema

## DynamoDB Tables

### Table: munet-orders

Primary table for storing ticket orders.

#### Key Schema

| Attribute | Key Type | Type | Description |
|-----------|----------|------|-------------|
| orderId | HASH (PK) | String | UUID v4 generated at checkout |

#### Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | String | Yes | Unique order identifier (UUID v4) |
| date | String | Yes | Visit date (YYYY-MM-DD format) |
| tickets | List | Yes | Array of ticket objects |
| totalAmount | Number | Yes | Total amount in MXN centavos |
| customerEmail | String | Yes | Customer email address |
| stripeSessionId | String | Yes | Stripe Checkout Session ID |
| stripePaymentIntent | String | No | Stripe Payment Intent ID (set on completion) |
| status | String | Yes | Order status (see below) |
| createdAt | String | Yes | ISO 8601 timestamp |
| completedAt | String | No | ISO 8601 timestamp (when payment completed) |
| expiredAt | String | No | ISO 8601 timestamp (if session expired) |
| qrCode | String | No | Access code for museum entry (generated on completion) |

#### Ticket Object Schema

```json
{
  "type": "string",      // Ticket type key (general, estudiante, etc.)
  "quantity": "number",  // Number of tickets
  "price": "number"      // Unit price in MXN centavos
}
```

#### Status Values

| Status | Description |
|--------|-------------|
| pending | Checkout session created, awaiting payment |
| completed | Payment successful, tickets issued |
| cancelled | Payment cancelled by user |
| expired | Checkout session expired (30 min timeout) |

#### Example Document

```json
{
  "orderId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "date": "2026-03-15",
  "tickets": [
    { "type": "general", "quantity": 2, "price": 12000 },
    { "type": "estudiante", "quantity": 1, "price": 6000 }
  ],
  "totalAmount": 30000,
  "customerEmail": "usuario@ejemplo.com",
  "stripeSessionId": "cs_test_a1b2c3d4e5f6g7h8i9j0",
  "stripePaymentIntent": "pi_3abc123def456",
  "status": "completed",
  "createdAt": "2026-03-10T15:30:00.000Z",
  "completedAt": "2026-03-10T15:35:00.000Z",
  "qrCode": "MUNET-F47AC10B-A1B2C3D4"
}
```

#### Global Secondary Indexes (Optional)

##### status-index

For querying orders by status (useful for admin dashboard).

| Attribute | Key Type | Type |
|-----------|----------|------|
| status | HASH | String |

##### date-index

For querying orders by visit date (useful for capacity planning).

| Attribute | Key Type | Type |
|-----------|----------|------|
| date | HASH | String |

---

## Ticket Type Configuration

Reference for ticket types and pricing:

| Type Key | Display Name (ES) | Price (MXN) | Price (Centavos) |
|----------|-------------------|-------------|------------------|
| general | Entrada General | $120.00 | 12000 |
| estudiante | Estudiante | $60.00 | 6000 |
| maestro | Maestro | $60.00 | 6000 |
| inapam | INAPAM | $60.00 | 6000 |
| nino | Niño (3-12 años) | $60.00 | 6000 |
| nino_gratis | Niño (<3 años) | Gratis | 0 |

**Note:** Sunday admission for Mexican nationals is free and handled separately (not through Stripe checkout).

---

## Access Patterns

### Write Patterns

1. **Create pending order** (createCheckoutSession)
   - Operation: PutItem
   - Key: orderId (generated)
   - Status: pending

2. **Complete order** (handleStripeWebhook)
   - Operation: UpdateItem
   - Key: orderId (from Stripe metadata)
   - Updates: status → completed, qrCode, completedAt, stripePaymentIntent

3. **Expire order** (handleStripeWebhook)
   - Operation: UpdateItem
   - Key: orderId (from Stripe metadata)
   - Updates: status → expired, expiredAt

### Read Patterns

1. **Get order by ID** (for success page, admin lookup)
   - Operation: GetItem
   - Key: orderId

2. **List orders by status** (admin dashboard)
   - Operation: Query on status-index
   - Key: status

3. **List orders by date** (capacity planning)
   - Operation: Query on date-index
   - Key: date

---

## Capacity Planning

### Billing Mode

Recommended: **On-Demand (PAY_PER_REQUEST)**

This eliminates capacity planning and automatically scales. Cost-effective for unpredictable traffic patterns typical of ticket sales.

### Estimated Usage

Based on projected 60% online ticket sales:

| Metric | Estimate |
|--------|----------|
| Orders/day (avg) | 100-500 |
| Orders/day (peak) | 2000+ (holidays, special events) |
| Read/Write ratio | 2:1 |
| Avg item size | ~1 KB |

### Cost Estimate

On-demand pricing (us-east-1):
- Write: $1.25 per million
- Read: $0.25 per million
- Storage: $0.25 per GB/month

**Estimated monthly cost:** $5-15 for moderate traffic

---

## Backup & Recovery

### Point-in-Time Recovery (PITR)

Enable PITR for production:

```bash
aws dynamodb update-continuous-backups \
  --table-name munet-orders \
  --point-in-time-recovery-specification PointInTimeRecoveryEnabled=true \
  --region us-east-1
```

Allows recovery to any point in the last 35 days.

### On-Demand Backups

Create manual backups before major changes:

```bash
aws dynamodb create-backup \
  --table-name munet-orders \
  --backup-name munet-orders-backup-$(date +%Y%m%d) \
  --region us-east-1
```

---

## Data Retention

### Policy

- **Completed orders:** Retain indefinitely (legal/audit requirements)
- **Pending/Expired orders:** Retain for 90 days, then archive or delete
- **Cancelled orders:** Retain for 30 days

### TTL (Time-to-Live)

For automatic cleanup of old pending/expired orders, add a TTL attribute:

```bash
aws dynamodb update-time-to-live \
  --table-name munet-orders \
  --time-to-live-specification "Enabled=true, AttributeName=ttl" \
  --region us-east-1
```

Set `ttl` attribute to Unix timestamp (e.g., 90 days from creation) for non-completed orders.
