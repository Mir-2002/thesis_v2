import ast
import tokenize
from io import StringIO
from typing import List

def parse_python_file(file_content: str, skip_list: List[str] = []) -> List[dict]:
    tree = ast.parse(file_content)
    parsed_data = []

    comments = []
    tokens = tokenize.generate_tokens(StringIO(file_content).readline)
    for token in tokens:
        if token.type == tokenize.COMMENT:
            comments.append(token.string)

    comment_index = 0
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
            if node.name.lower() in skip_list:
                continue
            docstring = ast.get_docstring(node)
            node_comments = []
            if comment_index < len(comments):
                node_comments.append(comments[comment_index])
                comment_index += 1
            parsed_data.append({
                "type": "function" if isinstance(node, ast.FunctionDef) else "class",
                "name": node.name,
                "docstring": docstring if docstring else "",
                "comments": node_comments
            })

    return parsed_data