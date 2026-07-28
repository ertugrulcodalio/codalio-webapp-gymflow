const api = {
  "openapi": "3.0.3",
  "components": {
    "schemas": {
      "active_storage_attachment": {
        "x-rhino-model": {
          "model": "active_storage_attachment",
          "modelPlural": "active_storage/attachments",
          "name": "activeStorage::Attachment",
          "pluralName": "activeStorage::Attachments",
          "readableName": "Attachment",
          "pluralReadableName": "Attachments",
          "ownedBy": null,
          "singular": false,
          "path": "/api/attachments",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "name": {
            "x-rhino-attribute": {
              "name": "name",
              "readableName": "Name",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "string"
          },
          "record_type": {
            "x-rhino-attribute": {
              "name": "record_type",
              "readableName": "Record Type",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "string"
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "url": {
            "x-rhino-attribute": {
              "name": "url",
              "readableName": "Url",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true
          },
          "url_attachment": {
            "x-rhino-attribute": {
              "name": "url_attachment",
              "readableName": "Url Attachment",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true
          },
          "previews": {
            "x-rhino-attribute": {
              "name": "previews",
              "readableName": "Previews",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "default": {
            },
            "type": "json"
          },
          "representations": {
            "x-rhino-attribute": {
              "name": "representations",
              "readableName": "Representations",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "default": {
            },
            "type": "json"
          },
          "variants": {
            "x-rhino-attribute": {
              "name": "variants",
              "readableName": "Variants",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "default": {
            },
            "type": "json"
          },
          "signed_id": {
            "x-rhino-attribute": {
              "name": "signed_id",
              "readableName": "Signed",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": true,
            "type": "unknown"
          }
        },
        "required": [
          "name",
          "record_type"
        ]
      },
      "user": {
        "x-rhino-model": {
          "model": "user",
          "modelPlural": "users",
          "name": "user",
          "pluralName": "users",
          "readableName": "User",
          "pluralReadableName": "Users",
          "ownedBy": null,
          "singular": false,
          "path": "/api/users",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "name": {
            "x-rhino-attribute": {
              "name": "name",
              "readableName": "Name",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "string"
          },
          "nickname": {
            "x-rhino-attribute": {
              "name": "nickname",
              "readableName": "Nickname",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "string"
          },
          "email": {
            "x-rhino-attribute": {
              "name": "email",
              "readableName": "Email",
              "readable": true,
              "creatable": true,
              "updatable": false
            },
            "nullable": false,
            "type": "string",
            "pattern": "^[^@\\s]+@[^@\\s]+$"
          },
          "image": {
            "x-rhino-attribute": {
              "name": "image",
              "readableName": "Image",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": true,
            "type": "string"
          },
          "users_roles": {
            "x-rhino-attribute": {
              "name": "users_roles",
              "readableName": "Users Roles",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": true,
            "type": "array",
            "items": {
              "type": "reference",
              "anyOf": [
                {
                  "$ref": "#/components/schemas/users_role"
                }
              ],
              "x-rhino-attribute-array": {
              }
            }
          }
        },
        "required": [
          "email"
        ]
      },
      "account": {
        "x-rhino-model": {
          "model": "account",
          "modelPlural": "accounts",
          "name": "account",
          "pluralName": "accounts",
          "readableName": "Account",
          "pluralReadableName": "Accounts",
          "ownedBy": "global",
          "singular": true,
          "path": "/api/account",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "name": {
            "x-rhino-attribute": {
              "name": "name",
              "readableName": "Name",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "string"
          },
          "nickname": {
            "x-rhino-attribute": {
              "name": "nickname",
              "readableName": "Nickname",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "string"
          },
          "email": {
            "x-rhino-attribute": {
              "name": "email",
              "readableName": "Email",
              "readable": true,
              "creatable": true,
              "updatable": false
            },
            "nullable": false,
            "type": "string",
            "pattern": "^[^@\\s]+@[^@\\s]+$"
          },
          "image": {
            "x-rhino-attribute": {
              "name": "image",
              "readableName": "Image",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": true,
            "type": "string"
          },
          "users_roles": {
            "x-rhino-attribute": {
              "name": "users_roles",
              "readableName": "Users Roles",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": true,
            "type": "array",
            "items": {
              "type": "reference",
              "anyOf": [
                {
                  "$ref": "#/components/schemas/users_role"
                }
              ],
              "x-rhino-attribute-array": {
              }
            }
          }
        },
        "required": [
          "email"
        ]
      },
      "organization": {
        "x-rhino-model": {
          "model": "organization",
          "modelPlural": "organizations",
          "name": "organization",
          "pluralName": "organizations",
          "readableName": "Organization",
          "pluralReadableName": "Organizations",
          "ownedBy": null,
          "singular": false,
          "path": "/api/organizations",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "name": {
            "x-rhino-attribute": {
              "name": "name",
              "readableName": "Name",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "string"
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "users_roles": {
            "x-rhino-attribute": {
              "name": "users_roles",
              "readableName": "Users Roles",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": true,
            "type": "array",
            "items": {
              "type": "reference",
              "anyOf": [
                {
                  "$ref": "#/components/schemas/users_role"
                }
              ],
              "x-rhino-attribute-array": {
              }
            }
          }
        }
      },
      "users_role": {
        "x-rhino-model": {
          "model": "users_role",
          "modelPlural": "users_roles",
          "name": "usersRole",
          "pluralName": "usersRoles",
          "readableName": "Users role",
          "pluralReadableName": "Users roles",
          "ownedBy": "organization",
          "singular": false,
          "path": "/api/users_roles",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "user": {
            "x-rhino-attribute": {
              "name": "user",
              "readableName": "User",
              "readable": true,
              "creatable": true,
              "updatable": false
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/user"
              }
            ]
          },
          "role": {
            "x-rhino-attribute": {
              "name": "role",
              "readableName": "Role",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/role"
              }
            ]
          },
          "organization": {
            "x-rhino-attribute": {
              "name": "organization",
              "readableName": "Organization",
              "readable": true,
              "creatable": true,
              "updatable": false
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/organization"
              }
            ]
          }
        },
        "required": [
          "user",
          "role",
          "organization"
        ]
      },
      "role": {
        "x-rhino-model": {
          "model": "role",
          "modelPlural": "roles",
          "name": "role",
          "pluralName": "roles",
          "readableName": "Role",
          "pluralReadableName": "Roles",
          "ownedBy": "global",
          "singular": false,
          "path": "/api/roles",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "name": {
            "x-rhino-attribute": {
              "name": "name",
              "readableName": "Name",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "string",
            "pattern": "^[a-zA-Z_]+$"
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          }
        },
        "required": [
          "name"
        ]
      },
      "users_role_invite": {
        "x-rhino-model": {
          "model": "users_role_invite",
          "modelPlural": "users_role_invites",
          "name": "usersRoleInvite",
          "pluralName": "usersRoleInvites",
          "readableName": "Users role invite",
          "pluralReadableName": "Users role invites",
          "ownedBy": "organization",
          "singular": false,
          "path": "/api/users_role_invites",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "email": {
            "x-rhino-attribute": {
              "name": "email",
              "readableName": "Email",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "string"
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "role": {
            "x-rhino-attribute": {
              "name": "role",
              "readableName": "Role",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/role"
              }
            ]
          },
          "organization": {
            "x-rhino-attribute": {
              "name": "organization",
              "readableName": "Organization",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/organization"
              }
            ]
          }
        },
        "required": [
          "email",
          "role",
          "organization"
        ]
      },
      "trainer": {
        "x-rhino-model": {
          "model": "trainer",
          "modelPlural": "trainers",
          "name": "trainer",
          "pluralName": "trainers",
          "readableName": "Trainer",
          "pluralReadableName": "Trainers",
          "ownedBy": "organization",
          "singular": false,
          "path": "/api/trainers",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "name": {
            "x-rhino-attribute": {
              "name": "name",
              "readableName": "Name",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "string"
          },
          "bio": {
            "x-rhino-attribute": {
              "name": "bio",
              "readableName": "Bio",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "text"
          },
          "status": {
            "x-rhino-attribute": {
              "name": "status",
              "readableName": "Status",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "default": "active",
            "type": "string",
            "enum": [
              "active",
              "inactive"
            ]
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "organization": {
            "x-rhino-attribute": {
              "name": "organization",
              "readableName": "Organization",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/organization"
              }
            ]
          }
        },
        "required": [
          "name",
          "status",
          "organization"
        ]
      },
      "membership_plan": {
        "x-rhino-model": {
          "model": "membership_plan",
          "modelPlural": "membership_plans",
          "name": "membershipPlan",
          "pluralName": "membershipPlans",
          "readableName": "Membership plan",
          "pluralReadableName": "Membership plans",
          "ownedBy": "organization",
          "singular": false,
          "path": "/api/membership_plans",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "name": {
            "x-rhino-attribute": {
              "name": "name",
              "readableName": "Name",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "string"
          },
          "description": {
            "x-rhino-attribute": {
              "name": "description",
              "readableName": "Description",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "text"
          },
          "price": {
            "x-rhino-attribute": {
              "name": "price",
              "readableName": "Price",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "number",
            "format": "double"
          },
          "status": {
            "x-rhino-attribute": {
              "name": "status",
              "readableName": "Status",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "default": "active",
            "type": "string",
            "enum": [
              "active",
              "inactive"
            ]
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "organization": {
            "x-rhino-attribute": {
              "name": "organization",
              "readableName": "Organization",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/organization"
              }
            ]
          }
        },
        "required": [
          "name",
          "status",
          "organization"
        ]
      },
      "gym_class": {
        "x-rhino-model": {
          "model": "gym_class",
          "modelPlural": "gym_classes",
          "name": "gymClass",
          "pluralName": "gymClasses",
          "readableName": "Gym class",
          "pluralReadableName": "Gym classes",
          "ownedBy": "organization",
          "singular": false,
          "path": "/api/gym_classes",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "name": {
            "x-rhino-attribute": {
              "name": "name",
              "readableName": "Name",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "string"
          },
          "description": {
            "x-rhino-attribute": {
              "name": "description",
              "readableName": "Description",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "text"
          },
          "start_time": {
            "x-rhino-attribute": {
              "name": "start_time",
              "readableName": "Start Time",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "string",
            "format": "datetime"
          },
          "end_time": {
            "x-rhino-attribute": {
              "name": "end_time",
              "readableName": "End Time",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "string",
            "format": "datetime"
          },
          "capacity": {
            "x-rhino-attribute": {
              "name": "capacity",
              "readableName": "Capacity",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "integer",
            "minimum": 0,
            "exclusiveMinimum": true
          },
          "status": {
            "x-rhino-attribute": {
              "name": "status",
              "readableName": "Status",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "default": "scheduled",
            "type": "string",
            "enum": [
              "scheduled",
              "cancelled",
              "completed"
            ]
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "organization": {
            "x-rhino-attribute": {
              "name": "organization",
              "readableName": "Organization",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/organization"
              }
            ]
          },
          "trainer": {
            "x-rhino-attribute": {
              "name": "trainer",
              "readableName": "Trainer",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/trainer"
              }
            ]
          }
        },
        "required": [
          "name",
          "capacity",
          "status",
          "organization",
          "trainer"
        ]
      },
      "booking": {
        "x-rhino-model": {
          "model": "booking",
          "modelPlural": "bookings",
          "name": "booking",
          "pluralName": "bookings",
          "readableName": "Booking",
          "pluralReadableName": "Bookings",
          "ownedBy": "organization",
          "singular": false,
          "path": "/api/bookings",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "status": {
            "x-rhino-attribute": {
              "name": "status",
              "readableName": "Status",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "default": "confirmed",
            "type": "string",
            "enum": [
              "confirmed",
              "cancelled"
            ]
          },
          "attendance_status": {
            "x-rhino-attribute": {
              "name": "attendance_status",
              "readableName": "Attendance Status",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "default": "pending",
            "type": "string",
            "enum": [
              "pending",
              "attended",
              "no_show"
            ]
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "organization": {
            "x-rhino-attribute": {
              "name": "organization",
              "readableName": "Organization",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/organization"
              }
            ]
          },
          "user": {
            "x-rhino-attribute": {
              "name": "user",
              "readableName": "User",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/user"
              }
            ]
          },
          "gym_class": {
            "x-rhino-attribute": {
              "name": "gym_class",
              "readableName": "Gym Class",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/gym_class"
              }
            ]
          }
        },
        "required": [
          "status",
          "attendance_status",
          "organization",
          "user",
          "gym_class"
        ]
      },
      "branding_setting": {
        "x-rhino-model": {
          "model": "branding_setting",
          "modelPlural": "branding_settings",
          "name": "brandingSetting",
          "pluralName": "brandingSettings",
          "readableName": "Branding setting",
          "pluralReadableName": "Branding settings",
          "ownedBy": "organization",
          "singular": false,
          "path": "/api/branding_settings",
          "searchable": false
        },
        "type": "object",
        "properties": {
          "id": {
            "x-rhino-attribute": {
              "name": "id",
              "readableName": "Id",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "integer",
            "format": "identifier"
          },
          "logo_url": {
            "x-rhino-attribute": {
              "name": "logo_url",
              "readableName": "Logo Url",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "string"
          },
          "primary_color": {
            "x-rhino-attribute": {
              "name": "primary_color",
              "readableName": "Primary Color",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": true,
            "type": "string"
          },
          "created_at": {
            "x-rhino-attribute": {
              "name": "created_at",
              "readableName": "Created At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "updated_at": {
            "x-rhino-attribute": {
              "name": "updated_at",
              "readableName": "Updated At",
              "readable": true,
              "creatable": false,
              "updatable": false
            },
            "readOnly": true,
            "nullable": false,
            "type": "string",
            "format": "datetime"
          },
          "organization": {
            "x-rhino-attribute": {
              "name": "organization",
              "readableName": "Organization",
              "readable": true,
              "creatable": true,
              "updatable": true
            },
            "nullable": false,
            "type": "reference",
            "anyOf": [
              {
                "$ref": "#/components/schemas/organization"
              }
            ]
          }
        },
        "required": [
          "logo_url",
          "organization"
        ]
      }
    }
  },
  "paths": {
    "/api/attachments": {
      "get": {
        "operationId": "active_storage_attachment-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/active_storage_attachment"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "active_storage_attachment"
        ]
      },
      "post": {
        "operationId": "active_storage_attachment-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/active_storage_attachment"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "active_storage_attachment"
        ]
      }
    },
    "/api/attachments/:id": {
      "get": {
        "operationId": "active_storage_attachment-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/active_storage_attachment"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "active_storage_attachment"
        ]
      },
      "patch": {
        "operationId": "active_storage_attachment-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/active_storage_attachment"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "active_storage_attachment"
        ]
      },
      "put": {
        "operationId": "active_storage_attachment-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/active_storage_attachment"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "active_storage_attachment"
        ]
      },
      "delete": {
        "operationId": "active_storage_attachment-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/active_storage_attachment"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "active_storage_attachment"
        ]
      }
    },
    "/api/users": {
      "get": {
        "operationId": "user-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/user"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "user"
        ]
      },
      "post": {
        "operationId": "user-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/user"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "user"
        ]
      }
    },
    "/api/users/:id": {
      "get": {
        "operationId": "user-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/user"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "user"
        ]
      },
      "patch": {
        "operationId": "user-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/user"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "user"
        ]
      },
      "put": {
        "operationId": "user-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/user"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "user"
        ]
      },
      "delete": {
        "operationId": "user-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/user"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "user"
        ]
      }
    },
    "/api/account": {
      "get": {
        "operationId": "account-show",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/account"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "account"
        ]
      },
      "patch": {
        "operationId": "account-update",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/account"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "account"
        ]
      },
      "put": {
        "operationId": "account-update",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/account"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "account"
        ]
      }
    },
    "/api/organizations": {
      "get": {
        "operationId": "organization-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/organization"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "organization"
        ]
      },
      "post": {
        "operationId": "organization-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/organization"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "organization"
        ]
      }
    },
    "/api/organizations/:id": {
      "get": {
        "operationId": "organization-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/organization"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "organization"
        ]
      },
      "patch": {
        "operationId": "organization-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/organization"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "organization"
        ]
      },
      "put": {
        "operationId": "organization-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/organization"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "organization"
        ]
      },
      "delete": {
        "operationId": "organization-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/organization"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "organization"
        ]
      }
    },
    "/api/users_roles": {
      "get": {
        "operationId": "users_role-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role"
        ]
      },
      "post": {
        "operationId": "users_role-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role"
        ]
      }
    },
    "/api/users_roles/:id": {
      "get": {
        "operationId": "users_role-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role"
        ]
      },
      "patch": {
        "operationId": "users_role-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role"
        ]
      },
      "put": {
        "operationId": "users_role-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role"
        ]
      },
      "delete": {
        "operationId": "users_role-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role"
        ]
      }
    },
    "/api/roles": {
      "get": {
        "operationId": "role-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/role"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "role"
        ]
      }
    },
    "/api/roles/:id": {
      "get": {
        "operationId": "role-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/role"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "role"
        ]
      }
    },
    "/api/users_role_invites": {
      "get": {
        "operationId": "users_role_invite-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role_invite"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role_invite"
        ]
      },
      "post": {
        "operationId": "users_role_invite-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role_invite"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role_invite"
        ]
      }
    },
    "/api/users_role_invites/:id": {
      "get": {
        "operationId": "users_role_invite-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role_invite"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role_invite"
        ]
      },
      "patch": {
        "operationId": "users_role_invite-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role_invite"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role_invite"
        ]
      },
      "put": {
        "operationId": "users_role_invite-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role_invite"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role_invite"
        ]
      },
      "delete": {
        "operationId": "users_role_invite-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/users_role_invite"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "users_role_invite"
        ]
      }
    },
    "/api/trainers": {
      "get": {
        "operationId": "trainer-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/trainer"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "trainer"
        ]
      },
      "post": {
        "operationId": "trainer-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/trainer"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "trainer"
        ]
      }
    },
    "/api/trainers/:id": {
      "get": {
        "operationId": "trainer-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/trainer"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "trainer"
        ]
      },
      "patch": {
        "operationId": "trainer-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/trainer"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "trainer"
        ]
      },
      "put": {
        "operationId": "trainer-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/trainer"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "trainer"
        ]
      },
      "delete": {
        "operationId": "trainer-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/trainer"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "trainer"
        ]
      }
    },
    "/api/membership_plans": {
      "get": {
        "operationId": "membership_plan-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/membership_plan"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "membership_plan"
        ]
      },
      "post": {
        "operationId": "membership_plan-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/membership_plan"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "membership_plan"
        ]
      }
    },
    "/api/membership_plans/:id": {
      "get": {
        "operationId": "membership_plan-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/membership_plan"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "membership_plan"
        ]
      },
      "patch": {
        "operationId": "membership_plan-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/membership_plan"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "membership_plan"
        ]
      },
      "put": {
        "operationId": "membership_plan-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/membership_plan"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "membership_plan"
        ]
      },
      "delete": {
        "operationId": "membership_plan-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/membership_plan"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "membership_plan"
        ]
      }
    },
    "/api/gym_classes": {
      "get": {
        "operationId": "gym_class-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/gym_class"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "gym_class"
        ]
      },
      "post": {
        "operationId": "gym_class-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/gym_class"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "gym_class"
        ]
      }
    },
    "/api/gym_classes/:id": {
      "get": {
        "operationId": "gym_class-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/gym_class"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "gym_class"
        ]
      },
      "patch": {
        "operationId": "gym_class-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/gym_class"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "gym_class"
        ]
      },
      "put": {
        "operationId": "gym_class-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/gym_class"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "gym_class"
        ]
      },
      "delete": {
        "operationId": "gym_class-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/gym_class"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "gym_class"
        ]
      }
    },
    "/api/bookings": {
      "get": {
        "operationId": "booking-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/booking"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "booking"
        ]
      },
      "post": {
        "operationId": "booking-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/booking"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "booking"
        ]
      }
    },
    "/api/bookings/:id": {
      "get": {
        "operationId": "booking-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/booking"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "booking"
        ]
      },
      "patch": {
        "operationId": "booking-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/booking"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "booking"
        ]
      },
      "put": {
        "operationId": "booking-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/booking"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "booking"
        ]
      },
      "delete": {
        "operationId": "booking-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/booking"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "booking"
        ]
      }
    },
    "/api/branding_settings": {
      "get": {
        "operationId": "branding_setting-index",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/branding_setting"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "branding_setting"
        ]
      },
      "post": {
        "operationId": "branding_setting-create",
        "parameters": [

        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/branding_setting"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "branding_setting"
        ]
      }
    },
    "/api/branding_settings/:id": {
      "get": {
        "operationId": "branding_setting-show",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/branding_setting"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "branding_setting"
        ]
      },
      "patch": {
        "operationId": "branding_setting-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/branding_setting"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "branding_setting"
        ]
      },
      "put": {
        "operationId": "branding_setting-update",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/branding_setting"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "branding_setting"
        ]
      },
      "delete": {
        "operationId": "branding_setting-destroy",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/branding_setting"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
              }
            }
          },
          "403": {
            "description": "Forbidden",
            "content": {
              "application/json": {
              }
            }
          },
          "422": {
            "description": "Unprocessable Content",
            "content": {
              "application/json": {
              }
            }
          }
        },
        "tags": [
          "branding_setting"
        ]
      }
    }
  },
  "info": {
    "title": "RhinoTemplate API",
    "version": "0.0.0",
    "x-rhino": {
      "modules": {
        "rhino": {
          "version": "0.26.0.beta.4",
          "authOwner": "user",
          "baseOwner": "organization",
          "oauth": [

          ],
          "allow_signup": true
        },
        "rhino_organizations": {
          "version": "0.26.0.beta.4"
        }
      }
    }
  }
};

export default api;
