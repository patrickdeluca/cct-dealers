# DIFY

You have access to a Retrieval-Augmented Generation (RAG) system through the Dify tool. This enables you to enhance your responses with domain-specific knowledge by storing, retrieving, and managing a knowledge base. The knowledge base is hosted at http://10.27.27.27/v1 and uses high-quality embeddings for better semantic search results.

## Key Concepts

- The knowledge base uses hybrid search with reranking for better semantic matching
- Documents are processed using high-quality embeddings for accurate retrieval
- Each document can be broken into chunks for more granular knowledge access
- The system supports both semantic and keyword-based search methods

## Tool Usage

### Parameters

- **action** (required): The action to perform. Available actions:
  - `retrieve`: Search for relevant knowledge using a query
  - `add`: Add new knowledge to the database
  - `update`: Update existing knowledge
  - `list`: List all documents in the knowledge base
  - `delete`: Remove a document from the knowledge base
- **query** (optional): The search query for retrieve action. Should be specific enough to find relevant content but general enough to capture variations.
- **content** (optional): The content to add or update. This can be any text content that should be made searchable.
- **name** (optional): The name of the document when adding or updating content.
- **documentId** (optional): The ID of the document for update/delete actions.
- **page** (optional): Page number for list action, defaults to 1.
- **limit** (optional): Number of items per page for list action, defaults to 20.

### When to Use

1. **Knowledge Retrieval**: Use the retrieve action when you need to:
   - Find relevant information to answer user questions
   - Get context about specific topics or concepts
   - Support your responses with documented knowledge

2. **Knowledge Management**: Use add/update/delete actions when you need to:
   - Store new information for future reference
   - Update outdated information
   - Remove irrelevant or deprecated content

3. **Knowledge Discovery**: Use the list action when you need to:
   - Understand what knowledge is available
   - Find specific documents by browsing
   - Verify if certain information exists

### Best Practices

1. **Retrieval**:
   - Use specific queries for precise matches
   - Include key terms and concepts
   - Consider variations in terminology

2. **Storage**:
   - Give documents descriptive names
   - Structure content clearly
   - Include relevant metadata

3. **Updates**:
   - Verify document existence before updating
   - Maintain content structure
   - Preserve important metadata

### Examples

1. Retrieve knowledge:
```xml
<dify>
<action>retrieve</action>
<query>How to implement authentication?</query>
</dify>
```

2. Add new knowledge:
```xml
<dify>
<action>add</action>
<name>Authentication Guide</name>
<content>Here's how to implement authentication...</content>
</dify>
```

3. Update existing knowledge:
```xml
<dify>
<action>update</action>
<documentId>doc123</documentId>
<content>Updated authentication guide...</content>
</dify>
```

4. List documents:
```xml
<dify>
<action>list</action>
<page>1</page>
<limit>10</limit>
</dify>
```

5. Delete a document:
```xml
<dify>
<action>delete</action>
<documentId>doc123</documentId>
</dify>
```

### Error Handling

Common error scenarios to handle:
- Document not found
- Invalid action specified
- Missing required parameters
- Rate limiting or API errors
- Indexing in progress

Always check the response for error messages and handle them appropriately.
