# import ast
# import tokenize
# import os
# from io import StringIO
# from typing import List
# from models.folder import Folder, Directory, File

# def parse_python_file(file_content: str, skip_list: List[str] = []) -> List[dict]:
#     tree = ast.parse(file_content)
#     parsed_data = []

#     comments = []
#     tokens = tokenize.generate_tokens(StringIO(file_content).readline)
#     for token in tokens:
#         if token.type == tokenize.COMMENT:
#             comments.append(token.string)

#     comment_index = 0
#     for node in ast.walk(tree):
#         if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
#             if node.name.lower() in skip_list:
#                 continue
#             docstring = ast.get_docstring(node)
#             node_comments = []
#             if comment_index < len(comments):
#                 node_comments.append(comments[comment_index])
#                 comment_index += 1
#             parsed_data.append({
#                 "type": "function" if isinstance(node, ast.FunctionDef) else "class",
#                 "name": node.name,
#                 "docstring": docstring if docstring else "",
#                 "comments": node_comments
#             })

#     return parsed_data

# # def parse_folder(folder_path: str, skip_list: List[str] = []) -> Folder:
# #     foldername = os.path.basename(folder_path)
# #     directories = []

# #     for root, dirs, files in os.walk(folder_path):
# #         dirname = os.path.relpath(root, folder_path)
# #         if dirname.lower() in skip_list:
# #             continue

# #         file_list = []
# #         for file in files:
# #             if file.lower() in skip_list:
# #                 continue
# #             file_path = os.path.join(root, file)
# #             with open(file_path, "r") as f:
# #                 file_content = f.read()
# #             file_list.append(File(filename=file, path=file_path, parsed_data=parse_python_file(file_content, skip_list)))

# #         directories.append(Directory(dirname=dirname, files=file_list))

# #     return Folder(foldername=foldername, directories=directories)

# def parse_folder(folder_path: str, function_skip_list: List[str] = [], file_skip_list: List[str] = [], folder_skip_list: List[str] = []) -> Folder:
#     foldername = os.path.basename(folder_path)
#     directories = []

#     for root, dirs, files in os.walk(folder_path):
#         dirname = os.path.relpath(root, folder_path)
#         if dirname.lower() in folder_skip_list:
#             continue

#         file_list = []
#         for file in files:
#             if file.lower() in file_skip_list:
#                 continue
#             file_path = os.path.join(root, file)
#             with open(file_path, "r") as f:
#                 file_content = f.read()
#             file_list.append(File(filename=file, path=file_path, parsed_data=parse_python_file(file_content, function_skip_list)))

#         directories.append(Directory(dirname=dirname, files=file_list))

#     return Folder(foldername=foldername, directories=directories)

import ast
import tokenize
import os
from io import StringIO
from typing import List
import logging
from models.folder import Folder, Directory, File

logger = logging.getLogger(__name__)

def parse_python_file(file_content: str, skip_list: List[str] = []) -> List[dict]:
    try:
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
    except SyntaxError:
        logger.warning(f"File is not a valid Python file or contains syntax errors")
        return []
    except Exception as e:
        logger.error(f"Error parsing file: {str(e)}")
        return []

def parse_folder(folder_path: str, function_skip_list: List[str] = [], file_skip_list: List[str] = [], folder_skip_list: List[str] = []) -> Folder:
    try:
        foldername = os.path.basename(folder_path)
        logger.debug(f"Parsing folder: {foldername}")
        directories = []

        for root, dirs, files in os.walk(folder_path):
            dirname = os.path.relpath(root, folder_path)
            if dirname.lower() in folder_skip_list:
                logger.debug(f"Skipping folder in skip list: {dirname}")
                continue

            file_list = []
            for file in files:
                if file.lower() in file_skip_list:
                    logger.debug(f"Skipping file in skip list: {file}")
                    continue
                    
                file_path = os.path.join(root, file)
                logger.debug(f"Processing file: {file_path}")
                
                try:
                    with open(file_path, "r", encoding='utf-8') as f:
                        file_content = f.read()
                    
                    # Only parse Python files
                    if file.endswith('.py'):
                        parsed_data = parse_python_file(file_content, function_skip_list)
                    else:
                        parsed_data = []
                        
                    file_list.append(File(
                        filename=file,
                        path=file_path,
                        parsed_data=parsed_data
                    ))
                except UnicodeDecodeError:
                    logger.warning(f"Skipping binary file: {file_path}")
                    continue
                except Exception as e:
                    logger.error(f"Error processing file {file_path}: {str(e)}")
                    continue

            directories.append(Directory(dirname=dirname, files=file_list))

        return Folder(foldername=foldername, directories=directories)
    except Exception as e:
        logger.error(f"Error parsing folder: {str(e)}")
        raise Exception(f"Failed to parse folder: {str(e)}")

    