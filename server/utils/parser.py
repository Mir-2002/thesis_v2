import ast
import tokenize
from io import StringIO

def parse_python_file(file_content):
    tree = ast.parse(file_content)
    parsed_data = []

    comments = []
    tokens = tokenize.generate_tokens(StringIO(file_content).readline)
    for tokens in tokens:
        if tokens.type == tokenize.COMMENT:
            comments.append(tokens.string)

    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
            docstring = ast.get_docstring(node)
            parsed_data.append({
                "type": "function" if isinstance(node, ast.FunctionDef) else "class",
                "name": node.name,
                "docstring" : docstring if docstring else "",
                "comments" : comments if comments else ""
            })

    return parsed_data