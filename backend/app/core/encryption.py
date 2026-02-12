"""
BotForge - AES-256-GCM Encryption for API Keys.

Encrypts/decrypts user Binance API keys at rest.
Each ciphertext includes a random nonce (IV) prepended to the data.
"""

import base64
import os

from cryptography.hazmat.primitives.ciphers.aead import AESGCM

from app.core.config import settings


def _get_key() -> bytes:
    """
    Derive the 32-byte encryption key from configuration.

    The ENCRYPTION_KEY setting should be a base64-encoded 32-byte key.
    """
    key_b64 = settings.ENCRYPTION_KEY
    try:
        key = base64.b64decode(key_b64)
        if len(key) != 32:
            raise ValueError(
                f"Encryption key must be 32 bytes, got {len(key)}"
            )
        return key
    except Exception:
        # Fallback for development: derive from string
        return key_b64.encode("utf-8").ljust(32, b"\0")[:32]


def encrypt(plaintext: str) -> str:
    """
    Encrypt a string using AES-256-GCM.

    Returns base64-encoded string containing nonce + ciphertext.
    """
    key = _get_key()
    aesgcm = AESGCM(key)
    nonce = os.urandom(12)  # 96-bit nonce
    ciphertext = aesgcm.encrypt(nonce, plaintext.encode("utf-8"), None)
    # Prepend nonce to ciphertext and base64 encode
    return base64.b64encode(nonce + ciphertext).decode("utf-8")


def decrypt(encrypted: str) -> str:
    """
    Decrypt a base64-encoded AES-256-GCM ciphertext.

    Expects format: base64(nonce[12] + ciphertext).
    """
    key = _get_key()
    aesgcm = AESGCM(key)
    raw = base64.b64decode(encrypted)
    nonce = raw[:12]
    ciphertext = raw[12:]
    plaintext = aesgcm.decrypt(nonce, ciphertext, None)
    return plaintext.decode("utf-8")
