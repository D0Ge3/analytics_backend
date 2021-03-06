from django.db import models


class BarsWorkProgramsAssociate(models.Model):
    bars_id = models.PositiveIntegerField(verbose_name="Id РПД в системе БАРС 2.0")
    base_work_programs = models.ManyToManyField('WorkProgram', verbose_name="Рабочая программа",
                                                related_name="work_program_in_bars")
    is_in_bars = models.BooleanField(verbose_name="Отправлялась ли в БАРС", default=False)
    term = models.PositiveIntegerField(verbose_name="Семестр")


class HistoryOfSendingToBars(models.Model):
    work_program = models.ForeignKey('WorkProgram', on_delete=models.CASCADE,
                                     verbose_name='РПД',
                                     related_name="wp_in_send_history")
    date_of_sending = models.DateTimeField(auto_now_add=True)
    request_text = models.TextField(verbose_name='Текст запроса в БАРС')


class BarsEPAssociate(models.Model):
    bars_id = models.PositiveIntegerField(verbose_name="Id ОП в системе БАРС 2.0")
    base_field_of_study = models.ManyToManyField('ImplementationAcademicPlan', verbose_name="Направление",
                                            related_name="field_of_study_in_bars")
    is_in_bars = models.BooleanField(verbose_name="Отправлялась ли в БАРС", default=False)