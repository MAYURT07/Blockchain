# Blockchain (Beginner-Friendly)

This repository gives you a **very simple** idea of how a blockchain works.

## What is a blockchain?

Think of a blockchain like a notebook:

- Each page is a **block**.
- Each page stores some data.
- Every page also stores the fingerprint (hash) of the page before it.
- If someone changes an old page, fingerprints no longer match, so we know something was changed.

That is the core idea: **linked blocks + tamper detection**.

## Super small example (Python)

```python
import hashlib
import json


def make_hash(data):
    text = json.dumps(data, sort_keys=True).encode()
    return hashlib.sha256(text).hexdigest()


def new_block(index, data, previous_hash):
    block = {
        "index": index,
        "data": data,
        "previous_hash": previous_hash,
    }
    block["hash"] = make_hash(block)
    return block


# Genesis block (first block)
chain = [new_block(0, "Genesis", "0")]

# Add one block
chain.append(new_block(1, "Alice pays Bob 5", chain[-1]["hash"]))

print(chain)
```

## What to notice in the code

- `previous_hash` links one block to the block before it.
- `hash` acts like a fingerprint for the block content.
- If block data changes, the hash changes.

## Important beginner note

Real blockchains are much more complex:

- peer-to-peer networking
- digital signatures
- consensus rules
- mining or validators

But this mini example helps you understand the **foundation** first.
