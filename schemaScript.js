db.createCollection("Authors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Authors",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "name": { bsonType: "string" },
        "surnames": { bsonType: "string" },
        "bio": { bsonType: "string" },
        "links": { bsonType: "array", items: { bsonType: "object" } },
      },
    },
  },
});

db.createCollection("Courses", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Courses",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "title": { bsonType: "string" },
        "hours": { bsonType: "int" },
        "description": { bsonType: "string" },
      },
    },
  },
});

db.createCollection("AuthorsCourse", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "AuthorsCourse",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "idAuthors": { bsonType: "objectId" },
        "idCourses": { bsonType: "objectId" },
      },
    },
  },
});

db.createCollection("Videos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Videos",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "name": { bsonType: "string" },
        "storage": { bsonType: "array", items: { bsonType: "object" } },
        "idCourses": { bsonType: "objectId" },
        "author": { bsonType: "object" },
        "category": { bsonType: "array", items: { bsonType: "object" } },
      },
    },
  },
});

db.createCollection("Articles", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Articles",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "name": { bsonType: "string" },
        "storage": { bsonType: "array", items: { bsonType: "object" } },
        "author": { bsonType: "objectId" },
        "idCourse": { bsonType: "objectId" },
        "category": { bsonType: "array", items: { bsonType: "object" } },
      },
    },
  },
});

db.createCollection("Categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Categories",
      required: ["_id"],
      properties: {
        "_id": { bsonType: "objectId" },
        "name": { bsonType: "string" },
      },
    },
  },
});