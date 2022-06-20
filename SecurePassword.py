import secrets
import string

print(secrets.choice("ab"))
print(secrets.token_bytes())
print(secrets.token_urlsafe())
chars = string.digits + string.ascii_letters + string.punctuation
print(len(chars)) # Entropie: 6,555, Min: 100 Bit
print(''.join(secrets.choice(chars) for _ in range(45)))