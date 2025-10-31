# Event Management System - Entity Relationship Diagram

## Database Schema Design

### Overview
This document describes the database structure for the Event Management System. The system uses MongoDB as the primary database with Mongoose ODM for schema definition and validation.

---

## ER Diagram (Visual Representation)

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ _id (PK)        │
│ name            │
│ email (unique)  │
│ password (hash) │
│ role            │
│ avatar          │
│ createdAt       │
│ updatedAt       │
└─────────────────┘
        │
        │ 1:N (creates)
        ▼
┌─────────────────┐         ┌──────────────────┐
│     EVENTS      │────────▶│    CHANNELS      │
├─────────────────┤  1:N    ├──────────────────┤
│ _id (PK)        │         │ _id (PK)         │
│ name            │         │ eventId (FK)     │
│ description     │         │ name             │
│ eventType       │         │ description      │
│ startDate       │         │ budget           │
│ endDate         │         │ createdAt        │
│ venue           │         │ updatedAt        │
│ organizerId(FK) │         └──────────────────┘
│ status          │                 │
│ budget          │                 │ 1:N
│ createdAt       │                 ▼
│ updatedAt       │         ┌──────────────────┐
└─────────────────┘         │    SUBGROUPS     │
        │                   ├──────────────────┤
        │ 1:N               │ _id (PK)         │
        ▼                   │ channelId (FK)   │
┌─────────────────┐         │ name             │
│  EVENT_MEMBERS  │         │ leaderId (FK)    │
├─────────────────┤         │ members[]        │
│ _id (PK)        │         │ createdAt        │
│ eventId (FK)    │         │ updatedAt        │
│ userId (FK)     │         └──────────────────┘
│ role            │
│ channelId (FK)  │
│ joinedAt        │
└─────────────────┘
        │
        │ 1:N
        ▼
┌─────────────────┐         ┌──────────────────┐
│      TASKS      │────────▶│  TASK_COMMENTS   │
├─────────────────┤  1:N    ├──────────────────┤
│ _id (PK)        │         │ _id (PK)         │
│ eventId (FK)    │         │ taskId (FK)      │
│ channelId (FK)  │         │ userId (FK)      │
│ title           │         │ comment          │
│ description     │         │ createdAt        │
│ assignedTo (FK) │         └──────────────────┘
│ createdBy (FK)  │
│ priority        │         ┌──────────────────┐
│ status          │         │   ATTACHMENTS    │
│ dueDate         │         ├──────────────────┤
│ tags[]          │         │ _id (PK)         │
│ createdAt       │         │ taskId (FK)      │
│ updatedAt       │         │ fileName         │
└─────────────────┘         │ fileUrl          │
        │                   │ fileType         │
        │ 1:N               │ uploadedBy (FK)  │
        └──────────────────▶│ uploadedAt       │
                            └──────────────────┘

┌─────────────────┐         ┌──────────────────┐
│    EXPENSES     │         │    DOCUMENTS     │
├─────────────────┤         ├──────────────────┤
│ _id (PK)        │         │ _id (PK)         │
│ eventId (FK)    │         │ eventId (FK)     │
│ channelId (FK)  │         │ channelId (FK)   │
│ category        │         │ title            │
│ amount          │         │ description      │
│ description     │         │ fileUrl          │
│ receiptUrl      │         │ fileType         │
│ submittedBy(FK) │         │ uploadedBy (FK)  │
│ approvedBy (FK) │         │ version          │
│ status          │         │ createdAt        │
│ date            │         │ updatedAt        │
│ createdAt       │         └──────────────────┘
└─────────────────┘

┌─────────────────┐
│    MESSAGES     │
├─────────────────┤
│ _id (PK)        │
│ eventId (FK)    │
│ channelId (FK)  │
│ senderId (FK)   │
│ content         │
│ messageType     │
│ attachments[]   │
│ isRead          │
│ createdAt       │
└─────────────────┘

┌─────────────────┐
│ NOTIFICATIONS   │
├─────────────────┤
│ _id (PK)        │
│ userId (FK)     │
│ eventId (FK)    │
│ type            │
│ title           │
│ message         │
│ isRead          │
│ link            │
│ createdAt       │
└─────────────────┘

┌─────────────────┐
│    MEETINGS     │
├─────────────────┤
│ _id (PK)        │
│ eventId (FK)    │
│ channelId (FK)  │
│ title           │
│ scheduledAt     │
│ duration        │
│ meetingUrl      │
│ hostId (FK)     │
│ participants[]  │
│ recordingUrl    │
│ status          │
│ createdAt       │
│ updatedAt       │
└─────────────────┘

┌─────────────────┐
│EVENT_TEMPLATES  │
├─────────────────┤
│ _id (PK)        │
│ name            │
│ description     │
│ eventType       │
│ defaultChannels │
│ defaultTasks    │
│ createdBy (FK)  │
│ isPublic        │
│ usageCount      │
│ createdAt       │
│ updatedAt       │
└─────────────────┘
```

---

## Detailed Schema Definitions

### 1. Users Collection

**Purpose**: Store user account information and authentication details

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| name | String | User's full name | Required, 2-100 chars |
| email | String | User's email address | Required, unique, valid email |
| password | String | Hashed password | Required, min 8 chars (hashed) |
| role | String | User role | Enum: ['user', 'organizer', 'admin'] |
| avatar | String | Profile picture URL | Optional |
| phone | String | Contact number | Optional |
| bio | String | User biography | Optional, max 500 chars |
| createdAt | Date | Account creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**: 
- email (unique)
- createdAt

---

### 2. Events Collection

**Purpose**: Store event information and configuration

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| name | String | Event name | Required, 3-200 chars |
| description | String | Event description | Required, max 2000 chars |
| eventType | String | Type of event | Enum: ['workshop', 'conference', 'seminar', 'college-event', 'corporate', 'other'] |
| startDate | Date | Event start date/time | Required |
| endDate | Date | Event end date/time | Required, must be after startDate |
| venue | String | Event location | Required |
| organizerId | ObjectId | Reference to Users | Required, indexed |
| status | String | Event status | Enum: ['planning', 'in-progress', 'completed', 'cancelled'], default: 'planning' |
| budget | Number | Total event budget | Optional, min: 0 |
| coverImage | String | Event cover image URL | Optional |
| tags | Array[String] | Event tags/categories | Optional |
| isPublic | Boolean | Public visibility | Default: false |
| isTemplate | Boolean | Is this a template event | Default: false |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- organizerId
- status
- startDate
- eventType

**Relationships**:
- organizerId → Users._id (Many-to-One)

---

### 3. Channels Collection

**Purpose**: Organize teams/departments within events

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| eventId | ObjectId | Reference to Events | Required, indexed |
| name | String | Channel name | Required, 2-100 chars |
| description | String | Channel description | Optional, max 500 chars |
| color | String | Channel color code | Optional, hex color |
| budget | Number | Channel-specific budget | Optional, min: 0 |
| icon | String | Channel icon/emoji | Optional |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- eventId
- compound: (eventId, name)

**Relationships**:
- eventId → Events._id (Many-to-One)

---

### 4. Subgroups Collection

**Purpose**: Create smaller teams within channels

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| channelId | ObjectId | Reference to Channels | Required, indexed |
| name | String | Subgroup name | Required, 2-100 chars |
| description | String | Subgroup description | Optional, max 500 chars |
| leaderId | ObjectId | Reference to Users | Optional |
| members | Array[ObjectId] | Array of User IDs | Optional |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- channelId
- leaderId

**Relationships**:
- channelId → Channels._id (Many-to-One)
- leaderId → Users._id (Many-to-One)
- members → Users._id (Many-to-Many)

---

### 5. Event_Members Collection

**Purpose**: Track event team members and their roles

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| eventId | ObjectId | Reference to Events | Required, indexed |
| userId | ObjectId | Reference to Users | Required, indexed |
| role | String | Member role in event | Enum: ['organizer', 'team-lead', 'member', 'viewer'], default: 'member' |
| channelId | ObjectId | Reference to Channels | Optional |
| permissions | Array[String] | Specific permissions | Optional |
| joinedAt | Date | Join timestamp | Auto-generated |

**Indexes**:
- compound: (eventId, userId) - unique
- userId
- channelId

**Relationships**:
- eventId → Events._id (Many-to-One)
- userId → Users._id (Many-to-One)
- channelId → Channels._id (Many-to-One)

---

### 6. Tasks Collection

**Purpose**: Manage event-related tasks and assignments

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| eventId | ObjectId | Reference to Events | Required, indexed |
| channelId | ObjectId | Reference to Channels | Optional, indexed |
| title | String | Task title | Required, 3-200 chars |
| description | String | Task description | Optional, max 2000 chars |
| assignedTo | ObjectId | Reference to Users | Optional, indexed |
| createdBy | ObjectId | Reference to Users | Required |
| priority | String | Task priority | Enum: ['low', 'medium', 'high', 'critical'], default: 'medium' |
| status | String | Task status | Enum: ['todo', 'in-progress', 'review', 'done'], default: 'todo' |
| dueDate | Date | Task deadline | Optional |
| tags | Array[String] | Task tags | Optional |
| dependencies | Array[ObjectId] | Dependent task IDs | Optional |
| estimatedHours | Number | Estimated time | Optional, min: 0 |
| actualHours | Number | Actual time spent | Optional, min: 0 |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- eventId
- channelId
- assignedTo
- status
- dueDate
- compound: (eventId, status)

**Relationships**:
- eventId → Events._id (Many-to-One)
- channelId → Channels._id (Many-to-One)
- assignedTo → Users._id (Many-to-One)
- createdBy → Users._id (Many-to-One)

---

### 7. Task_Comments Collection

**Purpose**: Store comments and discussions on tasks

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| taskId | ObjectId | Reference to Tasks | Required, indexed |
| userId | ObjectId | Reference to Users | Required |
| comment | String | Comment text | Required, 1-1000 chars |
| mentions | Array[ObjectId] | Mentioned user IDs | Optional |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- taskId
- userId

**Relationships**:
- taskId → Tasks._id (Many-to-One)
- userId → Users._id (Many-to-One)

---

### 8. Attachments Collection

**Purpose**: Store file attachments for tasks

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| taskId | ObjectId | Reference to Tasks | Required, indexed |
| fileName | String | Original file name | Required |
| fileUrl | String | Cloud storage URL | Required |
| fileType | String | MIME type | Required |
| fileSize | Number | File size in bytes | Required |
| uploadedBy | ObjectId | Reference to Users | Required |
| uploadedAt | Date | Upload timestamp | Auto-generated |

**Indexes**:
- taskId
- uploadedBy

**Relationships**:
- taskId → Tasks._id (Many-to-One)
- uploadedBy → Users._id (Many-to-One)

---

### 9. Expenses Collection

**Purpose**: Track event expenses and budget utilization

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| eventId | ObjectId | Reference to Events | Required, indexed |
| channelId | ObjectId | Reference to Channels | Optional, indexed |
| category | String | Expense category | Required, e.g., 'venue', 'catering', 'marketing' |
| amount | Number | Expense amount | Required, min: 0 |
| description | String | Expense description | Required, max 500 chars |
| receiptUrl | String | Receipt image URL | Optional |
| submittedBy | ObjectId | Reference to Users | Required |
| approvedBy | ObjectId | Reference to Users | Optional |
| status | String | Approval status | Enum: ['pending', 'approved', 'rejected'], default: 'pending' |
| date | Date | Expense date | Required |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- eventId
- channelId
- status
- compound: (eventId, status)

**Relationships**:
- eventId → Events._id (Many-to-One)
- channelId → Channels._id (Many-to-One)
- submittedBy → Users._id (Many-to-One)
- approvedBy → Users._id (Many-to-One)

---

### 10. Documents Collection

**Purpose**: Store event-related documents and files

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| eventId | ObjectId | Reference to Events | Required, indexed |
| channelId | ObjectId | Reference to Channels | Optional, indexed |
| title | String | Document title | Required, 3-200 chars |
| description | String | Document description | Optional, max 500 chars |
| fileUrl | String | Cloud storage URL | Required |
| fileType | String | MIME type | Required |
| fileSize | Number | File size in bytes | Required |
| uploadedBy | ObjectId | Reference to Users | Required |
| version | Number | Document version | Default: 1 |
| tags | Array[String] | Document tags | Optional |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- eventId
- channelId
- uploadedBy

**Relationships**:
- eventId → Events._id (Many-to-One)
- channelId → Channels._id (Many-to-One)
- uploadedBy → Users._id (Many-to-One)

---

### 11. Messages Collection

**Purpose**: Store chat messages for real-time communication

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| eventId | ObjectId | Reference to Events | Required, indexed |
| channelId | ObjectId | Reference to Channels | Optional, indexed |
| senderId | ObjectId | Reference to Users | Required |
| content | String | Message content | Required, max 2000 chars |
| messageType | String | Type of message | Enum: ['text', 'file', 'system'], default: 'text' |
| attachments | Array[Object] | File attachments | Optional |
| mentions | Array[ObjectId] | Mentioned user IDs | Optional |
| isRead | Boolean | Read status | Default: false |
| isEdited | Boolean | Edit status | Default: false |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- eventId
- channelId
- senderId
- createdAt

**Relationships**:
- eventId → Events._id (Many-to-One)
- channelId → Channels._id (Many-to-One)
- senderId → Users._id (Many-to-One)

---

### 12. Notifications Collection

**Purpose**: Store user notifications for events and updates

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| userId | ObjectId | Reference to Users | Required, indexed |
| eventId | ObjectId | Reference to Events | Optional |
| type | String | Notification type | Enum: ['task-assigned', 'task-updated', 'expense-approved', 'message', 'deadline', 'other'] |
| title | String | Notification title | Required, max 200 chars |
| message | String | Notification message | Required, max 500 chars |
| isRead | Boolean | Read status | Default: false |
| link | String | Related link/URL | Optional |
| createdAt | Date | Creation timestamp | Auto-generated |

**Indexes**:
- userId
- compound: (userId, isRead)
- createdAt

**Relationships**:
- userId → Users._id (Many-to-One)
- eventId → Events._id (Many-to-One)

---

### 13. Meetings Collection

**Purpose**: Track video conference calls and meeting history

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| eventId | ObjectId | Reference to Events | Required, indexed |
| channelId | ObjectId | Reference to Channels | Optional, indexed |
| title | String | Meeting title | Required, 3-200 chars |
| scheduledAt | Date | Scheduled date/time | Required |
| duration | Number | Duration in minutes | Required, min: 1 |
| meetingUrl | String | Video conference URL | Required |
| hostId | ObjectId | Reference to Users | Required |
| participants | Array[ObjectId] | Array of User IDs | Optional |
| recordingUrl | String | Recording URL | Optional |
| status | String | Meeting status | Enum: ['scheduled', 'in-progress', 'completed', 'cancelled'], default: 'scheduled' |
| notes | String | Meeting notes | Optional, max 5000 chars |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- eventId
- channelId
- hostId
- scheduledAt
- compound: (eventId, status)

**Relationships**:
- eventId → Events._id (Many-to-One)
- channelId → Channels._id (Many-to-One)
- hostId → Users._id (Many-to-One)
- participants → Users._id (Many-to-Many)

---

### 14. Event_Templates Collection

**Purpose**: Store reusable event templates for quick event creation

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| _id | ObjectId | Primary key | Auto-generated |
| name | String | Template name | Required, 3-200 chars |
| description | String | Template description | Optional, max 1000 chars |
| eventType | String | Type of event | Enum: ['workshop', 'conference', 'seminar', 'college-event', 'corporate', 'other'] |
| defaultChannels | Array[Object] | Predefined channels | Optional, e.g., [{name: "Logistics", description: "..."}] |
| defaultTasks | Array[Object] | Predefined tasks | Optional, e.g., [{title: "Book venue", priority: "high"}] |
| defaultBudget | Number | Suggested budget | Optional, min: 0 |
| createdBy | ObjectId | Reference to Users | Required |
| isPublic | Boolean | Public template | Default: false |
| usageCount | Number | Times template used | Default: 0 |
| tags | Array[String] | Template tags | Optional |
| createdAt | Date | Creation timestamp | Auto-generated |
| updatedAt | Date | Last update timestamp | Auto-updated |

**Indexes**:
- createdBy
- isPublic
- eventType
- usageCount

**Relationships**:
- createdBy → Users._id (Many-to-One)

---

## Relationships Summary

### One-to-Many Relationships:
- **Users → Events**: One user can create many events
- **Events → Channels**: One event can have many channels
- **Channels → Subgroups**: One channel can have many subgroups
- **Events → Tasks**: One event can have many tasks
- **Tasks → Task_Comments**: One task can have many comments
- **Tasks → Attachments**: One task can have many attachments
- **Events → Expenses**: One event can have many expenses
- **Events → Documents**: One event can have many documents
- **Events → Messages**: One event can have many messages
- **Events → Meetings**: One event can have many meetings
- **Users → Notifications**: One user can have many notifications
- **Users → Event_Templates**: One user can create many templates

### Many-to-Many Relationships:
- **Users ↔ Events** (through Event_Members): Users can be members of multiple events
- **Users ↔ Subgroups**: Users can be members of multiple subgroups
- **Users ↔ Meetings** (through participants): Users can participate in multiple meetings

---

## Database Constraints and Rules

### Business Rules:
1. An event must have at least one organizer
2. Task due dates must be within the event's start and end dates
3. Expenses cannot exceed the allocated budget (warning, not hard constraint)
4. Only event organizers can approve expenses
5. Users can only be assigned tasks in events they are members of
6. Channels are unique within an event (same name not allowed)
7. Meeting scheduledAt must be within event's start and end dates
8. Template events (isTemplate=true) cannot have actual dates or be executed
9. Only meeting hosts can update meeting status and add recordings

### Data Integrity:
1. Cascade delete: When an event is deleted, all related data (channels, tasks, expenses, etc.) should be deleted
2. Soft delete option for events (mark as deleted instead of removing)
3. Audit trail: Track who created/modified records and when

---

## Indexes Strategy

### Performance Optimization:
- Compound indexes on frequently queried field combinations
- Index on foreign keys for faster joins
- Index on date fields for time-based queries
- Text indexes on searchable fields (event name, task title)

### Example Queries Optimized:
```javascript
// Get all tasks for an event with specific status
db.tasks.find({ eventId: ObjectId("..."), status: "in-progress" })
// Optimized by compound index on (eventId, status)

// Get all unread notifications for a user
db.notifications.find({ userId: ObjectId("..."), isRead: false })
// Optimized by compound index on (userId, isRead)

// Get all expenses pending approval for an event
db.expenses.find({ eventId: ObjectId("..."), status: "pending" })
// Optimized by compound index on (eventId, status)
```

---

## Schema Validation

MongoDB schema validation will be implemented using Mongoose schemas with the following validations:
- Required fields
- Data type validation
- String length constraints
- Enum value validation
- Custom validators for business logic
- Pre/post hooks for data consistency

---

**Document Version**: 1.1  
**Last Updated**: October 31, 2025  
**Database**: MongoDB with Mongoose ODM  
**Total Collections**: 14 (Users, Events, Channels, Subgroups, Event_Members, Tasks, Task_Comments, Attachments, Expenses, Documents, Messages, Notifications, Meetings, Event_Templates)
