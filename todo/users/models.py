from django.db import models
from django.contrib.auth.models import AbstractUser


class TodoUser(AbstractUser):
    email = models.EmailField(unique=True)
