from django.core.management.base import BaseCommand
import json
import os
from todo.settings import BASE_DIR
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Create some users from JSON file '

    def handle(self, *args, **kwargs):
        users = json.load(open(os.path.join(BASE_DIR, 'json/users_list.json')))
        User = get_user_model()
        for user in users:
            if not User.objects.filter(username=user['username']).exists():
                if user['username'] == 'admin':
                    User.objects.create_superuser(
                        username=user['username'],
                        email=user['email'],
                        password=user['password']
                    )
                else:
                    User.objects.create_user(
                        username=user['username'],
                        email=user['email'],
                        password=user['password'],
                        is_staff='True'
                    )
