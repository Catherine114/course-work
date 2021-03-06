# Generated by Django 4.0.4 on 2022-04-21 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('email', models.EmailField(max_length=60, unique=True, verbose_name='Email')),
                ('first_name', models.CharField(max_length=255, verbose_name='Имя')),
                ('last_name', models.CharField(max_length=255, verbose_name='Фамилия')),
                ('middle_name', models.CharField(blank=True, max_length=255, verbose_name='Отчество')),
                ('extra_info', models.TextField(verbose_name='Дополнительная информация')),
                ('date_of_birth', models.DateField(null=True, verbose_name='Дата рождения')),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='Последний вход')),
                ('is_active', models.BooleanField(default=False, verbose_name='Активирован')),
                ('is_admin', models.BooleanField(default=False, verbose_name='Администратор')),
                ('is_staff', models.BooleanField(default=False, verbose_name='Персонал')),
                ('is_superuser', models.BooleanField(default=False)),
                ('abonements', models.ManyToManyField(blank=True, to='api.abonement', verbose_name='Абонементы')),
            ],
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Пользователи',
            },
        ),
    ]
