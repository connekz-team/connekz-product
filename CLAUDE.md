# Project Workspace

You have full permissions in this workspace.
Use the memory tools via curl when you need to persist or retrieve knowledge:

## Memory Read (semantic search)
curl -s -X POST "http://host.docker.internal:3333/api/v1/agent-api/memory/read" \
  -H "Authorization: Bearer cnex-agent-key-dev-2026" \
  -H "Content-Type: application/json" \
  -d '{"projectId": "f26e4f63-4858-4ae1-8908-822e67e63c94", "query": "your search query", "limit": 10}'

## Memory Write
curl -s -X POST "http://host.docker.internal:3333/api/v1/agent-api/memory/write" \
  -H "Authorization: Bearer cnex-agent-key-dev-2026" \
  -H "Content-Type: application/json" \
  -d '{"projectId": "f26e4f63-4858-4ae1-8908-822e67e63c94", "content": "memory content", "summary": "brief summary"}'