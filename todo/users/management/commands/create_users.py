from django.core.management.base import BaseCommand

from todoapp.models import Project
from users.models import TodoUser


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        user = TodoUser.objects.filter(username='admin').first()
        if not user:
            TodoUser.objects.create_superuser(
                username='admin',
                first_name='first_name_ad',
                last_name='last_name_mim',
                password='1',
                is_staff=True,
                email='admin@mail.ru')
            TodoUser.objects.create_user(username='user', password='2', email='user@mail.ru')

