from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings
from api.views import AbonementViewSet, InstructorViewSet, ClassesViewSet
from authentication.views import UserViewSet
from .views import index

router = DefaultRouter()
router.register('instructors', InstructorViewSet)
router.register('classes', ClassesViewSet)
router.register('abonements', AbonementViewSet)
router.register('user', UserViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('register', index),
    path('login', index),
    path('instructors', index),
    path('instructors/<int:pk>', index),
    path('abonements', index),
    path('abonements/<int:pk>', index),
    path('profile', index),
    path('', index)
]

urlpatterns += static(settings.MEDIA_URL,
                        document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL,
                        document_root=settings.STATIC_ROOT)