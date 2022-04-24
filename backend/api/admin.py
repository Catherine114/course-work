from django.contrib import admin
from .models import Access, Abonement, Timetable, Classes, Instructor

admin.site.register(Access)
admin.site.register(Abonement)
admin.site.register(Timetable)
admin.site.register(Classes)
admin.site.register(Instructor)
