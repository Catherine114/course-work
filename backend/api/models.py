from django.db import models


class Access(models.Model):
    name = models.CharField(verbose_name='Наименование', max_length=255)
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип доступа'
        verbose_name_plural = 'Типы доступа'


class Abonement(models.Model):
    duration = models.CharField(verbose_name='Длительность', max_length=255)
    price = models.PositiveIntegerField(verbose_name='Цена')
    type_of_access = models.ManyToManyField(Access, verbose_name='Доступы')
    visitings = models.IntegerField(verbose_name='Оставшиеся посещения')

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Абонемент'
        verbose_name_plural = 'Абонементы'


class Timetable(models.Model):
    DAY_CHOICES = (
        ('Понедельник', 'Понедельник'),
        ('Вторник', 'Вторник'),
        ('Среда', 'Среда'),
        ('Четверг', 'Четверг'),
        ('Пятница', 'Пятница'),
        ('Суббота', 'Суббота'),
        ('Воскресенье', 'Воскресенье'),
    )

    day_of_week = models.CharField(verbose_name='День недели', max_length=255, choices=DAY_CHOICES)
    start_time = models.TimeField(verbose_name='Время начала', auto_now=False, auto_now_add=False)
    finish_time = models.TimeField(verbose_name='Время конца', auto_now=False, auto_now_add=False)

    def __str__(self):
        return str(self.id)

    class Meta:
        verbose_name = 'Расписание'
        verbose_name_plural = 'Расписания'


class Classes(models.Model):
    name = models.CharField(verbose_name='Название', max_length=255)
    duration = models.IntegerField(verbose_name='Длительность, минуты')
    description = models.TextField(verbose_name='Описание')
    price = models.PositiveIntegerField(verbose_name='Цена')
    timetables = models.ManyToManyField(Timetable, verbose_name='Расписания')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Занятие'
        verbose_name_plural = 'Занятия'


class Instructor(models.Model):
    first_name = models.CharField(verbose_name='Имя', max_length=255)
    last_name = models.CharField(verbose_name='Фамилия', max_length=255)
    middle_name = models.CharField(verbose_name='Отчество', max_length=255, blank=True)
    date_of_birth = models.DateField(verbose_name='Дата рождения', auto_now=False, auto_now_add=False, null=True)
    description = models.TextField(verbose_name='Дополнительная информация')
    cost = models.PositiveIntegerField(verbose_name='Цена в час')
    SEX_CHOICES = (
        ('М', 'Мужской'),
        ('Ж', 'Женский'),
    )

    sex = models.CharField(max_length=255, verbose_name='Пол',choices=SEX_CHOICES)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    class Meta:
        verbose_name = 'Тренер'
        verbose_name_plural = 'Тренера'
