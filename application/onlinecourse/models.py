from django.db import models

from dataprocessing.models import Items

from workprogramsapp.models import FieldOfStudy, WorkProgram


class Institution(models.Model):
    """
    Модель для правообладателей онлайн курсов
    """
    title = models.CharField(max_length=1024, verbose_name='Название', blank=False, null=False)

    class Meta:
        verbose_name = 'Правообладатель'
        verbose_name_plural = 'Правообладатели'

    def __str__(self):
        return self.title


class Platform(models.Model):
    """
    Модель для платформ, на которых размещены онлайн курсы
    """
    title = models.CharField(max_length=1024, verbose_name='Название', blank=False, null=False)

    class Meta:
        verbose_name = 'Платформа'
        verbose_name_plural = 'Платформы'

    def __str__(self):
        return self.title


class OnlineCourse(models.Model):
    """
    Модель онлайн курса
    """
    title = models.CharField(max_length=1024, verbose_name='Название', blank=False, null=False)
    description = models.TextField(verbose_name='Описание', blank=False, null=False)
    institution = models.ForeignKey('Institution', on_delete=models.CASCADE, verbose_name="Правообладатель", blank=False,
                                    null=False)
    platform = models.ForeignKey('Platform', on_delete=models.CASCADE, verbose_name="Платформа", blank=False,
                                 null=False)
    LanguageChoices = [
        ('ru', 'Русский'),
        ('en', 'Английский'),
        ('ru/en', 'Русский/Английский'),
    ]
    language = models.CharField(
        max_length=5,
        choices=LanguageChoices,
        verbose_name='Язык онлайн курса',
        blank=False, null=False
    )
    started_at = models.DateField(blank=True, null=True, verbose_name='Дата начала курса')
    created_at = models.DateField(blank=True, null=True, verbose_name='Дата создания курса')
    record_end_at = models.DateField(blank=True, null=True, verbose_name='Дата окончания записи на курс')
    finished_at = models.DateField(blank=True, null=True, verbose_name='Дата окончания курса')
    rating = models.FloatField(blank=True, null=True, verbose_name='Рейтинг пользователей')
    experts_rating = models.FloatField(blank=True, null=True, verbose_name='Рейтинг экспертов')
    visitors_number = models.IntegerField(blank=True, null=True,
                                          verbose_name='Количество записавшихся на текущую сессию')
    total_visitors_number = models.IntegerField(blank=True, null=True,
                                                verbose_name='Количество записавшихся на все сессии онлайн курса')
    duration = models.IntegerField(blank=True, null=True, verbose_name='Длительность онлайн курса, недель')
    volume = models.IntegerField(blank=True, null=True, verbose_name='Объем онлайн курса, часов')
    intensity_per_week = models.IntegerField(blank=True, null=True,
                                             verbose_name='Требуемое время для изучения онлайн-курса, часов в неделю')
    content = models.TextField(blank=True, null=True, verbose_name='Содержание онлайн курса')
    lectures_number = models.IntegerField(blank=True, null=True, verbose_name='Количество лекций')
    external_url = models.URLField(blank=True, null=True, verbose_name='Ссылка на онлайн курс')
    has_certificate = models.BooleanField(blank=True, null=True, verbose_name='Возможность получить сертификат')
    credits = models.FloatField(blank=True, null=True, verbose_name='Трудоемкость курса в з.е.')

    class Meta:
        verbose_name = 'Онлайн курс'
        verbose_name_plural = 'Онлайн курсы'

    def __str__(self):
        return self.title


class CourseFieldOfStudy(models.Model):
    """
    Модель для связи онлайн курса и направления подготовки
    """
    course = models.ForeignKey('OnlineCourse', on_delete=models.CASCADE, verbose_name="Онлайн курс", blank=False,
                               null=False, related_name="course_field_of_study")
    field_of_study = models.ForeignKey(FieldOfStudy, on_delete=models.CASCADE, verbose_name = 'Направление подготовки')

    class Meta:
        verbose_name = 'Онлайн курс и направления подготовки'
        verbose_name_plural = 'Онлайн курсы и направления подготовки'


class CourseCredit(models.Model):
    """
    Модель для связи онлайн курса, направления подготовки и  перезачета
    """
    course = models.ForeignKey('OnlineCourse', on_delete=models.CASCADE, verbose_name="Онлайн курс", blank=False,
                               null=False, related_name="course_credit")
    institution = models.ForeignKey('Institution', on_delete=models.CASCADE, verbose_name="Правообладатель", blank=False,
                                    null=False)
    field_of_study = models.ForeignKey(FieldOfStudy, on_delete=models.CASCADE, verbose_name = 'Направление подготовки')

    class Meta:
        verbose_name = 'Перезачет'
        verbose_name_plural = 'Перезачеты'


class CourseRequirement(models.Model):
    """
    Модель для связи онлайн курса с требованиями (пререквизитами)
    """
    course = models.ForeignKey('OnlineCourse', on_delete=models.CASCADE, verbose_name="Онлайн курс", blank=False,
                               null=False, related_name="course_requirement")
    item = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Пререквизит")

    class Meta:
        verbose_name = 'Онлайн курс и требования'
        verbose_name_plural = 'Онлайн курсы и требования'


class CourseWorkProgram(models.Model):
    """
    Модель для связи онлайн курса с РПД
    """
    course = models.ForeignKey('OnlineCourse', on_delete=models.CASCADE, verbose_name="Онлайн курс", blank=False,
                               null=False, related_name="course_workprogram")
    work_program = models.ForeignKey(WorkProgram, on_delete=models.CASCADE, verbose_name="Пререквизит")

    class Meta:
        verbose_name = 'Онлайн курс и РПД'
        verbose_name_plural = 'Онлайн курсы и РПД'


class CourseLearningOutcome(models.Model):
    """
    Модель для связи онлайн курса с результатами обучения
    """
    course = models.ForeignKey('OnlineCourse', on_delete=models.CASCADE, verbose_name="Онлайн курс", blank=False,
                               null=False, related_name="course_learning_outcome")
    learning_outcome = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Результат обучения", blank=False,
                                         null=False)

    class Meta:
        verbose_name = 'Онлайн курс и результаты обучения'
        verbose_name_plural = 'Онлайн курсы и результаты обучения'

# Create your models here.
