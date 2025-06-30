def extract_names(full_name: str):
    if not full_name:
        return None, None

    parts = full_name.strip().split()
    first_name = parts[0]
    last_name = parts[1] if len(parts) > 1 else ""

    return first_name, last_name