# Knowledge API Documentation

## Authentication

The Service API of Dify authenticates using an **API-Key**. It is recommended that developers store the API-Key in the backend to prevent leakage, which could lead to property loss.

### Authorization Header

All API requests should include your API-Key in the `Authorization` HTTP header:

```http
Authorization: Bearer {API_KEY}
```

---

## API Endpoints

### Create a Document from Text

**POST** `/datasets/{dataset_id}/document/create-by-text`

This API creates a new document through text based on existing knowledge.

#### Parameters

- **dataset_id** (string): Knowledge ID

#### Request Body

- **name** (string): Document name
- **text** (string): Document content
- **indexing_technique** (string): Index mode
  - `high_quality`: Embedding using embedding model, built as vector database index
  - `economy`: Built using inverted index of keyword table index
- **process_rule** (object): Processing rules
  - **mode** (string): Cleaning, segmentation mode, automatic/custom
  - **rules** (object): Custom rules
  - **pre_processing_rules** (array[object]): Preprocessing rules
    - **id** (string): Unique identifier for the preprocessing rule
    - **enumerate**
      - `remove_extra_spaces`: Replace consecutive spaces, newlines, tabs
      - `remove_urls_emails`: Delete URL, email address
    - **enabled** (bool): Whether to select this rule or not
  - **segmentation** (object): Segmentation rules
    - **separator**: Custom segment identifier, default is `\n`
    - **max_tokens**: Maximum length (token), defaults to 1000

#### Example Request

```bash
curl --location --request POST 'http://10.27.27.27/v1/datasets/{dataset_id}/document/create-by-text' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "text","text": "text","indexing_technique": "high_quality","process_rule": {"mode": "automatic"}}'
```

#### Response

```json
{
  "document": {
    "id": "",
    "position": 1,
    "data_source_type": "upload_file",
    "data_source_info": {
        "upload_file_id": ""
    },
    "dataset_process_rule_id": "",
    "name": "text.txt",
    "created_from": "api",
    "created_by": "",
    "created_at": 1695690280,
    "tokens": 0,
    "indexing_status": "waiting",
    "error": null,
    "enabled": true,
    "disabled_at": null,
    "disabled_by": null,
    "archived": false,
    "display_status": "queuing",
    "word_count": 0,
    "hit_count": 0,
    "doc_form": "text_model"
  },
  "batch": ""
}
```

---

### Create a Document from a File

**POST** `/datasets/{dataset_id}/document/create-by-file`

This API creates a new document through a file based on existing knowledge.

#### Parameters

- **dataset_id** (string): Knowledge ID

#### Request Body

- **data** (multipart/form-data json string): Source document ID (optional)
- **file** (multipart/form-data): Files that need to be uploaded

#### Example Request

```bash
curl --location --request POST 'http://10.27.27.27/v1/datasets/{dataset_id}/document/create-by-file' \
--header 'Authorization: Bearer {api_key}' \
--form 'data="{"indexing_technique":"high_quality","process_rule":{"rules":{"pre_processing_rules":[{"id":"remove_extra_spaces","enabled":true},{"id":"remove_urls_emails","enabled":true}],"segmentation":{"separator":"###","max_tokens":500}},"mode":"custom"}}";type=text/plain' \
--form 'file=@"/path/to/file"'
```

#### Response

```json
{
  "document": {
    "id": "",
    "position": 1,
    "data_source_type": "upload_file",
    "data_source_info": {
      "upload_file_id": ""
    },
    "dataset_process_rule_id": "",
    "name": "Dify.txt",
    "created_from": "api",
    "created_by": "",
    "created_at": 1695308667,
    "tokens": 0,
    "indexing_status": "waiting",
    "error": null,
    "enabled": true,
    "disabled_at": null,
    "disabled_by": null,
    "archived": false,
    "display_status": "queuing",
    "word_count": 0,
    "hit_count": 0,
    "doc_form": "text_model"
  },
  "batch": ""
}
```

---

### Create an Empty Knowledge Base

**POST** `/datasets`

#### Request Body

- **name** (string): Knowledge name
- **description** (string): Knowledge description (optional)
- **indexing_technique** (string): Index technique (optional)
  - `high_quality`
  - `economy`
- **permission** (string): Permission
  - `only_me`
  - `all_team_members`
  - `partial_members`
- **provider** (string): Provider (optional, default: vendor)
  - `vendor`
  - `external`
- **external_knowledge_api_id** (str): External knowledge API ID (optional)
- **external_knowledge_id** (str): External knowledge ID (optional)

#### Example Request

```bash
curl --location --request POST 'http://10.27.27.27/v1/datasets' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "name", "permission": "only_me"}'
```

#### Response

```json
{
  "id": "",
  "name": "name",
  "description": null,
  "provider": "vendor",
  "permission": "only_me",
  "data_source_type": null,
  "indexing_technique": null,
  "app_count": 0,
  "document_count": 0,
  "word_count": 0,
  "created_by": "",
  "created_at": 1695636173,
  "updated_by": "",
  "updated_at": 1695636173,
  "embedding_model": null,
  "embedding_model_provider": null,
  "embedding_available": null
}
```

---

### Get Knowledge Base List

**GET** `/datasets`

#### Query Parameters

- **page** (string): Page number
- **limit** (string): Number of items returned, default 20, range 1-100

#### Example Request

```bash
curl --location --request GET 'http://10.27.27.27/v1/datasets?page=1&limit=20' \
--header 'Authorization: Bearer {api_key}'
```

#### Response

```json
{
  "data": [
    {
      "id": "",
      "name": "name",
      "description": "desc",
      "permission": "only_me",
      "data_source_type": "upload_file",
      "indexing_technique": "",
      "app_count": 2,
      "document_count": 10,
      "word_count": 1200,
      "created_by": "",
      "created_at": "",
      "updated_by": "",
      "updated_at": ""
    }
  ],
  "has_more": true,
  "limit": 20,
  "total": 50,
  "page": 1
}
```

---

### Delete a Knowledge Base

**DELETE** `/datasets/{dataset_id}`

#### Parameters

- **dataset_id** (string): Knowledge ID

#### Example Request

```bash
curl --location --request DELETE 'http://10.27.27.27/v1/datasets/{dataset_id}' \
--header 'Authorization: Bearer {api_key}'
```

#### Response

```
204 No Content
```

---

### Update a Document with Text

**POST** `/datasets/{dataset_id}/documents/{document_id}/update-by-text`

This API updates the document through text based on existing knowledge.

#### Parameters

- **dataset_id** (string): Knowledge ID
- **document_id** (string): Document ID

#### Request Body

- **name** (string): Document name (optional)
- **text** (string): Document content (optional)
- **process_rule** (object): Processing rules

#### Example Request

```bash
curl --location --request POST 'http://10.27.27.27/v1/datasets/{dataset_id}/documents/{document_id}/update-by-text' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{"name": "name","text": "text"}'
```

#### Response

```json
{
  "document": {
    "id": "",
    "position": 1,
    "data_source_type": "upload_file",
    "data_source_info": {
      "upload_file_id": ""
    },
    "dataset_process_rule_id": "",
    "name": "name.txt",
    "created_from": "api",
    "created_by": "",
    "created_at": 169 
 ```
```json
5308667,
    "tokens": 0,
    "indexing_status": "waiting",
    "error": null,
    "enabled": true,
    "disabled_at": null,
    "disabled_by": null,
    "archived": false,
    "display_status": "queuing",
    "word_count": 0,
    "hit_count": 0,
    "doc_form": "text_model"
  },
  "batch": ""
}
```

---

### Update a Document with a File

**POST** `/datasets/{dataset_id}/documents/{document_id}/update-by-file`

This API updates documents through files based on existing knowledge.

#### Parameters

- **dataset_id** (string): Knowledge ID
- **document_id** (string): Document ID

#### Request Body

- **name** (string): Document name (optional)
- **file** (multipart/form-data): Files to be uploaded
- **process_rule** (object): Processing rules

#### Example Request

```bash
curl --location --request POST 'http://10.27.27.27/v1/datasets/{dataset_id}/documents/{document_id}/update-by-file' \
--header 'Authorization: Bearer {api_key}' \
--form 'data="{"name":"Dify","indexing_technique":"high_quality","process_rule":{"rules":{"pre_processing_rules":[{"id":"remove_extra_spaces","enabled":true},{"id":"remove_urls_emails","enabled":true}],"segmentation":{"separator":"###","max_tokens":500}},"mode":"custom"}}";type=text/plain' \
--form 'file=@"/path/to/file"'
```

#### Response

```json
{
  "document": {
    "id": "",
    "position": 1,
    "data_source_type": "upload_file",
    "data_source_info": {
      "upload_file_id": ""
    },
    "dataset_process_rule_id": "",
    "name": "Dify.txt",
    "created_from": "api",
    "created_by": "",
    "created_at": 1695308667,
    "tokens": 0,
    "indexing_status": "waiting",
    "error": null,
    "enabled": true,
    "disabled_at": null,
    "disabled_by": null,
    "archived": false,
    "display_status": "queuing",
    "word_count": 0,
    "hit_count": 0,
    "doc_form": "text_model"
  },
  "batch": "20230921150427533684"
}
```

---

### Get Document Embedding Status (Progress)

**GET** `/datasets/{dataset_id}/documents/{batch}/indexing-status`

#### Parameters

- **dataset_id** (string): Knowledge ID
- **batch** (string): Batch number of uploaded documents

#### Example Request

```bash
curl --location --request GET 'http://10.27.27.27/v1/datasets/{dataset_id}/documents/{batch}/indexing-status' \
--header 'Authorization: Bearer {api_key}'
```

#### Response

```json
{
  "data": [{
    "id": "",
    "indexing_status": "indexing",
    "processing_started_at": 1681623462.0,
    "parsing_completed_at": 1681623462.0,
    "cleaning_completed_at": 1681623462.0,
    "splitting_completed_at": 1681623462.0,
    "completed_at": null,
    "paused_at": null,
    "error": null,
    "stopped_at": null,
    "completed_segments": 24,
    "total_segments": 100
  }]
}
```

---

### Delete a Document

**DELETE** `/datasets/{dataset_id}/documents/{document_id}`

#### Parameters

- **dataset_id** (string): Knowledge ID
- **document_id** (string): Document ID

#### Example Request

```bash
curl --location --request DELETE 'http://10.27.27.27/v1/datasets/{dataset_id}/documents/{document_id}' \
--header 'Authorization: Bearer {api_key}'
```

#### Response

```json
{
  "result": "success"
}
```

---

### Get the Document List of a Knowledge Base

**GET** `/datasets/{dataset_id}/documents`

#### Parameters

- **dataset_id** (string): Knowledge ID

#### Query Parameters

- **keyword** (string): Search keywords, currently only search document names (optional)
- **page** (string): Page number (optional)
- **limit** (string): Number of items returned, default 20, range 1-100 (optional)

#### Example Request

```bash
curl --location --request GET 'http://10.27.27.27/v1/datasets/{dataset_id}/documents' \
--header 'Authorization: Bearer {api_key}'
```

#### Response

```json
{
  "data": [
    {
      "id": "",
      "position": 1,
      "data_source_type": "file_upload",
      "data_source_info": null,
      "dataset_process_rule_id": null,
      "name": "dify",
      "created_from": "",
      "created_by": "",
      "created_at": 1681623639,
      "tokens": 0,
      "indexing_status": "waiting",
      "error": null,
      "enabled": true,
      "disabled_at": null,
      "disabled_by": null,
      "archived": false
    }
  ],
  "has_more": false,
  "limit": 20,
  "total": 9,
  "page": 1
}
```

---

### Add Chunks to a Document

**POST** `/datasets/{dataset_id}/documents/{document_id}/segments`

#### Parameters

- **dataset_id** (string): Knowledge ID
- **document_id** (string): Document ID

#### Request Body

- **segments** (object list): 
  - **content** (text): Text content / question content, required
  - **answer** (text): Answer content, if the mode of the knowledge is Q&A mode, pass the value (optional)
  - **keywords** (list): Keywords (optional)

#### Example Request

```bash
curl --location --request POST 'http://10.27.27.27/v1/datasets/{dataset_id}/documents/{document_id}/segments' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{"segments": [{"content": "1","answer": "1","keywords": ["a"]}]}'
```

#### Response

```json
{
  "data": [{
    "id": "",
    "position": 1,
    "document_id": "",
    "content": "1",
    "answer": "1",
    "word_count": 25,
    "tokens": 0,
    "keywords": [
      "a"
    ],
    "index_node_id": "",
    "index_node_hash": "",
    "hit_count": 0,
    "enabled": true,
    "disabled_at": null,
    "disabled_by": null,
    "status": "completed",
    "created_by": "",
    "created_at": 1695312007,
    "indexing_at": 1695312007,
    "completed_at": 1695312007,
    "error": null,
    "stopped_at": null
  }],
  "doc_form": "text_model"
}
```

---

### Get Chunks from a Document

**GET** `/datasets/{dataset_id}/documents/{document_id}/segments`

#### Path Parameters

- **dataset_id** (string): Knowledge ID
- **document_id** (string): Document ID

#### Query Parameters

- **keyword** (string): Keyword (optional)
- **status** (string): Search status, completed

#### Example Request

```bash
curl --location --request GET 'http://10.27.27.27/v1/datasets/{dataset_id}/documents/{document_id}/segments' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json'
```

#### Response

```json
{
  "data": [{
    "id": "",
    "position": 1,
    "document_id": "",
    "content": "1",
    "answer": "1",
    "word_count": 25,
    "tokens": 0,
    "keywords": [
        "a"
    ],
    "index_node_id": "",
    "index_node_hash": "",
    "hit_count": 0,
    "enabled": true,
    "disabled_at": null,
    "disabled_by": null,
    "status": "completed",
    "created_by": "",
    "created_at": 1695312007,
    "indexing_at": 1695312007,
    "completed_at": 1695312007,
    "error": null,
    "stopped_at": null
  }],
  "doc_form": "text_model"
}
```

---

### Delete a Chunk in a Document

**DELETE** `/datasets/{dataset_id}/documents/{document_id}/segments/{segment_id}`

#### Path Parameters

- **dataset_id** (string): Knowledge ID
- **document_id** (string): Document ID
- **segment_id** (string): Document Segment ID

#### Example Request

```bash
curl --location --request DELETE 'http://10.27.27.27/v1/datasets/{dataset_id}/segments 
 ```
```bash
curl --location --request DELETE 'http://10.27.27.27/v1/datasets/{dataset_id}/documents/{document_id}/segments/{segment_id}' \
--header 'Authorization: Bearer {api_key}'
```

#### Response

```json
{
  "result": "success"
}
```

---

### Update a Chunk in a Document

**PATCH** `/datasets/{dataset_id}/documents/{document_id}/segments/{segment_id}`

#### Path Parameters

- **dataset_id** (string): Knowledge ID
- **document_id** (string): Document ID
- **segment_id** (string): Document Segment ID

#### Request Body

- **content** (text): Updated text content / question content, required
- **answer** (text): Updated answer content, if the mode of the knowledge is Q&A mode, pass the value (optional)
- **keywords** (list): Updated keywords (optional)

#### Example Request

```bash
curl --location --request PATCH 'http://10.27.27.27/v1/datasets/{dataset_id}/documents/{document_id}/segments/{segment_id}' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{"content": "Updated content","answer": "Updated answer","keywords": ["updated", "keywords"]}'
```

#### Response

```json
{
  "data": {
    "id": "",
    "position": 1,
    "document_id": "",
    "content": "Updated content",
    "answer": "Updated answer",
    "word_count": 30,
    "tokens": 0,
    "keywords": [
      "updated",
      "keywords"
    ],
    "index_node_id": "",
    "index_node_hash": "",
    "hit_count": 0,
    "enabled": true,
    "disabled_at": null,
    "disabled_by": null,
    "status": "completed",
    "created_by": "",
    "created_at": 1695312007,
    "indexing_at": 1695312007,
    "completed_at": 1695312007,
    "error": null,
    "stopped_at": null
  },
  "doc_form": "text_model"
}
```

---
# Retrieve Chunks from a Knowledge Base

## Endpoint

**POST** `/datasets/{dataset_id}/retrieve`

### Path Parameters

- **Name:** `dataset_id`
  - **Type:** string
  - **Description:** Knowledge ID

### Request Body

- **Name:** `query`
  - **Type:** string
  - **Description:** Query keyword

- **Name:** `retrieval_model`
  - **Type:** object
  - **Description:** Retrieval model (optional, if not filled, it will be recalled according to the default method)
  
  - **Fields:**
    - **`search_method`** (text): Search method. One of the following four keywords is required:
      - `keyword_search`: Keyword search
      - `semantic_search`: Semantic search
      - `full_text_search`: Full-text search
      - `hybrid_search`: Hybrid search
    - **`reranking_enable`** (bool): Whether to enable reranking, required if the search mode is `semantic_search` or `hybrid_search` (optional)
    - **`reranking_mode`** (object): Rerank model configuration, required if reranking is enabled
      - **`reranking_provider_name`** (string): Rerank model provider
      - **`reranking_model_name`** (string): Rerank model name
    - **`weights`** (double): Semantic search weight setting in hybrid search mode
    - **`top_k`** (integer): Number of results to return (optional)
    - **`score_threshold_enabled`** (bool): Whether to enable score threshold
    - **`score_threshold`** (double): Score threshold

- **Name:** `external_retrieval_model`
  - **Type:** object
  - **Description:** Unused field

### Example Request

```bash
curl --location --request POST 'http://10.27.27.27/v1/datasets/{dataset_id}/retrieve' \
--header 'Authorization: Bearer {api_key}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "query": "test",
    "retrieval_model": {
        "search_method": "keyword_search",
        "reranking_enable": false,
        "reranking_mode": null,
        "reranking_model": {
            "reranking_provider_name": "",
            "reranking_model_name": ""
        },
        "weights": null,
        "top_k": 1,
        "score_threshold_enabled": false,
        "score_threshold": null
    }
}'
```

### Response

```json
{
  "query": {
    "content": "test"
  },
  "records": [
    {
      "segment": {
        "id": "7fa6f24f-8679-48b3-bc9d-bdf28d73f218",
        "position": 1,
        "document_id": "a8c6c36f-9f5d-4d7a-8472-f5d7b75d71d2",
        "content": "Operation guide",
        "answer": null,
        "word_count": 847,
        "tokens": 280,
        "keywords": [
          "install",
          "java",
          "base",
          "scripts",
          "jdk",
          "manual",
          "internal",
          "opens",
          "add",
          "vmoptions"
        ],
        "index_node_id": "39dd8443-d960-45a8-bb46-7275ad7fbc8e",
        "index_node_hash": "0189157697b3c6a418ccf8264a09699f25858975578f3467c76d6bfc94df1d73",
        "hit_count": 0,
        "enabled": true,
        "disabled_at": null,
        "disabled_by": null,
        "status": "completed",
        "created_by": "dbcb1ab5-90c8-41a7-8b78-73b235eb6f6f",
        "created_at": 1728734540,
        "indexing_at": 1728734552,
        "completed_at": 1728734584,
        "error": null,
        "stopped_at": null,
        "document": {
          "id": "a8c6c36f-9f5d-4d7a-8472-f5d7b75d71d2",
          "data_source_type": "upload_file",
          "name": "readme.txt",
          "doc_type": null
        }
      },
      "score": 3.730463140527718e-05,
      "tsne_position": null
    }
  ]
}
```
---
# Error Message

## Fields

- **Name:** `code`
  - **Type:** string
  - **Description:** Error code

- **Name:** `status`
  - **Type:** number
  - **Description:** Error status

- **Name:** `message`
  - **Type:** string
  - **Description:** Error message

## Example

```json
{
  "code": "no_file_uploaded",
  "message": "Please upload your file.",
  "status": 400
}
```

## Error Codes

| Code                        | Status | Message                                                                                   |
|-----------------------------|--------|-------------------------------------------------------------------------------------------|
| `no_file_uploaded`          | 400    | Please upload your file.                                                                  |
| `too_many_files`            | 400    | Only one file is allowed.                                                                 |
| `file_too_large`            | 413    | File size exceeded.                                                                       |
| `unsupported_file_type`     | 415    | File type not allowed.                                                                    |
| `high_quality_dataset_only` | 400    | Current operation only supports 'high-quality' datasets.                                  |
| `dataset_not_initialized`   | 400    | The dataset is still being initialized or indexing. Please wait a moment.                 |
| `archived_document_immutable` | 403  | The archived document is not editable.                                                    |
| `dataset_name_duplicate`    | 409    | The dataset name already exists. Please modify your dataset name.                         |
| `invalid_action`            | 400    | Invalid action.                                                                           |
| `document_already_finished` | 400    | The document has been processed. Please refresh the page or go to the document details.   |
| `document_indexing`         | 400    | The document is being processed and cannot be edited.                                     |
| `invalid_metadata`          | 400    | The metadata content is incorrect. Please check and verify.                               |