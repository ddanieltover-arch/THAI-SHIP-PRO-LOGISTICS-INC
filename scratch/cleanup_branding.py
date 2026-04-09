import os
import re

directory = 'public'

def cleanup_rebranding():
    files_to_check = [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.html')]
    
    # Define exact patterns to clean up resulting from double replacements
    patterns = [
        (re.compile(r"CO\., LTD\s+CO\., LTD", re.IGNORECASE), "CO., LTD"),
        (re.compile(r"CO\., LTD\s+Co\., Ltd", re.IGNORECASE), "CO., LTD"),
        (re.compile(r"Thai Pro Logistics 2018 Co\., Ltd Co\., Ltd", re.IGNORECASE), "Thai Pro Logistics 2018 Co., Ltd"),
        (re.compile(r"THAI PRO LOGISTICS 2018 CO\., LTD CO\., LTD", re.IGNORECASE), "THAI PRO LOGISTICS 2018 CO., LTD"),
    ]

    for filepath in files_to_check:
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply cleanup patterns
        for pattern, replacement in patterns:
            content = pattern.sub(replacement, content)

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"CLEANED: {filepath}")
        else:
            print(f"NO CLEANUP NEEDED: {filepath}")

if __name__ == "__main__":
    cleanup_rebranding()
