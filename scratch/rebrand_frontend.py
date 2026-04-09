import os
import re

# Configuration
directory = 'public'
new_brand_full = "THAI PRO LOGISTICS 2018 CO., LTD"
new_brand_display = "Thai Pro Logistics 2018 Co., Ltd"

replacements = [
    (r"Thai Ship Pro Logistics Inc", new_brand_full),
    (r"THAI SHIP PRO LOGISTICS INC", new_brand_full),
    (r"Thai Pro Logistics 2018", new_brand_display),
    (r"THAI PRO LOGISTICS 2018", new_brand_full),
]

# Specifically targeting the problematic tags with more flexibility
tag_replacements = [
    # Match <h3...>Thai Pro Logistics 2018</h3>
    (re.compile(r"(<h3[^>]*>)\s*Thai Pro Logistics 2018\s*(</h3>)", re.IGNORECASE), r"\1Thai Pro Logistics 2018 Co., Ltd\2"),
    # Match <span ...>Thai Pro Logistics 2018</span>
    (re.compile(r"(<span[^>]*>)\s*Thai Pro Logistics 2018\s*(</span>)", re.IGNORECASE), r"\1Thai Pro Logistics 2018 Co., Ltd\2"),
]

def rebrand_files():
    # Also check README.md
    files_to_check = [os.path.join(directory, f) for f in os.listdir(directory) if f.endswith('.html')]
    files_to_check.append('README.md')
    files_to_check.append('public/global.js')

    for filepath in files_to_check:
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Apply tag replacements first
        for pattern, replacement in tag_replacements:
            content = pattern.sub(replacement, content)
        
        # Apply general string replacements
        for old, new in sorted(replacements, key=lambda x: len(x[0]), reverse=True):
            # Check for existing before replacing to avoid Thai Pro Logistics 2018 -> Co., Ltd Co., Ltd
            content = re.sub(re.escape(old), new, content, flags=re.IGNORECASE)

        # Cleanup potential double "Co., Ltd Co., Ltd"
        content = re.sub(r"Co\., Ltd\s+Co\., Ltd", "Co., Ltd", content, flags=re.IGNORECASE)
        content = re.sub(r"CO\., LTD\s+CO\., LTD", "CO., LTD", content, flags=re.IGNORECASE)

        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"DONE: {filepath}")
        else:
            print(f"SKIP: {filepath}")

if __name__ == "__main__":
    rebrand_files()
